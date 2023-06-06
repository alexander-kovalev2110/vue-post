import { createApp } from 'vue'
import router from "./router"
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import './App.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
