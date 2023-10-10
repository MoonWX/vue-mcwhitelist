<!-- eslint-disable -->
<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <div class="container">
                  <div class="item">
                    <h2>欢迎，{{ username }}</h2>
                  </div>
                  <div class="item">
                    <h3>您绑定的游戏账号有：</h3>
                    <h3 v-for="(item,index) in nameList">{{item}}</h3>
<!--                    <h3 v-for="(item,index) in idList">{{item}}</h3>-->
                  </div>
                  <div class="item">
                    <el-button @click="about">添加账号</el-button>
                  </div>
                  <div class="logout">
                    <el-link @click="logout" style="color: orange"> 注销 </el-link>
                  </div>
                </div>

            </el-main>
            <el-footer>

            </el-footer>
        </el-container>
    </div>
</template>

<script>
// import Cookies from 'js-cookie';
import axiosPost from '@/utils/axiosPost';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    data() {
        return {
            idList: [], // 游戏uuid列表
            nameList: [], // 游戏名称列表
            username: '',
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
        sendData() {
            axiosPost('login',{username: this.username, password: this.password});
        },
        validateData() {
            axiosPost('isLogin',{username: this.username})
        },
        testRcon() {
            axiosPost('rcon', {username: this.username})
        },
        async getInformation() {
            // 从数据库中获取绑定的所有uuid，然后根据uuid获取游戏名。
            try {
                let ids = await axiosPost('idList', {});
                ids = "" + ids.data;
                this.idList = ids.split(',');
                console.log(this.idList)
                console.log(typeof(this.idList))
                for (let i = 0; i < this.idList.length; i++) {
                    const id = this.idList[i];
                    const info = await axiosPost(`api/username/${id}`, {});
                    this.nameList.push(info.data.name);
                }
                console.log('nameList:');
                console.log(this.nameList)
            }
            catch (e) {
                console.log(e);
            }
        },
        about() {
            this.$router.push({path: '/about'});
        },
        async getUsername() {
            const res = await axiosPost('isLogin', {});
            if (res && res.data.username)
            this.username = res.data.username
        },
        async logout() {
            await axiosPost('logout', {});
            this.$router.push({path: '/login'}).catch(err => (console.log(err)));
        }
    },
    mounted() {
        this.getInformation();
        this.getUsername();
    }
};
</script>

<style scoped>
@media (min-width: 784px) {
  .container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    width: 70%;
    height: 70vh;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border-radius: 8px;
  }

  .logout {
    position: fixed;
    bottom: 0;
    height: 22vh;
    margin: 24px;
    display: block;
    text-align: left;
    line-height: 24px;
    font-size: 14px;
    color: orange;
  }

  .item {
    flex: 0 0 auto;
    margin: 6px;
  }
}
@media (max-width: 784px) {
  .container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    width: 95%;
    height: 75vh;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border-radius: 8px;
  }

  .logout {
    position: fixed;
    bottom: 0;
    height: 22vh;
    margin: 24px;
    display: block;
    text-align: left;
    line-height: 24px;
    font-size: 14px;
    color: orange;
  }

  .item {
    flex: 0 0 auto;
    margin: 6px;
  }
}
</style>
