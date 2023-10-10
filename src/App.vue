<template>
  <div id="app">
    <router-view />
    <div class="footer">
      <div class="fri">
        <span>友情链接：  </span>
        <a class="fri-link" href="https://tarsgo.team" target="_blank">吉甲大师软件组</a>
      </div>
        <div class="qq">
            吉林大学Minecraft同好会 <br>
            QQ: 361033103
        </div>
        <div class="author">
            Made by MoonWX & ChestZone
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
@font-face {
  font-family: 'mcFont';
  src: url('./assets/minecraft.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}
@media (min-width: 784px) {

  .footer{
    height: 72px;
    width: 100%;
    background-color: rgb(35, 35, 39);
    position: fixed;
    bottom: 0;
    opacity: 0.8;
    font-family: 'mcFont';
  }
  .fri{
    margin: 24px;
    text-align: left;
    line-height: 24px;
    font-size: 14px;
    color: gray;
    user-select: none;
    float: left;
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
  .author {
    margin: 24px;
    user-select: none;
    float: right;
    line-height: 24px;
    font-size: 14px;
    color: gray;
    text-align: left;
  }
  .qq {
    float: left;
    position: relative;
    left: calc(50% - 300px);
    margin: 12px;
    line-height: 24px;
    font-size: 14px;
    color: aliceblue;
    text-align: center;
  }
  html, body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  //background-image: url('https://cdn.moonwx.cn/img/jlumc/bkg.png');
    background-image: url('./assets/bkg.png');
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
}
@media (max-width: 784px){

  .footer{
    height: 144px;
    width: 100%;
    background-color: rgb(35, 35, 39);
    position: fixed;
    bottom: 0;
    opacity: 0.8;
    font-family: 'mcFont';
  }
  .fri{
    margin: 24px;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: blue;
    user-select: none;
    float: left;
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
  .author {
    margin: 24px;
    user-select: none;
    float: right;
    line-height: 24px;
    font-size: 14px;
    color: gray;
    text-align: left;
    display: block;
    bottom: 0;
  }
  .qq {
    float: left;
    position: relative;
    top: calc(50% - 38px);
    left: calc(50% - 300px);
    margin: 12px;
    line-height: 24px;
    font-size: 14px;
    color: aliceblue;
    text-align: center;
  }
  html, body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url('./assets/bkg.png');
    background-size: cover;
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

}
</style>
