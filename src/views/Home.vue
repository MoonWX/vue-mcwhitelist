<!-- eslint-disable -->
<template>
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-center text-white">
      欢迎，{{ username }}
    </h1>
  </header>

  <section class="mb-8 text-center">
    <h3 class="text-xl font-semibold text-white mb-4">您绑定的游戏账号有：</h3>
    <div class="space-y-2">
      <div
        v-for="(item, index) in nameList"
        :key="index"
        class="p-3 bg-white/10 rounded text-white"
      >
        {{ item }}
      </div>
      <div v-if="nameList.length === 0" class="p-3 text-gray-400">
        暂无绑定账号
      </div>
    </div>
  </section>

  <div class="text-center mb-8">
    <button
      @click="about"
      class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      添加账号
    </button>
  </div>

  <div class="text-center">
    <button
      @click="logout"
      class="text-orange-400 hover:text-orange-300 transition-colors"
    >
      注销
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { post } from "@/utils/axiosService";

const router = useRouter();
const idList = ref([]);
const nameList = ref([]);
const username = ref("游客");

watch(
  () => username.value,
  (newVal) => {
    if (!newVal) {
      // 使用原生提示或自定义通知组件
      alert("登录过期！即将跳转至登录页...");
      router.push("/login");
    }
  }
);

const getInformation = async () => {
  try {
    // 重置列表，避免重复数据
    idList.value = [];
    nameList.value = [];

    // 获取 ID 列表
    const idsResponse = await post("idList", {});
    if (!idsResponse.data) {
      throw new Error("未能获取到账号列表");
    }

    // 处理 ID 字符串
    const idsString = String(idsResponse.data).trim();
    if (!idsString) {
      // 如果是空字符串，说明没有绑定账号
      return;
    }

    // 分割并过滤空值
    idList.value = idsString.split(",").filter((id) => id && id.trim());

    // 使用 Promise.all 并行获取用户名
    const userPromises = idList.value.map(async (id) => {
      try {
        const info = await post(`api/username/${id}`, {});
        if (!info.data?.name) {
          throw new Error(`无法获取 ID ${id} 的用户名`);
        }
        return info.data.name;
      } catch (error) {
        console.error(`获取用户 ${id} 信息失败:`, error);
        return null; // 返回 null 表示这个用户获取失败
      }
    });

    // 等待所有请求完成并过滤掉失败的结果
    const names = (await Promise.all(userPromises)).filter(
      (name) => name !== null
    );

    // 更新名称列表
    nameList.value = names;

    // 如果有获取失败的用户名，显示提示
    if (names.length < idList.value.length) {
      ElMessage({
        type: "warning",
        message: "部分用户信息获取失败，请稍后重试",
      });
    }
  } catch (error) {
    // 处理主要错误
    console.error("获取账号信息失败:", error);

    ElMessage({
      type: "error",
      message: error.message || "获取账号信息失败，请稍后重试",
    });

    // 重置状态
    idList.value = [];
    nameList.value = [];
  }
};

const about = () => {
  router.push("/about");
};

const getUsername = async () => {
  try {
    const res = await post("isLogin", {});

    // 检查响应格式
    if (!res || typeof res.data?.username !== "string") {
      throw new Error("获取用户信息失败，返回数据格式错误");
    }

    // 更新用户名
    username.value = res.data.username;

    // 如果用户名为空，可能是登录过期
    if (!res.data.username) {
      ElMessage({
        type: "warning",
        message: "登录已过期，请重新登录",
      });
      router.push("/login");
    }
  } catch (error) {
    console.error("获取用户名失败:", error);

    ElMessage({
      type: "error",
      message: error.message || "获取用户信息失败，请重新登录",
    });

    // 清除用户名
    username.value = "";

    // 重定向到登录页
    router.push("/login");
  }
};

const logout = async () => {
  await post("logout", {});
  router.push("/login").catch((err) => console.error(err));
};

onMounted(() => {
  getInformation();
  getUsername();
});
</script>
