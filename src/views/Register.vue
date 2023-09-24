<!-- eslint-disable -->
<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <div class="reg">
                    <h1>注册</h1>
                    <el-input v-model="username" placeholder="你想使用的用户名"></el-input>
                    <el-input placeholder="你想使用的密码" v-model="password" show-password></el-input>
                    <el-input placeholder="请再次输入密码" v-model="passwordAgain" show-password></el-input>
                    <br>
                    <el-button type="primary" @click="sendData" round>注册</el-button>
                </div>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
import axiosPost from '@/assets/axiosPost';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            passwordAgain: '',
        };
    },
    methods: {
        async sendData() {
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
.reg {
    color: white;
    width: 70%;
    margin: 100px auto;
    text-align: center;
    .el-input {
        display: flex;
        width: 350px;
        margin: 10px auto;
        background-color: transparent;
        .el-input__inner {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
        }
    }
    .el-button{
        margin-top: 10px;
    }
}
</style>
