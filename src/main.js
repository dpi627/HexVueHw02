import { createApp } from 'vue'
import App from './AppHw2.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
