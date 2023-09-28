<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
  <div>
    Login
    <el-button type="primary" @click="userStore.login">登录</el-button>
  </div>
</template>

<style scoped></style>
