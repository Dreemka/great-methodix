import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './plugins/i18n'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'jordium-gantt-vue3/dist/assets/jordium-gantt-vue3.css'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Antd)

app.mount('#app')
