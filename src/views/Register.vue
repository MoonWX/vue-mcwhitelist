<!-- eslint-disable -->
<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
              <div id="card">
                <div class="reg">
                  <div class="regContainer">
                    <h1>注册</h1>
                    <el-input v-model="username" placeholder="你想使用的用户名"></el-input>
                    <el-input placeholder="你想使用的密码" v-model="password" show-password></el-input>
                    <el-input placeholder="请再次输入密码" v-model="passwordAgain" show-password></el-input>
                    <br>
                    <el-button type="primary" @click="sendData" v-loading.fullscreen.lock="fullscreenLoading" round>注册</el-button>
                </div>
                </div>
                </div>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
import axiosPost from '@/utils/axiosPost';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            passwordAgain: '',
            fullscreenLoading: false
        };
    },
    methods: {
      loadingFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
        async sendData() {
          this.loadingFullScreen()
            if (this.password !== this.passwordAgain) {
                this.failMsg('请检查两次密码是否相同！')
                return
            }
            let res = await axiosPost('register', {username:this.username, password:this.password})
            console.log(res)
            if (res.status === 200) {
                console.log('注册成功')
                this.sucMsg()
                await this.$router.push({path: '/login'})
            }
            else {
                console.log('注册失败' + res)
                this.failMsg(res.response.data.message)
            }
        },
        sucMsg() {
            const h = this.$createElement;
            this.$notify({
                title: '注册成功！',
                message: h({style: 'color: teal'}, '正在跳转至登录页...'),
                type: 'success'
            });

        },
        failMsg(msg) {
            const h = this.$createElement;
            this.$notify.error({
                title: '注册失败！',
                message: h('i', {style: 'color: teal'}, msg)
            });
        }
    }
};
</script>

<style scoped lang="scss">
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
.reg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  .el-input {
    display: flex;
    width: 350px;
    margin: 10px auto;
    background-color: transparent;
    .el-input__inner {
      $font-size: font-size;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
  .el-button{
    margin-top: 10px;
  }
}
</style>
