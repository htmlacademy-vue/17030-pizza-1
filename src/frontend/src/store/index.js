import Vue from "vue";
import Vuex from "vuex";
import builder from "@/store/modules/builder.js";
import cart from "@/store/modules/cart.js";
import orders from "@/store/modules/orders.js";
import auth from "@/store/modules/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Builder: builder,
    Cart: cart,
    Orders: orders,
    Auth: auth,
  },
});
