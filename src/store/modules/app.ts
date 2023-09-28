import { computed } from "vue"
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import defaultSettings from "@/settings"
// 导入 Element Plus 中英文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"

export const useAppStore = defineStore('app', () => {
  const device = useStorage('device', 'desktop')
  function toggleDevice(val: string) {
    device.value = val
  }

  const size = useStorage('size', defaultSettings.size)
  function changeSize(val: string) {
    size.value = val
  }

  const language = useStorage('language', defaultSettings.language)
  const locale = computed(() => {
    if (language?.value === 'en') {
      return en
    } else {
      return zhCn
    }
  })
  function changeLanguage(val: string) {
    language.value = val
  }

  return {
    device,
    size,
    language,
    locale,
    toggleDevice,
    changeSize,
    changeLanguage
  }
})