<!-- eslint-disable -->
<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <div id="card">
                    <div class="login">
                        <div class="loginContainer">
                            <h1>登 录</h1>
                            <el-input v-model="username" placeholder="用户名"></el-input>
                            <el-input placeholder="密码" v-model="password" show-password></el-input>
                            <el-button type="primary" @click="sendData" round>登录</el-button>
                            <el-button @click="$router.push({path: '/register'})" round>注册</el-button>
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
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async sendData() {
            let res = await axiosPost('login', {username: this.username, password: this.password});
            console.log(JSON.stringify(res))
            if (res.status === 200) {
                console.log('登录成功')
                this.sucMsg()
                await this.$router.push({path: '/'})
            }
            else {
                console.log('登录失败' + res)
                this.failMsg(res)

            }
        },
        validateData() {
            axiosPost('isLogin',{username:this.username})
        },
        sucMsg() {
            const h = this.$createElement;
            this.$notify({
                title: '登录成功！',
                message: h({style: 'color: teal'}, '正在跳转至主页...'),
                type: 'success'
            });
        },
        failMsg(res) {
            const h = this.$createElement;
            this.$notify.error({
                title: '登录失败！',
                message: h('i', {style: 'color: teal'}, res)
            });
        }
    },
};

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
