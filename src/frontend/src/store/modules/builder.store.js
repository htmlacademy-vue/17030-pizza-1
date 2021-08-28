import {
  DROP_INGREDIENT,
  SET_DOUGH,
  SET_ENTITY,
  SET_INGREDIENT,
  SET_NAME,
  SET_PRICE,
  SET_SAUCE,
  SET_SIZE,
} from "@/store/mutation-types.js";
import {
  DOUGH_TYPES,
  INGREDIENT_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants.js";
import { uniqueId } from "lodash";

export default {
  namespaced: true,

  state: {
    pizza: null,
    dough: null,
    ingredients: null,
    sauces: null,
    sizes: null,
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
    [SET_INGREDIENT](state, { ingredientType, count }) {
      state.pizza.ingredientCounts[ingredientType] = count;
    },
    [DROP_INGREDIENT](state, ingredientType) {
      state.pizza.ingredientCounts[ingredientType] += 1;
    },
    [SET_NAME](state, name) {
      state.pizza.name = name;
    },
    [SET_PRICE](state, price) {
      state.pizza.price = price;
    },
  },

  actions: {
    createNewPizza({ state, rootState, commit }, pizzaId) {
      const createNewPizza = () => {
        return {
          id: uniqueId(),
          name: "",
          dough: state.dough?.find(({ type }) => type === DOUGH_TYPES[0].value),
          doughValue: DOUGH_TYPES[0].value,
          size: state.sizes?.find(({ type }) => type === SIZE_TYPES[0].value),
          sizeValue: SIZE_TYPES[0].value,
          sauce: state.sauces?.find(
            ({ type }) => type === SAUCE_TYPES[0].value
          ),
          sauceValue: SAUCE_TYPES[0].value,
          ingredientCounts: state.ingredients?.reduce((obj, { name }) => {
            const type = INGREDIENT_TYPES.find(
              ({ label }) => name === label
            )?.value;
            obj[type] = 0;

            return obj;
          }, {}),
          price: 0,
          count: 1,
        };
      };

      let newPizza = null;

      if (pizzaId) {
        newPizza = rootState.Cart.products.find(({ id }) => +id === +pizzaId);
      } else {
        newPizza = createNewPizza();
      }

      commit(
        SET_ENTITY,
        { module: "Builder", entity: "pizza", value: newPizza },
        { root: true }
      );
    },

    async fetchDough({ commit }) {
      const dough = await this.$api.dough.query();
      commit(
        SET_ENTITY,
        { module: "Builder", entity: "dough", value: dough },
        { root: true }
      );
    },

    async fetchSauces({ commit }) {
      const sauces = await this.$api.sauces.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "sauces",
          value: sauces,
        },
        { root: true }
      );
    },

    async fetchIngredients({ commit }) {
      const ingredients = await this.$api.ingredients.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "ingredients",
          value: ingredients,
        },
        { root: true }
      );
    },

    async fetchSizes({ commit }) {
      const sizes = await this.$api.sizes.query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: "sizes",
          value: sizes,
        },
        { root: true }
      );
    },

    setDough({ state, commit }, doughType) {
      const dough = state.dough.find(({ type }) => type === doughType);

      commit(SET_DOUGH, { doughType, dough });
    },

    setSize({ state, commit }, sizeType) {
      const size = state.sizes.find(({ type }) => type === sizeType);

      commit(SET_SIZE, { sizeType, size });
    },

    setSauce({ state, commit }, sauceType) {
      const sauce = state.sauces.find(({ type }) => type === sauceType);

      commit(SET_SAUCE, { sauceType, sauce });
    },

    setIngredient({ commit }, { ingredientType, count }) {
      commit(SET_INGREDIENT, { ingredientType, count });
    },

    dropIngredient({ commit }, ingredient) {
      commit(DROP_INGREDIENT, ingredient.type);
    },

    setName({ commit }, name) {
      commit(SET_NAME, name);
    },

    setPrice({ commit }, price) {
      commit(SET_PRICE, price);
    },
  },
};
