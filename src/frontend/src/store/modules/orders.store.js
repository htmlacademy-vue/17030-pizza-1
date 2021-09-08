import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
} from "@/store/mutation-types.js";
import { cloneDeep } from "lodash";

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

    async post({ commit }, cartOrder) {
      const clonedOrder = cloneDeep(cartOrder);
      clonedOrder.pizzas.forEach((pizza) => delete pizza.id);
      const data = await this.$api.orders.post(clonedOrder);

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
