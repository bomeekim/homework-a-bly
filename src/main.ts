import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import alert from '@/plugins/alert';
// import/no-extraneous-dependencies
import 'sweetalert2/dist/sweetalert2.min.css';

// eslint-disable-next-line import/extensions,import/order
import Swal from 'sweetalert2/dist/sweetalert2.js';

type TVueSwalInstance = typeof Swal & typeof Swal.fire;

declare module 'vue/types/vue' {
  // eslint-disable-next-line no-shadow
  interface Vue {
    $showAlertModal: TVueSwalInstance;
  }
}

Vue.config.productionTip = false;

Vue.use(VueSweetalert2, {
  width: 300,
  showCancelButton: true,
  showConfirmButton: true,
  customClass: {
    title: 'swal-custom-alert-title',
  },
});
Vue.use(alert);

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
