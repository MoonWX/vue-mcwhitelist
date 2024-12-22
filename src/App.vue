<!-- App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen">
    <TopLeftIcon />
    <main class="flex-grow flex items-center justify-center p-6">
      <div
        class="w-full max-w-4xl mx-auto p-8 bg-black/40 rounded-lg backdrop-blur-sm"
      >
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import TopLeftIcon from "@/components/TopLeftIcon.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-image: url("./assets/img/bkg.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  z-index: -1;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
