<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
  >
    <div
      v-show="visible"
      class="fixed right-4 px-4 py-3 rounded-lg shadow-lg z-50 min-w-[300px] max-w-[400px]"
      :class="typeClasses[type]"
      :style="{ top: offset + 'px' }"
    >
      <div class="flex items-start space-x-2">
        <!-- 图标 -->
        <svg
          v-if="type === 'success'"
          class="w-5 h-5 mt-0.5 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'error'"
          class="w-5 h-5 mt-0.5 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          class="w-5 h-5 mt-0.5 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'info'"
          class="w-5 h-5 mt-0.5 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="flex-1 relative pr-6">
          <!-- 标题 -->
          <h3 class="font-medium mb-1">{{ title }}</h3>
          <!-- 消息文本 -->
          <p class="text-sm opacity-90">{{ message }}</p>
          <!-- 关闭按钮 -->
          <button
            @click="close"
            class="absolute right-0 top-0 text-current opacity-50 hover:opacity-100 transition-opacity"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  duration?: number;
  offset?: number;
}>();

const emit = defineEmits(["destroy"]);

const visible = ref(false);
const typeClasses = {
  success: "bg-green-50 text-green-800 border-l-4 border-green-500",
  error: "bg-red-50 text-red-800 border-l-4 border-red-500",
  warning: "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500",
  info: "bg-blue-50 text-blue-800 border-l-4 border-blue-500",
};

const close = () => {
  visible.value = false;
  setTimeout(() => {
    emit("destroy");
  }, 300);
};

onMounted(() => {
  visible.value = true;
  if (props.duration !== 0) {
    setTimeout(() => {
      close();
    }, props.duration || 4500);
  }
});
</script>
