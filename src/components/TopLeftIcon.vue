<!-- TopLeftIcon.vue -->
<template>
  <div class="absolute top-0 left-0">
    <img src="@/assets/img/logo.png" alt="logo" class="w-12 h-12 rounded-lg m-2 opacity-80" @click="goHome" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>
