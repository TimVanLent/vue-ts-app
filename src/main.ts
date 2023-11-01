import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/scss/_global.scss';

createApp(App)
  .use(store) // Use the Vuex store
  .use(router) // Use the Vue Router
  .mount('#app');
