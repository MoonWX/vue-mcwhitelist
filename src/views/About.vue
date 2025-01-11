<template>
  <div class="flex flex-col space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-white">注册须知</h1>
    </header>

    <div class="flex flex-col space-y-6 text-white/90">
      <!-- Content Container -->
      <div
        class="w-full max-w-3xl mx-auto p-8 bg-black/40 rounded-lg backdrop-blur-sm"
      >
        <div class="space-y-4 text-left">
          <p>本服务用途为吉林大学Minecraft同好会服务器白名单注册。</p>
          <p class="flex items-center space-x-2">
            <span>QQ群号：</span>
            <button
              @click="copyQQ"
              class="px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors duration-200 relative group"
            >
              361033103

              <!-- 复制提示 - 桌面端显示 -->
              <div
                class="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                点击复制QQ群号
                <!-- 小三角形 -->
                <div
                  class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"
                ></div>
              </div>
            </button>
          </p>

          <div class="space-y-3">
            <p>
              注册白名单您需要为吉大学生或MUA成员，且您的游戏账号为正版。现只支持拥有吉大邮箱的用户自动注册，若您为吉大学生但没有吉大邮箱，或您为MUA成员，请联系QQ群内管理员手动注册。
            </p>

            <p>使用本服务即代表您同意我们在服务器上储存您的以下信息：</p>

            <ul class="list-disc list-inside ml-4 space-y-2">
              <li>您的吉大邮箱地址</li>
              <li>您的正版游戏名及UUID</li>
              <li>您在本服务中注册的账号及密码</li>
            </ul>

            <p>
              我们将会对您的信息进行保密，但是我们无法保证您的信息不会被泄露。
            </p>
            <p>删除绑定账号功能还未上线，如有需要请联系群内管理员处理。</p>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-center space-x-4">
        <button
          @click="handleBack"
          class="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all duration-200"
        >
          返回
        </button>
        <button
          @click="handleContinue"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          我已阅读并了解，继续
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Message from '@/utils/message';

const router = useRouter();
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

const handleBack = () => {
  router.back();
};

const handleContinue = () => {
  router.push("/verify");
};
</script>
