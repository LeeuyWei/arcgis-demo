import Vue from 'vue';
import ElementUi from "element-ui";
import App from './App.vue';
import router from './router';
import store from './store';
import "element-ui/lib/theme-chalk/index.css";
import "@arcgis/core/assets/esri/themes/dark/main.css";

Vue.config.productionTip = false;
Vue.use(ElementUi);
new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
