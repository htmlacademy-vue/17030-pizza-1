import {
  normalizeDough,
  normalizeFilling,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers.js";
import {
  DROP_FILLING,
  SET_DOUGH,
  SET_ENTITY,
  SET_FILLING,
  SET_NAME,
  SET_PRICE,
  SET_SAUCE,
  SET_SIZE,
} from "@/store/mutation-types.js";
import jsonPizza from "@/static/pizza.json";
import {
  DOUGH_TYPES,
  FILLING_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants.js";
import { uniqueId } from "lodash";

export default {
  namespaced: true,

  state: {
    pizza: null,
    pizzaOptions: null,
  },

  getters: {
    sauces({ pizzaOptions }) {
      return pizzaOptions?.sauces.map((sauce) => normalizeSauce(sauce));
    },
    sizes({ pizzaOptions }) {
      return pizzaOptions?.sizes.map((size) => normalizeSize(size));
    },
    dough({ pizzaOptions }) {
      return pizzaOptions?.dough.map((item) => normalizeDough(item));
    },
    fillings({ pizzaOptions }) {
      return pizzaOptions?.ingredients.map((filling) =>
        normalizeFilling(filling)
      );
    },
  },

  mutations: {
    [SET_DOUGH](state, { doughType, dough }) {
      state.pizza.doughValue = doughType;
      state.pizza.dough = dough;
    },
    [SET_SIZE](state, { sizeType, size }) {
      state.pizza.sizeValue = sizeType;
      state.pizza.size = size;
    },
    [SET_SAUCE](state, { sauceType, sauce }) {
      state.pizza.sauceValue = sauceType;
      state.pizza.sauce = sauce;
    },
    [SET_FILLING](state, { fillingType, count }) {
      state.pizza.fillingCounts[fillingType] = count;
    },
    [DROP_FILLING](state, fillingType) {
      state.pizza.fillingCounts[fillingType] += 1;
    },
    [SET_NAME](state, name) {
      state.pizza.name = name;
    },
    [SET_PRICE](state, price) {
      state.pizza.price = price;
    },
  },

  actions: {
    createNewPizza({ state, rootState, getters, commit }, pizzaId) {
      const createNewPizza = () => {
        return {
          id: uniqueId(),
          name: "",
          dough: getters.dough.find(
            ({ type }) => type === DOUGH_TYPES[0].value
          ),
          doughValue: DOUGH_TYPES[0].value,
          size: getters.sizes.find(({ type }) => type === SIZE_TYPES[0].value),
          sizeValue: SIZE_TYPES[0].value,
          sauce: getters.sauces.find(
            ({ type }) => type === SAUCE_TYPES[0].value
          ),
          sauceValue: SAUCE_TYPES[0].value,
          fillingCounts: state?.pizzaOptions?.ingredients.reduce(
            (obj, { name }) => {
              const type = FILLING_TYPES.find(
                ({ label }) => name === label
              )?.value;
              obj[type] = 0;

              return obj;
            },
            {}
          ),
          price: 0,
          count: 1,
        };
      };

      let newPizza = null;

      if (pizzaId) {
        newPizza = rootState.Cart.pizzas.find(({ id }) => +id === +pizzaId);
      } else {
        newPizza = createNewPizza();
      }

      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "pizza",
          value: newPizza,
        },
        { root: true }
      );
    },

    fetchPizzaOptions({ commit }) {
      const pizzaOptions = jsonPizza;

      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "pizzaOptions",
          value: pizzaOptions,
        },
        { root: true }
      );
    },

    setDough({ getters, commit }, doughType) {
      const dough = getters.dough.find(({ type }) => type === doughType);

      commit(SET_DOUGH, { doughType, dough });
    },

    setSize({ getters, commit }, sizeType) {
      const size = getters.sizes.find(({ type }) => type === sizeType);

      commit(SET_SIZE, { sizeType, size });
    },

    setSauce({ getters, commit }, sauceType) {
      const sauce = getters.sauces.find(({ type }) => type === sauceType);

      commit(SET_SAUCE, { sauceType, sauce });
    },

    setFilling({ commit }, { fillingType, count }) {
      commit(SET_FILLING, { fillingType, count });
    },

    dropFilling({ commit }, filling) {
      commit(DROP_FILLING, filling.type);
    },

    setName({ commit }, name) {
      commit(SET_NAME, name);
    },

    setPrice({ commit }, price) {
      commit(SET_PRICE, price);
    },
  },
};
