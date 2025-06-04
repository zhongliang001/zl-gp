import { createApp } from 'vue'
import App from './App.vue'
import ZlGp from 'zl-gp'
import 'zl-gp/index.css'
import router from './router'

const app = createApp(App)
app.use(ZlGp)
app.use(router)
app.mount('#app')
