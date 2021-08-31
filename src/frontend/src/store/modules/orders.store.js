import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {},
  actions: {
    async query({ commit }) {
      const orders = await this.$api.orders.query();
      commit(
        SET_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: orders,
        },
        { root: true }
      );
    },

    async post({ commit }, order) {
      const data = await this.$api.orders.post(order);
      commit(
        ADD_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: data,
        },
        { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(
        DELETE_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          id,
        },
        { root: true }
      );
    },
  },
};
