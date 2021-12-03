import Vue from 'vue';
import Vuex from 'vuex';
import Common from '@/store/modules/common';
import Auth from '@/store/modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Common,
    Auth,
  },
});
