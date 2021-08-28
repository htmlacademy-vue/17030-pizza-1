export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {
    ADD_ORDER(state, order) {
      state.orders = [...state.orders, order];
    },
    DELETE_ORDER(state, orderId) {
      state.orders = state.orders.filter(({ id }) => +id !== +orderId);
    },
  },
  actions: {
    addOrder({ commit }, order) {
      commit("ADD_ORDER", order);
    },
    deleteOrder({ commit }, orderId) {
      commit("DELETE_ORDER", orderId);
    },
  },
};
