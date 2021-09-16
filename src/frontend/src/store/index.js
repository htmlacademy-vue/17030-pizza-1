import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  ADD_ENTITY,
  ADD_NOTIFICATION,
  DELETE_ENTITY,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutation-types.js";
import { uniqueId } from "lodash";
import { MESSAGE_LIVE_TIME } from "@/common/constants.js";
import VuexPlugins from "@/plugins/vuexPlugins.js";

Vue.use(Vuex);

const state = {
  notifications: [],
};

const getters = {};

const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  [DELETE_NOTIFICATION](state, notificationId) {
    state.notifications = state.notifications.filter(
      ({ id }) => id.toString() !== notificationId.toString()
    );
  },
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(({ id }) => {
        return id.toString() === value.id.toString();
      });

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(
        ({ id }) => id.toString() === value.id.toString()
      );

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => e.id.toString() !== id.toString()
      );
    } else {
      state[entity] = state[entity].filter(
        (e) => e.id.toString() !== id.toString()
      );
    }
  },
};

const actions = {
  async init({ dispatch }) {
    await dispatch("Builder/fetchDough");
    await dispatch("Builder/fetchIngredients");
    await dispatch("Builder/fetchSauces");
    await dispatch("Builder/fetchSizes");
    await dispatch("Builder/createNewPizza");
  },
  addPizzaToCart({ state, dispatch }) {
    dispatch("Cart/addPizza", state.Builder.pizza);
  },
  createNotification({ commit }, notification) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(() => {
      commit(DELETE_NOTIFICATION, uniqueNotification.id);
    }, MESSAGE_LIVE_TIME);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [VuexPlugins],
});
