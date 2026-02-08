import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import { Button, InputText, Message, Select, IftaLabel, Password } from 'primevue'
import { Form } from '@primevue/forms'

import App from './App.vue'

const app = createApp(App)

app.component('PButton', Button)
app.component('InputText', InputText)
app.component('Form', Form)
app.component('Message', Message)
app.component('PSelect', Select)
app.component('IftaLabel', IftaLabel)
app.component('Password', Password)
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
