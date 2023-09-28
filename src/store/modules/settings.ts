import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore('setting', () => {
  const tagsView = useStorage<boolean>('tgasView', defaultSettings.tagsView)
  const fixedHeader = useStorage<boolean>(
    'fixedHeader',
    defaultSettings.fixedHeader
  )
  const layout = useStorage<string>('layout', defaultSettings.layout)
  const showSettings = ref<boolean>(defaultSettings.showSettings)
  const sidebarLogo = ref<boolean>(defaultSettings.sidebarLogo)

  function changeSettings(param: { key: string; value: any }) {
    const { key, value } = param
    switch (key) {
      case 'showSettings':
        showSettings.value = value
        break
      case 'fixedHeader':
        fixedHeader.value = value
        break
      case 'tagsView':
        tagsView.value = value
        break
      case 'sidebarLogo':
        sidebarLogo.value = value
        break
      case 'layout':
        layout.value = value
        break
    }
  }

  return {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    layout,
    changeSettings
  }
})
