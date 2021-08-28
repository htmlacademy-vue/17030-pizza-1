import jsonUser from "@/static/user.json";
import { uniqueId } from "lodash";
import {
  CREATE_NEW_ADDRESS,
  LOG_IN,
  LOG_OUT,
  REMOVE_ADDRESS,
  SAVE_ADDRESS,
  SET_ENTITY,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,

  state: {
    user: jsonUser,
    isAuthenticated: false,
    addresses: [
      {
        id: uniqueId(),
        name: "Тест",
        street: "Невский пр.",
        building: "22",
        flat: "46",
        comment: "Позвоните, пожалуйста, от проходной",
      },
    ],
  },

  getters: {
    getUserAttribute(state) {
      return (attr) => {
        return state.user ? state.user[attr] : "";
      };
    },
  },

  mutations: {
    [LOG_IN](state) {
      state.isAuthenticated = true;
    },
    [LOG_OUT](state) {
      state.isAuthenticated = false;
    },
    [CREATE_NEW_ADDRESS](state, newAddress) {
      state.addresses = [...state.addresses, newAddress];
    },
    [SAVE_ADDRESS](state, address) {
      const index = state.addresses.findIndex(({ id }) => +id === +address.id);

      if (~index) {
        state.addresses.splice(index, 1, address);
      }
    },
    [REMOVE_ADDRESS](state, addressId) {
      const index = state.addresses.findIndex(({ id }) => +id === +addressId);

      if (~index) {
        state.addresses.splice(index, 1);
      }
    },
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "isAuthenticated",
          value: false,
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "user",
          value: null,
        },
        { root: true }
      );
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          {
            module: "Auth",
            entity: "isAuthenticated",
            value: true,
          },
          { root: true }
        );
        commit(
          SET_ENTITY,
          {
            module: "Auth",
            entity: "user",
            value: data,
          },
          { root: true }
        );
      } catch {
        dispatch("logout", false);
      }
    },
    createNewAddress({ commit }) {
      const newAddress = () => {
        return {
          id: uniqueId(),
          name: "",
          street: "",
          building: "",
          flat: "",
          comment: "",
        };
      };

      commit(CREATE_NEW_ADDRESS, newAddress());
    },
    saveAddress({ commit }, address) {
      commit(SAVE_ADDRESS, address);
    },
    removeAddress({ commit }, addressId) {
      commit(REMOVE_ADDRESS, addressId);
    },
  },
};
