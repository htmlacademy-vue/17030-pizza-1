import { MISC_ITEMS } from "@/common/constants.js";
import {
  ADD_PIZZA,
  SET_ENTITY,
  UPDATE_MISC_COUNT,
  UPDATE_PIZZA_COUNT,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,

  state: {
    products: [],
    misc: [],
    miscCounts: MISC_ITEMS.reduce((obj, { value }) => {
      obj[value] = 0;
      return obj;
    }, {}),
  },

  getters: {
    totalPrice(state, getters) {
      return getters.productsPrice + getters.miscPrice;
    },
    productsPrice(state) {
      return state.products.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
    miscPrice(state) {
      return state.misc
        .filter(({ type }) => state.miscCounts[type] !== 0)
        .reduce((sum, { type, price }) => {
          sum += state.miscCounts[type] * price;
          return sum;
        }, 0);
    },
  },

  mutations: {
    [ADD_PIZZA](state, pizza) {
      const index = state.products.findIndex(({ id }) => +id === +pizza.id);

      if (~index) {
        state.products = state.products.splice(index, 1, pizza);
      } else {
        state.products = [...state.products, pizza];
      }
    },
    [UPDATE_PIZZA_COUNT](state, { pizzaId, count }) {
      const pizza = state.products.find(({ id }) => +id === +pizzaId);
      pizza.count = count;
    },
    [UPDATE_MISC_COUNT](state, { miscType, count }) {
      state.miscCounts[miscType] = count;
    },
  },

  actions: {
    async fetchMisc({ commit }) {
      const misc = await this.$api.misc.query();
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "misc",
          value: misc,
        },
        { root: true }
      );
    },
    addPizza({ commit }, pizza) {
      commit(ADD_PIZZA, pizza);
    },
    updatePizzaCount({ commit }, { pizzaId, count }) {
      commit(UPDATE_PIZZA_COUNT, { pizzaId, count });
    },
    changePizza({ dispatch }, pizzaId) {
      dispatch("Builder/createNewPizza", pizzaId, { root: true });
    },
    updateMiscCount({ commit }, { miscType, count }) {
      commit(UPDATE_MISC_COUNT, { miscType, count });
    },
  },
};
