<template>
  <div id="app">
    <router-view />
    <div class="footer">
      <div class="fri">
        <span>友情连接：  </span>
        <a class="fri-link" href="https://tarsgo.team" target="_blank">吉甲大师软件组</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
.footer{
  height: 72px;
  width: 100%;
  background-color: rgb(35, 35, 39);
  position: fixed;
  bottom: 0;
  opacity: 0.8;
}
.fri{
  margin: 24px;
  display: block;
  text-align: left;
  line-height: 24px;
  font-size: 14px;
  color: gray;

}
.fri-link{
  font-size: 14px;
  color: lightgray;
  letter-spacing: .5px;
  text-decoration: none;
  transition: color .3s;
  margin-bottom: 8px;
}
.fri-link:hover{
  color: #ff6a00 !important;
}
html, body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url('assets/bkg.png');
    background-size: cover;
  //backdrop-filter: opacity();
  //-webkit-filter: opacity(30%);
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  z-index: -1;
}
#app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
