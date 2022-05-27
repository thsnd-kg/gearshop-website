import Vue from "vue";
import Vuex from "vuex";
import notice from "./modules/notice";
import categories from "./modules/categories";
import products from "./modules/products";

Vue.use(Vuex);

const storeData = {
  modules: {
    notice,
    categories,
    products
  }
};
const store = new Vuex.Store(storeData);
export default store;
