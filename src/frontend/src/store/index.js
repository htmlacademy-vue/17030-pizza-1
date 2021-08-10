import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutation-types.js";

Vue.use(Vuex);

const state = {};

const getters = {};

const mutations = {
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
        return id === value.id;
      });

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter((e) => e.id !== id);
    } else {
      state[entity] = state[entity].filter((e) => e.id !== id);
    }
  },
};

const actions = {
  addPizzaToCart({ state, dispatch }) {
    dispatch("Cart/addPizza", state.Builder.pizza);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
