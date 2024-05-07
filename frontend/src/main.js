import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import vSelect from "vue-select";

import Notifications from '@kyvg/vue3-notification'

import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'

import { styleKey } from '@/config.js'

import './css/main.css'
import * as config from "@/config";

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = 'application/json';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

/* Init Pinia */
const pinia = createPinia()

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

/* Create Vue app */
const app = createApp(App);
app.use(router).use(pinia).use(Notifications).use(vuetify).mount('#app')

app.component('v-select', vSelect);

/* Init Pinia stores */
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')
styleStore.setTheme(localStorage['theme'] ? localStorage['theme'] : 'default');

/* Dark mode */
styleStore.setDarkMode(false)

/* Default title tag */
const defaultDocumentTitle = 'Ronin was created by Flatlogic generator.'

/* Collapse mobile aside menu on route change */
router.beforeEach(() => {
  layoutStore.asideToggle(false)
})

router.afterEach(to => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle

  /* Full screen mode */
  layoutStore.fullScreenToggle(!!to.meta.fullScreen)
})
