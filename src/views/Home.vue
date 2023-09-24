<!-- eslint-disable -->
<template>
    <div>
<!--        Your username is {{ username }}-->
<!--        <button @click="sendData">click</button>-->
<!--        <button @click="validateData">click2</button>-->
        <el-container>
            <el-header></el-header>
            <el-main>
                <h2>Your username is {{ username }}</h2>
                // TODO: 未来要在这里加入一个表格，显示用户的所有信息，并且要验证用户是否登录以查看敏感信息
                <el-button @click="testRcon">testRcon</el-button>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import axiosPost from '@/assets/axiosPost';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    computed: {
        username() {
            return Cookies.get('username');
        }
    },
    methods: {
        sendData() {
            axiosPost('login',{username: this.username, password: this.password});
        },
        validateData() {
            axiosPost('isLogin',{username: this.username})
        },
        testRcon() {
            axiosPost('rcon', {username: this.username})
        }
    }
};
</script>

<style scoped>

</style>
