<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <div class="container">
                    <el-input v-model="mail" placeholder="邮箱"></el-input>
                    <el-input v-model="gameName" placeholder="正版游戏名"></el-input>
                    <el-button @click="sendMail">发送</el-button>
                    <!--                    TODO: 发送中的时候转圈！-->
                    <!--                    TODO: 这里要加一分钟验证码限制！-->
                    <el-input v-model="verificationCode" placeholder="验证码"></el-input>
                    <el-button @click="verify">验证</el-button>
                </div>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>

import axiosPost from "@/utils/axiosPost";
import Cookies from "js-cookie";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Verify',
    data() {
        return {
            mail: '',
            verificationCode: '',
            gameName: '',
        };
    },
    computed: {
        username() {
            return Cookies.get('username');
        },
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
        async getUUID(name) {
            return await axiosPost(`api/uuid/${name}`, {})
        },
        async sendMail() {
            let uuid = await this.getUUID(this.gameName)
            if (!uuid.data.id) {
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
            if (res.data.code === 0) { // 发送成功
                this.$notify({
                    title: '发送成功！',
                    message: '请注意查收邮件！如未看到，请查看垃圾箱！',
                    type: 'success'
                });
            } else {
                this.$notify({ // 发送失败
                    title: '发送失败！',
                    message: res.data.msg,
                    type: 'error'
                });
            }
        },
        async verify() {
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
    }
}

</script>

<style>
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
.login {
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
