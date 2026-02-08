import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import { Button, InputText, Message, Select, IftaLabel } from 'primevue'
import { Form } from '@primevue/forms'

import App from './App.vue'

const app = createApp(App)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Form', Form)
app.component('Message', Message)
app.component('PSelect', Select)
app.component('IftaLabel', IftaLabel)
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})
app.use(ToastService)

app.mount('#app')
