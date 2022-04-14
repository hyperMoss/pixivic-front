import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'

import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import i18n from './i18n'
import 'virtual:windi.css'
// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

const routes = setupLayouts(generatedRoutes)
const head = createHead()

const router = createRouter(
  { history: createWebHistory(), routes },
)

const app = createApp(App)

const win:any = window
window.Vue =app 

app.use(router).use(i18n).use(head).mount('#app')
