import jsonUser from "@/static/user.json";
import router from "@/router/index.js";
import { uniqueId } from "lodash";
import {
  CREATE_NEW_ADDRESS,
  LOG_IN,
  LOG_OUT,
  REMOVE_ADDRESS,
  SAVE_ADDRESS,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,
  state: {
    user: jsonUser,
    isLogged: false,
    addresses: [
      {
        id: uniqueId(),
        name: "Тест",
        street: "Невский пр.",
        house: "22",
        apartment: "46",
        comment: "Позвоните, пожалуйста, от проходной",
      },
    ],
  },
  getters: {},
  mutations: {
    [LOG_IN](state) {
      state.isLogged = true;
    },
    [LOG_OUT](state) {
      state.isLogged = false;
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
    async logIn({ commit }) {
      await router.push("/");
      commit(LOG_IN);
    },
    async logOut({ commit }) {
      await router.push("/");
      commit(LOG_OUT);
    },
    createNewAddress({ commit }) {
      const newAddress = () => {
        return {
          id: uniqueId(),
          name: "",
          street: "",
          house: "",
          apartment: "",
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
