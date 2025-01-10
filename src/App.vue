<!-- App.vue -->
<template>
  <div
    id="app"
    class="flex flex-col min-h-screen text-center text-[#2c3e50] font-sans antialiased"
  >
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

<script setup lang="ts">
import TopLeftIcon from "@/components/TopLeftIcon.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
html,
body {
  background-image: url("./assets/img/bkg.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

@font-face {
  font-family: "mcFont";
  src: url("@/assets/fonts/minecraft.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}
</style>
