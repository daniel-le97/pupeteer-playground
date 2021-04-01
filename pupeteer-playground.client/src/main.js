// @ts-ignore
import bootstrap from 'bootstrap'
import jquery from 'jquery'
import popper from 'popper.js'
import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router, bootstrap, jquery, popper)
  .mount('#app')
