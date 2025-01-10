<template>
  <div class="flex flex-col space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-white">验 证</h1>
    </header>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col items-center space-y-4"
    >
      <!-- Email Input -->
      <div class="w-full max-w-sm">
        <input
          v-model="formData.email"
          type="email"
          placeholder="吉大邮箱"
          :disabled="loading"
          @input="validateField('email')"
          class="w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          :class="{ 'ring-2 ring-red-500': errors.email }"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-400">
          {{ errors.email }}
        </p>
        <div class="mt-2">
          <a
            href="https://mails.jlu.edu.cn/"
            target="_blank"
            class="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >吉林大学学生邮箱网址</a
          >
        </div>
      </div>

      <!-- Game Name Input -->
      <div class="w-full max-w-sm">
        <input
          v-model="formData.gameName"
          type="text"
          placeholder="正版游戏名"
          :disabled="loading"
          @input="validateField('gameName')"
          class="w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          :class="{ 'ring-2 ring-red-500': errors.gameName }"
        />
        <p v-if="errors.gameName" class="mt-1 text-sm text-red-400">
          {{ errors.gameName }}
        </p>
      </div>

      <!-- Verification Code Input -->
      <div class="w-full max-w-sm">
        <div class="flex space-x-2">
          <input
            v-model="formData.verificationCode"
            type="text"
            placeholder="验证码"
            :disabled="loading"
            @input="validateField('verificationCode')"
            class="flex-1 px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
            :class="{ 'ring-2 ring-red-500': errors.verificationCode }"
          />
          <button
            type="button"
            @click="sendVerificationCode"
            :disabled="loading || codeBtnDisabled"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            :class="{ 'bg-gray-500': codeBtnDisabled }"
          >
            {{ codeBtnText }}
          </button>
        </div>
        <p v-if="errors.verificationCode" class="mt-1 text-sm text-red-400">
          {{ errors.verificationCode }}
        </p>
      </div>

      <!-- Notice -->
      <div class="text-sm text-white/70">
        点击验证即代表您已阅读并同意
        <a
          @click="openNotify"
          class="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer"
          >注册须知</a
        >
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-sm"
      >
        <button
          type="button"
          @click="backHome"
          class="w-full sm:w-1/2 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          :disabled="loading"
        >
          返回首页
        </button>
        <button
          type="submit"
          class="w-full sm:w-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          :disabled="loading || !isFormValid"
        >
          <span
            v-if="loading"
            class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"
          ></span>
          <span>{{ loading ? "验证中..." : "验证" }}</span>
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

const router = useRouter();

// 状态
const loading = ref(false);
const codeBtnDisabled = ref(false);
const waitTime = ref(61);
const codeBtnText = ref("获取验证码");

// 表单数据
const formData = reactive({
  email: "",
  gameName: "",
  verificationCode: "",
});

// 错误信息
const errors = reactive({
  email: "",
  gameName: "",
  verificationCode: "",
});

// 定义验证规则的类型
interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  min?: number;
  message: string;
}

// 定义表单字段类型
type FormField = 'email' | 'gameName' | 'verificationCode';

// 验证规则对象的类型
type ValidationRules = {
  [key in FormField]: ValidationRule[];
};

// 然后修改验证规则的定义
const validationRules: ValidationRules = {
  email: [
    { required: true, message: "请输入吉大邮箱" },
    {
      pattern: /^[^\s@]+@(mails\.jlu\.edu\.cn|jlu\.edu\.cn)$/,
      message: "请输入有效的吉大邮箱地址",
    },
  ],
  gameName: [
    { required: true, message: "请输入正版游戏名" },
    { min: 3, message: "游戏名至少需要3个字符" },
  ],
  verificationCode: [
    { required: true, message: "请输入验证码" },
    { pattern: /^\d{6}$/, message: "请输入6位数字验证码" },
  ],
};

// 修改验证方法的类型
const validateField = (field: FormField) => {
  const value = formData[field];
  const rules = validationRules[field];

  errors[field] = "";

  for (const rule of rules) {
    if (rule.required && !value) {
      errors[field] = rule.message;
      break;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
      break;
    }
    if (rule.min && value.length < rule.min) {
      errors[field] = rule.message;
      break;
    }
  }
};

// 计算表单是否有效
const isFormValid = computed(() => {
  return (
    formData.email &&
    formData.gameName &&
    formData.verificationCode &&
    !errors.email &&
    !errors.gameName &&
    !errors.verificationCode
  );
});

// 获取验证码
const sendVerificationCode = async () => {
  validateField("email");
  validateField("gameName");

  if (errors.email || errors.gameName) {
    return;
  }

  try {
    loading.value = true;
    codeBtnDisabled.value = true;

    interface PostResponse {
      status: number;
      data: any;
      message?: string;
    }

    // 获取游戏 UUID
    const uuidRes: PostResponse = await post(
      `api/uuid/${formData.gameName}`,
      {}
    );
    if (uuidRes && uuidRes.status !== 200) {
      ElNotification({
        title: "发送失败",
        message: "请检查您的正版游戏名是否正确",
        type: "error",
      });
      return;
    }

    // 发送验证码
    const res = await post("send", {
      mailAddress: formData.email,
      gameName: formData.gameName,
      gameID: uuidRes.data.id,
    });

    if (res.data.code === 0) {
      ElNotification({
        title: "发送成功",
        message: "请查收邮件，如未看到请检查垃圾邮件",
        type: "success",
      });

      // 开始倒计时
      startCountdown();
    } else {
      ElNotification({
        title: "发送失败",
        message: res.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.error("发送验证码错误:", error);
    ElNotification({
      title: "发送失败",
      message: "服务器错误，请稍后重试",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

// 倒计时
const startCountdown = () => {
  waitTime.value = 60;
  codeBtnText.value = `${waitTime.value}s 后重新获取`;

  const timer = setInterval(() => {
    if (waitTime.value > 1) {
      waitTime.value--;
      codeBtnText.value = `${waitTime.value}s 后重新获取`;
    } else {
      clearInterval(timer);
      codeBtnText.value = "获取验证码";
      codeBtnDisabled.value = false;
      waitTime.value = 61;
    }
  }, 1000);
};

// 提交验证
const handleSubmit = async () => {
  if (formData.email && !formData.email.includes("@")) {
    formData.email = formData.email + "@mails.jlu.edu.cn";
  }

  // 验证所有字段
  validateField("email");
  validateField("gameName");
  validateField("verificationCode");

  if (!isFormValid.value) {
    return;
  }

  try {
    loading.value = true;

    const res = await post("verify", {
      code: formData.verificationCode,
    });

    if (res.data.result) {
      ElNotification({
        title: "验证成功",
        message: "您可以进入游戏了！",
        type: "success",
      });
    } else {
      ElNotification({
        title: "验证失败",
        message: res.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.error("验证错误:", error);
    ElNotification({
      title: "验证失败",
      message: "服务器错误，请稍后重试",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

// 其他功能
const openNotify = () => {
  router.push("/about");
};

const backHome = () => {
  router.push("/");
};
</script>
