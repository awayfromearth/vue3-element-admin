import { createApp } from 'vue'
import App from './App.vue'
import globalComponent from './components'
import i18n from './lang'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

const app = createApp(App)
app
  .use(globalComponent)
  .use(i18n)
  .mount('#app')
