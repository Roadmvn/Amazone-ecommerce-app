import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import fr from './i18n/fr.json'

// Configuration i18n
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages: {
    fr
  }
})

// Configuration Toast
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)
app.use(Toast, toastOptions)

app.mount('#app')