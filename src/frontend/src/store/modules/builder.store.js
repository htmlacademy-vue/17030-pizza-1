import {
  DROP_INGREDIENT,
  SET_DOUGH,
  SET_ENTITY,
  SET_INGREDIENT,
  SET_NAME,
  SET_SAUCE,
  SET_SIZE,
} from "@/store/mutation-types.js";
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

  getters: {
    getFullPizzaComponentById: (state) => (componentName, id) => {
      return state[componentName]?.find(
        (component) => component.id.toString() === id.toString()
      );
    },
  },

  mutations: {
    [SET_DOUGH](state, doughId) {
      state.pizza.doughId = doughId;
    },

    [SET_SIZE](state, sizeId) {
      state.pizza.sizeId = sizeId;
    },

    [SET_SAUCE](state, sauceId) {
      state.pizza.sauceId = sauceId;
    },

    [SET_INGREDIENT](state, { ingredientId, quantity }) {
      const newIngredient = {
        ingredientId,
        quantity,
      };

      const index = state.pizza.ingredients.findIndex(
        (ingredient) =>
          ingredient.ingredientId.toString() === ingredientId.toString()
      );

      if (~index) {
        state.pizza.ingredients.splice(index, 1, newIngredient);
      } else {
        state.pizza.ingredients = [...state.pizza.ingredients, newIngredient];
      }
    },

    [DROP_INGREDIENT](state, ingredientId) {
      const index = state.pizza.ingredients.findIndex(
        (ingredient) =>
          ingredient.ingredientId.toString() === ingredientId.toString()
      );

      if (~index) {
        state.pizza.ingredients[index].quantity += 1;
      } else {
        const newIngredient = {
          ingredientId,
          quantity: 1,
        };
        state.pizza.ingredients = [...state.pizza.ingredients, newIngredient];
      }
    },

    [SET_NAME](state, name) {
      state.pizza.name = name;
    },
  },

  actions: {
    createNewPizza({ state, rootState, commit }, pizzaId = null) {
      const createNewPizza = () => {
        return {
          id: uniqueId(),
          name: "",
          sauceId: state.sauces[0].id,
          doughId: state.dough[0].id,
          sizeId: state.sizes[0].id,
          quantity: 1,
          ingredients: [],
        };
      };

      let newPizza = pizzaId
        ? rootState.Cart.cartOrder.pizzas?.find(
            ({ id }) => id.toString() === pizzaId.toString()
          )
        : createNewPizza();

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

    setDough({ commit }, doughId) {
      commit(SET_DOUGH, doughId);
    },

    setSize({ commit }, sizeId) {
      commit(SET_SIZE, sizeId);
    },

    setSauce({ commit }, sauceId) {
      commit(SET_SAUCE, sauceId);
    },

    setIngredient({ commit }, { ingredientId, quantity }) {
      commit(SET_INGREDIENT, { ingredientId, quantity });
    },

    dropIngredient({ commit }, ingredient) {
      commit(DROP_INGREDIENT, ingredient.id);
    },

    setName({ commit }, name) {
      commit(SET_NAME, name);
    },
  },
};
