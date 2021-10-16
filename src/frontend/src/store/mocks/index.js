import { cloneDeep } from "lodash";
import modules from "@/store/modules";
import Vuex from "vuex";
import { mutations } from "@/store";
import VuexPlugins from "@/plugins/vuexPlugins.js";

const state = () => ({
  notifications: [],
});

export const generateMockStore = (actions) => {
  const moduleCopy = cloneDeep(modules);

  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      moduleCopy[module] = { ...moduleCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules: moduleCopy,
    plugins: [VuexPlugins],
  });
};
