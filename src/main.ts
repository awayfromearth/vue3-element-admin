import App from './App.vue'
import globalComponent from './components'
import i18n from './lang'
import router from './router'
import { createApp } from 'vue'
import { setupStore } from './store'
import 'virtual:svg-icons-register'
import 'uno.css'
import '@/styles/index.scss'
import '@/permission'

const app = createApp(App)
setupStore(app)
app.use(globalComponent).use(i18n).use(router).mount('#app')
