import {
  ADD_PIZZA,
  RESET_STATE,
  SET_ENTITY,
  SET_USER_ID_TO_CART_ORDER,
  SETUP_EXIST_ORDER,
  UPDATE_MISC_QUANTITY,
  UPDATE_PIZZA_PRICES,
  UPDATE_PIZZA_QUANTITY,
} from "@/store/mutation-types.js";
import pizzaComponents from "@/common/enums/pizzaComponents.js";

const setupState = () => ({
  cartOrder: {
    userId: null,
    phone: "",
    address: null,
    pizzas: [],
    misc: [],
  },
  misc: [],
  receivingMethodValue: "pickup",
});

export default {
  namespaced: true,

  state: setupState,

  getters: {
    totalPrice(state, getters) {
      return getters.pizzaPrices + getters.miscPrices;
    },

    pizzaPrices(state, getters, rootState, rootGetters) {
      return state.cartOrder.pizzas?.reduce((sum, pizza) => {
        const doughPrice =
          rootGetters["Builder/getFullPizzaComponentById"](
            pizzaComponents.DOUGH,
            pizza?.doughId
          )?.price ?? 0;

        const saucePrice =
          rootGetters["Builder/getFullPizzaComponentById"](
            pizzaComponents.SAUCES,
            pizza?.sauceId
          )?.price ?? 0;

        const ingredientsPrice = pizza?.ingredients?.reduce(
          (sum, ingredientOrderItem) => {
            const ingredient = rootGetters["Builder/getFullPizzaComponentById"](
              pizzaComponents.INGREDIENTS,
              ingredientOrderItem.ingredientId
            );
            return sum + ingredient.price * ingredientOrderItem.quantity;
          },
          0
        );

        const multiplier =
          rootGetters["Builder/getFullPizzaComponentById"](
            pizzaComponents.SIZES,
            pizza?.sizeId
          )?.multiplier ?? 1;

        const priceOForOnePizza =
          multiplier * (doughPrice + saucePrice + ingredientsPrice);

        return sum + priceOForOnePizza * pizza.quantity;
      }, 0);
    },

    miscPrices(state) {
      return state.cartOrder.misc.reduce((sum, { miscId, quantity }) => {
        const miscPrice =
          state.misc?.find(({ id }) => +id === +miscId)?.price ?? 0;

        return sum + miscPrice * quantity;
      }, 0);
    },
  },

  mutations: {
    [ADD_PIZZA](state, pizza) {
      const index = state.cartOrder.pizzas.findIndex(
        ({ id }) => +id === +pizza.id
      );

      if (~index) {
        state.cartOrder.pizzas = state.cartOrder.pizzas.splice(index, 1, pizza);
      } else {
        state.cartOrder.pizzas = [...state.cartOrder.pizzas, pizza];
      }
    },

    [UPDATE_PIZZA_QUANTITY](state, { pizzaId, quantity }) {
      const index = state.cartOrder.pizzas.findIndex(
        ({ id }) => +id === +pizzaId
      );

      if (~index) {
        const pizza = { ...state.cartOrder.pizzas[index], quantity };
        state.cartOrder.pizzas.splice(index, 1, pizza);
      }
    },

    [UPDATE_MISC_QUANTITY](state, { miscId, quantity }) {
      const newMisc = {
        miscId,
        quantity,
      };

      const index = state.cartOrder.misc.findIndex(
        (misc) => misc.miscId === miscId
      );

      if (~index) {
        state.cartOrder.misc.splice(index, 1, newMisc);
      } else {
        state.cartOrder.misc = [...state.cartOrder.misc, newMisc];
      }
    },

    [UPDATE_PIZZA_PRICES](state, pizzaPrices) {
      state.pizzasPrice = pizzaPrices;
    },

    [SET_USER_ID_TO_CART_ORDER](state, userId) {
      state.cartOrder.userId = userId;
    },

    [RESET_STATE](state) {
      Object.assign(state, setupState());
    },

    [SETUP_EXIST_ORDER](state, normalizedExistOrder) {
      state.cartOrder = { ...normalizedExistOrder };
    },
  },

  actions: {
    async fetchMisc({ commit }) {
      const misc = await this.$api.misc.query();
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "misc",
          value: misc,
        },
        { root: true }
      );
    },

    addPizza({ commit }, pizza) {
      commit(ADD_PIZZA, pizza);
    },

    updatePizzaQuantity({ commit }, { pizzaId, quantity }) {
      commit(UPDATE_PIZZA_QUANTITY, { pizzaId, quantity });
    },

    changePizza({ dispatch }, pizzaId) {
      dispatch("Builder/createNewPizza", pizzaId, { root: true });
    },

    updateMiscCount({ commit }, { miscId, quantity }) {
      commit(UPDATE_MISC_QUANTITY, { miscId, quantity });
    },

    updatePizzaPrices({ commit }, pizzasPrice) {
      commit(UPDATE_PIZZA_PRICES, pizzasPrice);
    },

    setUserIdToCartOrder({ commit }, userId) {
      commit(SET_USER_ID_TO_CART_ORDER, userId);
    },

    resetState({ commit }) {
      commit(RESET_STATE);
    },

    setReceivingMethod({ commit, state }, receivingMethodValue) {
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "receivingMethodValue",
          value: receivingMethodValue ?? state.receivingMethodValue,
        },
        { root: true }
      );
    },

    setupExistOrder({ commit, rootState, dispatch }, existOrderId) {
      const existOrder = rootState.Orders.orders.find(
        ({ id }) => +id === +existOrderId
      );

      const { userId, phone, orderAddress, orderPizzas, orderMisc } =
        existOrder;

      // eslint-disable-next-line no-unused-vars
      const pizzas = orderPizzas.map(({ orderId, ...restPizza }) => {
        const ingredients = restPizza.ingredients.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, pizzaId, ...restIngredients }) => restIngredients
        );

        return { ...restPizza, ingredients };
      });

      const misc =
        // eslint-disable-next-line no-unused-vars
        orderMisc?.map(({ id, orderId, ...restMisc }) => restMisc) ?? [];

      const address = orderAddress ? { ...orderAddress } : null;

      const newExistOrder = {
        userId,
        phone,
        address,
        pizzas,
        misc,
      };

      dispatch("setReceivingMethod", address?.id);
      commit(SETUP_EXIST_ORDER, newExistOrder);
    },
  },
};
