<template>
  <div class="flex flex-col space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-white">注 册</h1>
    </header>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col items-center space-y-4"
    >
      <!-- Username Input -->
      <div class="w-full max-w-sm">
        <input
          v-model="formData.username"
          type="text"
          placeholder="用户名"
          :disabled="loading"
          @input="validateField('username')"
          class="w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          :class="{ 'ring-2 ring-red-500': errors.username }"
        />
        <p v-if="errors.username" class="mt-1 text-sm text-red-400">
          {{ errors.username }}
        </p>
      </div>

      <!-- Password Input -->
      <div class="w-full max-w-sm">
        <div class="relative">
          <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码"
            :disabled="loading"
            @input="validateField('password')"
            class="w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
            :class="{ 'ring-2 ring-red-500': errors.password }"
          />
          <!-- 只在输入框有值时显示切换按钮 -->
          <button
            v-show="formData.password.length > 0"
            type="button"
            @click="togglePasswordVisibility"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white focus:outline-none transition-colors duration-200"
          >
            <svg
              v-if="!showPassword"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          </button>
        </div>
        <p v-if="errors.password" class="mt-1 text-sm text-red-400">
          {{ errors.password }}
        </p>
      </div>

      <!-- Confirm Password Input -->
      <div class="w-full max-w-sm">
        <div class="relative">
          <input
            v-model="formData.confirmPassword"
            placeholder="确认密码"
            :disabled="loading"
            @input="validateField('confirmPassword')"
            class="w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 pr-10"
            :class="{ 'ring-2 ring-red-500': errors.confirmPassword }"
          />
          <button
            type="button"
            @click="toggleConfirmPasswordVisibility"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white focus:outline-none transition-colors duration-200"
          >
            <svg
              v-if="!showPassword"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          </button>
        </div>
        <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-400">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <!-- Buttons -->
      <div
        class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-sm"
      >
        <button
          type="submit"
          class="w-full sm:w-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          :disabled="loading || !isFormValid"
        >
          <span
            v-if="loading"
            class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"
          ></span>
          <span>{{ loading ? "注册中..." : "注册" }}</span>
        </button>
        <button
          type="button"
          @click="handleLogin"
          class="w-full sm:w-1/2 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          :disabled="loading"
        >
          返回登录
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { post } from "@/utils/axiosService";

// 先定义所有接口和类型
interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  message: string;
}

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username: string;
  password: string;
  confirmPassword: string;
}

type ValidationRules = {
  [K in keyof FormData]: ValidationRule[];
};

// 路由实例
const router = useRouter();

// 状态管理 - 移到类型定义之后
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const formData = reactive<FormData>({
  username: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive<FormErrors>({
  username: "",
  password: "",
  confirmPassword: "",
});

// 表单验证规则
const validationRules: ValidationRules = {
  username: [
    { required: true, message: "请输入用户名" },
    { min: 3, message: "用户名至少需要3个字符" },
    { max: 20, message: "用户名不能超过20个字符" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { min: 6, message: "密码至少需要6个字符" },
  ],
  confirmPassword: [{ required: true, message: "请确认密码" }],
};

// 计算属性：表单是否有效
const isFormValid = computed(() => {
  return (
    formData.username &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    !errors.username &&
    !errors.password &&
    !errors.confirmPassword
  );
});

// 字段验证方法
const validateField = (field: keyof FormData) => {
  const value = formData[field];
  const rules = validationRules[field];

  // 重置错误
  errors[field] = "";

  // 验证规则
  for (const rule of rules) {
    if (rule.required && !value) {
      errors[field] = rule.message;
      break;
    }
    if (rule.min && value.length < rule.min) {
      errors[field] = rule.message;
      break;
    }
    if (rule.max && value.length > rule.max) {
      errors[field] = rule.message;
      break;
    }
  }

  // 额外验证确认密码
  if (field === "confirmPassword" && value !== formData.password) {
    errors.confirmPassword = "两次输入的密码不一致";
  }
};

// 显示/隐藏密码
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// 显示通知
const showNotification = (
  type: "success" | "warning" | "info" | "error",
  title: any,
  message: string
) => {
  ElNotification({
    type,
    title,
    message,
    duration: type === "error" ? 5000 : 3000,
  });
};

// 处理登录跳转
const handleLogin = () => {
  router.push("/login");
};

// 处理注册请求
const handleSubmit = async () => {
  // 验证所有字段
  validateField("username");
  validateField("password");
  validateField("confirmPassword");

  // 如果有错误，停止提交
  if (!isFormValid.value) {
    return;
  }

  try {
    loading.value = true;

    // 注册请求
    const res = await post("register", {
      username: formData.username,
      password: formData.password,
    });

    // 处理响应
    if (res.status === 200) {
      showNotification("success", "注册成功", "正在跳转至登录页面...");

      // 延迟跳转以显示成功消息
      setTimeout(async () => {
        try {
          await router.push("/login");
        } catch (error) {
          console.error("导航错误:", error);
          showNotification(
            "error",
            "导航错误",
            "无法跳转到登录页面，请刷新页面重试"
          );
        }
      }, 1000);
    } else {
      throw new Error(res.message || "注册失败");
    }
  } catch (error: any) {
    console.error("注册错误:", error);

    const errorMessage =
      error.response?.data?.message || error.message || "注册失败，请稍后重试";

    showNotification("error", "注册失败", errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>
