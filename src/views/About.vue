<!-- eslint-disable -->
<template>
    <div>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="8" :offset="8">
                        <h1 style="text-align: center; color: whitesmoke;">注册须知</h1>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <div class="container">
                    <p>本服务用途为吉林大学Minecraft同好会服务器白名单注册。QQ群号：361033103</p>
                    <p>注册白名单您需要为吉大学生或MUA成员，且您的游戏账号为正版。现只支持拥有吉大邮箱的用户自动注册，若您为吉大学生但没有吉大邮箱，或您为MUA成员，请联系QQ群内管理员手动注册。</p>
                    <p>使用本服务即代表您同意我们在服务器上储存您的以下信息：</p>
                    <p>您的吉大邮箱地址、您的正版游戏名及UUID、您在本服务中注册的账号及密码。</p>
                    <p>我们将会对您的信息进行保密，但是我们无法保证您的信息不会被泄露。</p>
                    <p>由于一些原因，删除绑定账号功能还未上线，如有需要请联系群内管理员处理。</p>
                    <p>请单击下方按钮以继续。</p>
                </div>
                <el-button style="margin-top:30px;" @click="readConfirm">我已阅读并了解，继续</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'About',
    methods: {
        readConfirm() {
            this.$router.push({path: '/verify'});
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.4);
    color: whitesmoke;
}

</style>
