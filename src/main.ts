import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import store from './store';
import router from './router';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import '@/assets/styles/index.scss';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
