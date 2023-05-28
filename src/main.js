import { createApp } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.css'
import router from "./router"
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')
