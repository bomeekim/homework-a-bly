import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// import/no-extraneous-dependencies
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

/**
 * 숫자 세 자리 단위로 금액에 콤마 표시를 넣어준다.
 */
Vue.filter('comma', (val: string | number) => String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
