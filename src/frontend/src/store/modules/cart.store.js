import jsonAdditional from "@/static/misc.json";

export default {
  namespaced: true,

  state: {
    pizzas: [],
    additional: jsonAdditional,
  },

  getters: {
    // TODO: добавить допы
    totalPrice(state) {
      return state.pizzas.reduce((sum, pizza) => {
        return sum + pizza.count * pizza.price;
      }, 0);
    },
  },

  mutations: {
    ADD_PIZZA(state, pizza) {
      state.pizzas = [...state.pizzas, pizza];
    },
    // [UPDATE_PIZZAS](state, rootState, pizza) {
    //   console.log(state, pizza);
    // },
  },

  actions: {
    addPizza({ commit }, pizza) {
      commit("ADD_PIZZA", pizza);
    },
  },
};
