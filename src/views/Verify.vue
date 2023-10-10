<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
              <div id="card">
                <div class="container">
                  <div class="verifyContainer">
                    <h1>验 证</h1>
                    <el-autocomplete v-model="mail" placeholder="吉大邮箱" :fetch-suggestions="querySearchEmail" :trigger-on-focus="false"></el-autocomplete>
<!--                      <br>-->
                      <a class="mailSite" href="https://mails.jlu.edu.cn/" target="_blank">吉林大学学生邮箱网址</a>
                    <el-input v-model="gameName" placeholder="正版游戏名"></el-input>
                    <div class="verify-code">
                      <div class="item">
                    <el-input v-model="verificationCode" placeholder="验证码" :id="{'disabled-style':getCodeBtnDisable}"></el-input>
                      </div>
                      <div class="item">
                    <el-button type="primary" @click="sendMail" :class="{'disabled-style':getCodeBtnDisable}">{{codeBtnWord}}</el-button>
                    </div>
                    </div>
                      <div style="font-size: 14px;">点击验证即代表您已阅读并同意<a class="openNotify" @click="openNotify">注册须知</a></div>
                    <el-button type="primary" @click="verify">验证</el-button>
                      <br>
                    <el-button @click="backHome" class="backHome">返回首页</el-button>
                </div>
                </div>
              </div>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>

import axiosPost from "@/utils/axiosPost";
// import Cookies from "js-cookie";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Verify',
    data() {
        return {
            mail: '',
            verificationCode: '',
            gameName: '',
            fullscreenLoading: false,
            codeBtnWord: '获取验证码邮件',
            getCodeBtnDisable: false,
            waitTime: 61,
            username: ''
        };
    },
    watch: {
        username() {
            if (!this.username) {
                this.$notify({
                    title: '登录过期！',
                    message: '即将跳转至登录页...',
                    type: 'warning'
                });
                this.$router.push({path: '/login'});
            }
        },
    },
    methods: {
        // 邮箱自动填充后缀名
        querySearchEmail(queryString, callback) {
            const emailList = [
                { value: '@mails.jlu.edu.cn' },
                { value: '@jlu.edu.cn' },
            ]
            let results = []
            let queryList = []
            emailList.map(item => {
                queryList.push({ value: queryString.split('@')[0] + item.value })
            })
            results = queryString ? queryList.filter(this.createFilter(queryString)) : queryList;
            callback(results);
        },
        // 邮箱填写过滤
        createFilter(queryString) {
            return (item) => {
                return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadingFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
        async getUUID(name) {
            return await axiosPost(`api/uuid/${name}`, {})
        },
        async sendMail() {
            let uuid = await this.getUUID(this.gameName)
            this.$notify({
              title: '发送中！',
              message: '请稍等！',
              type: 'success'
            });
            if (uuid.response && uuid.response.status !== 200) {
                this.$notify({
                    title: '发送失败！',
                    message: '请检查你的正版游戏名是否正确或与服务器连接发生错误！',
                    type: 'error'
                });
                return;
            }
            let res = await axiosPost('send', {
                mailAddress: this.mail,
                gameName: this.gameName,
                gameID: uuid.data.id,
            })
            console.log('res')
          console.log(res)
          console.log(res.data)
          console.log(Date.now()-res.data.lastSendTime)
          console.log(60-((Date.now()-res.data.lastSendTime)/1000))
          let lastTime = res.data.lastSendTime
          console.log(lastTime)
          console.log(res.code)
          if (res.code === "ERR_BAD_RESPONSE"){
            this.$notify({
              title: '发送失败！',
              message: '500错误！',
              type: 'error'
            });
          }
            if (res.data.code === 0) { // 发送成功
                this.$notify({
                    title: '发送成功！',
                    message: '请注意查收邮件！如未看到，请查看垃圾箱！',
                    type: 'success'
                });
              // 因为下面用到了定时器，需要保存this指向
              console.log(1111111111)
              let that = this
              that.waitTime--
              that.getCodeBtnDisable = true
              this.codeBtnWord = `${this.waitTime}s 后重新获取`
              let timer = setInterval(function(){
                if(that.waitTime>1){
                  that.waitTime--
                  that.codeBtnWord = `${that.waitTime}s 后重新获取`
                }else{
                  clearInterval(timer)
                  that.codeBtnWord = '获取验证码'
                  that.getCodeBtnDisable = false
                  that.waitTime = 61
                }
              },1000)
            } else {
                this.$notify({ // 发送失败
                    title: '发送失败！',
                    message: res.data.msg,
                    type: 'error'
                });
                this.waitTime = Math.trunc(60-(Date.now()-lastTime)/1000)
              let that = this
              that.waitTime--
              that.getCodeBtnDisable = true
              this.codeBtnWord = `${this.waitTime}s 后重新获取`
              let timer = setInterval(function(){
                if(that.waitTime>1){
                  // console.log(60-(Date.now()-lastTime)/1000)
                  that.waitTime--
                  that.codeBtnWord = `${that.waitTime}s 后重新获取`
                }else{
                  clearInterval(timer)
                  that.codeBtnWord = '获取验证码'
                  that.getCodeBtnDisable = false
                  that.waitTime = 61
                }
              },1000)
            }


        },
        async verify() {
          this.loadingFullScreen()
            let res = await axiosPost('verify', {
                code: this.verificationCode,
            })
            if (res.data.result) {
                this.$notify({
                    title: '验证成功！',
                    message: '您可以进入游戏了！',
                    type: 'success'
                });
            } else {
                this.$notify({
                    title: '验证失败！',
                    message: res.data.msg,
                    type: 'error'
                });
            }
            console.log(res)
        },
        async getUsername() {
            const res = await axiosPost('isLogin', {});
            if (res && res.data.username)
                this.username = res.data.username
        },
        openNotify() {
          this.$router.push({path: '/about'});
        },
        backHome() {
          this.$router.push({path: '/'});
        }
    },
    mounted() {
        this.getUsername();
    },
}

</script>

<style lang="scss">
#card {
//height: 100vh; /* 设置card的高度为视口高度，保证垂直居中可以生效 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70vh;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.el-input.disabled-style{
  width: 200px;
}

.el-button.disabled-style {
  background-color: #EEEEEE;
  color: #CCCCCC;
}
.openNotify {
  color: #409EFF;
  cursor: pointer;
  text-shadow: rgba(255,255,255,.5) 1px 1px 1px;
}
.mailSite {
    color: #409EFF;
    cursor: pointer;
    text-shadow: rgba(255,255,255,.5) 1px 1px 1px;
    text-decoration: underline;
    height: 20px;
    margin: 15px 0 10px 10px;
    position: absolute;

}
.container {
  font-family: 'mcFont';
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  .verify-code {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: start;
      align-content: start;

    }
    .item {
      flex: 0 0 auto;

      .el-input {
        width: 280px;
        margin-right: 10px;
        margin-top: 0px;
      }
      .el-button{
        margin-top: 0px;
      }

    }
  .el-input {
    display: flex;
    width: 430px;
    margin: 10px auto;
    background-color: transparent;
    .el-input__inner {
    $font-size: font-size;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
  .el-button{
    margin-top: 20px;
  }
}

</style>
