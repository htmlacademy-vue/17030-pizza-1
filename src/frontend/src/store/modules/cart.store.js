import jsonAdditional from "@/static/misc.json";
import { normalizeMisc } from "@/common/helpers.js";
import { MISC_ITEMS } from "@/common/constants.js";
import {
  ADD_PIZZA,
  UPDATE_ADDITIONAL_COUNT,
  UPDATE_PIZZA_COUNT,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,

  state: {
    products: [],
    additional: jsonAdditional.map((additionalItem) =>
      normalizeMisc(additionalItem)
    ),
    additionalCounts: MISC_ITEMS.reduce((obj, { value }) => {
      obj[value] = 0;
      return obj;
    }, {}),
    isPopupVisible: false,
  },

  getters: {
    totalPrice(state, getters) {
      return getters.productsPrice + getters.additionalPrice;
    },
    productsPrice(state) {
      return state.products.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
    additionalPrice(state) {
      return state.additional
        .filter(({ type }) => state.additionalCounts[type] !== 0)
        .reduce((sum, { type, price }) => {
          sum += state.additionalCounts[type] * price;
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
    [UPDATE_ADDITIONAL_COUNT](state, { additionalType, count }) {
      state.additionalCounts[additionalType] = count;
    },
  },

  actions: {
    addPizza({ commit }, pizza) {
      commit(ADD_PIZZA, pizza);
    },
    updatePizzaCount({ commit }, { pizzaId, count }) {
      commit(UPDATE_PIZZA_COUNT, { pizzaId, count });
    },
    changePizza({ dispatch }, pizzaId) {
      dispatch("Builder/createNewPizza", pizzaId, { root: true });
    },
    updateAdditionalCount({ commit }, { additionalType, count }) {
      commit(UPDATE_ADDITIONAL_COUNT, { additionalType, count });
    },
  },
};
