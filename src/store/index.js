import Vue from "vue";
import Vuex from "vuex";
import notice from "./modules/notice";
import categories from "./modules/categories";
import products from "./modules/products";
import auth from './modules/auth'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const storeData = {
  modules: {
    notice,
    categories,
    products,
    auth
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
})]
};
const store = new Vuex.Store(storeData);
export default store;
