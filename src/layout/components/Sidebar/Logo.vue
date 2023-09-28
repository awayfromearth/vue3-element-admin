<script setup lang="ts">
// import { computed } from 'vue'
import { ref } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

const settingStore = useSettingsStore()

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})

// const layout = computed(() => settingStore.layout)
const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href)
</script>

<template>
  <div
    class="w-full h-[50px] bg-gray-800 dark:bg-[var(--el-bg-color-overlay)] logo-wrap"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="h-full w-full items-center justify-center"
        to="/"
      >
        <img v-if="settingStore.sidebarLogo" :src="logo" class="w-5 h-5" />
      </router-link>

      <router-link
        v-else
        key="expand"
        class="h-full w-full flex items-center justify-center"
        to="/"
      >
        <img v-if="settingStore.sidebarLogo" :src="logo" class="w-5 h-5" />
        <span class="ml-3 text-white text-sm font-bold">
          vue3-element-admin
        </span>
      </router-link>
    </transition>
  </div>
</template>

<style scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}
.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
