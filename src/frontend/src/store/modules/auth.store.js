import { uniqueId } from "lodash";
import {
  CREATE_TEMPORARY_ADDRESS,
  DELETE_ENTITY,
  LOG_IN,
  LOG_OUT,
  REPLACE_TEMPORARY_ADDRESS,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthenticated: false,
    addresses: [],
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
    [CREATE_TEMPORARY_ADDRESS](state, newAddress) {
      state.addresses = [...state.addresses, newAddress];
    },
    [REPLACE_TEMPORARY_ADDRESS](state, { temporaryId, newAddress }) {
      const index = state.addresses.findIndex(
        ({ id }) => id.toString() === temporaryId.toString()
      );
      if (~index) {
        state.addresses.splice(index, 1, newAddress);
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
          id: uniqueId("new-address-"),
          name: "",
          street: "",
          building: "",
          flat: "",
          comment: "",
        };
      };
      commit(CREATE_TEMPORARY_ADDRESS, newAddress());
    },

    async queryAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: addresses,
        },
        { root: true }
      );
    },

    async postAddress({ state, commit }, address) {
      const { id: temporaryId, ...postParams } = address;
      postParams.userId = state.user.id;
      const newAddress = await this.$api.addresses.post(postParams);
      commit(REPLACE_TEMPORARY_ADDRESS, { temporaryId, newAddress });
    },

    async putAddress({ commit }, address) {
      const newAddress = await this.$api.addresses.put(address);
      commit(
        UPDATE_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: newAddress,
        },
        { root: true }
      );
    },

    async deleteAddress({ commit }, { id, isNewAddress }) {
      if (!isNewAddress) {
        await this.$api.addresses.delete(id);
      }
      commit(
        DELETE_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          id,
        },
        { root: true }
      );
    },
  },
};
