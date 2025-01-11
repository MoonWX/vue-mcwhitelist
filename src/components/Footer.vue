<!-- Footer.vue -->
<template>
  <footer class="mt-auto bg-[rgba(35,35,39,0.8)] font-minecraft">
    <div class="max-w-[1200px] mx-auto px-6 py-3 relative md:block grid grid-cols-1 gap-3 md:gap-0 md:pt-3 md:pb-3 pt-4 pb-4">
      <!-- 左侧友情链接 -->
      <div class="md:absolute md:left-6 md:top-1/2 md:-translate-y-1/3 text-gray-500 text-sm select-none text-center md:text-left">
        <span>友情链接： </span>
        <a
          class="text-gray-300 ml-2 hover:text-[#ff6a00] transition-colors"
          href="https://github.com/EdenSoftDev"
          target="_blank"
        >Eden Soft</a>
      </div>

      <div class="text-gray-100 text-sm text-center leading-relaxed mx-auto w-fit">
        <div>吉林大学Minecraft同好会</div>
        <div class="relative group">
          <button
            @click="copyQQ"
            class="hover:text-[#ff6a00] transition-colors cursor-pointer"
            :class="{ 'text-green-400': copied }"
          >
            QQ: 361033103
          </button>

          <!-- 复制提示 - 桌面端显示 -->
          <div class="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            点击复制QQ群号
            <!-- 小三角形 -->
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
          </div>
        </div>
      </div>

      <!-- 右侧作者信息 -->
      <div class="md:absolute md:right-6 md:top-1/2 md:-translate-y-1/3 text-gray-500 text-xs text-center md:text-left">
        Made by
        <a
          class="hover:text-[#ff6a00] transition-colors"
          href="https://github.com/MoonWX"
          target="_blank"
        >MoonWX</a>,
        <a
          class="hover:text-[#ff6a00] transition-colors"
          href="https://github.com/ZoneHerobrine"
          target="_blank"
        >HakoChest</a>
        &
        <a
          class="hover:text-[#ff6a00] transition-colors"
          href="https://github.com/SisypheOvO"
          target="_blank"
        >SisypheOvO</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Message from '@/utils/message';

const copied = ref(false);

const copyQQ = async () => {
  try {
    await navigator.clipboard.writeText("361033103");
    copied.value = true;

    Message.info("QQ群号已复制到剪贴板");

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    Message.error("复制失败，请手动复制");
    console.error("复制失败:", err);
  }
};
</script>
