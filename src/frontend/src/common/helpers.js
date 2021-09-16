import resources from "@/common/enums/resources.js";
import {
  AuthApiService,
  CrudApiService,
  DoughApiService,
  IngredientsApiService,
  MiscApiService,
  SaucesApiService,
  SizesApiService,
} from "@/services/api.service.js";
import { SET_ENTITY } from "@/store/mutation-types.js";
import pizzaComponents from "@/common/enums/pizzaComponents.js";

export class PizzaCalculator {
  #store;

  constructor(store) {
    this.#store = store;
  }

  getPriceOfDough(pizza) {
    const dough = this.#store.getters["Builder/getFullPizzaComponentById"](
      pizzaComponents.DOUGH,
      pizza?.doughId
    );
    return dough?.price ?? 0;
  }

  getPriceOfSauce(pizza) {
    const sauce = this.#store.getters["Builder/getFullPizzaComponentById"](
      pizzaComponents.SAUCES,
      pizza?.sauceId
    );
    return sauce?.price ?? 0;
  }

  getPriceOfIngredients(pizza) {
    return pizza?.ingredients?.reduce((sum, ingredientMini) => {
      const ingredient = this.#store.getters[
        "Builder/getFullPizzaComponentById"
      ](pizzaComponents.INGREDIENTS, ingredientMini.ingredientId);
      return sum + ingredient.price * ingredientMini.quantity;
    }, 0);
  }

  getSize(pizza) {
    const size = this.#store.getters["Builder/getFullPizzaComponentById"](
      pizzaComponents.SIZES,
      pizza?.sizeId
    );
    return size?.multiplier ?? 0;
  }

  getPrice(pizza) {
    return (
      (this.getPriceOfDough(pizza) +
        this.getPriceOfSauce(pizza) +
        this.getPriceOfIngredients(pizza)) *
      this.getSize(pizza)
    );
  }
}

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.USER]: new CrudApiService(resources.USER, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new DoughApiService(notifier),
    [resources.INGREDIENTS]: new IngredientsApiService(notifier),
    [resources.MISC]: new MiscApiService(notifier),
    [resources.SAUCES]: new SaucesApiService(notifier),
    [resources.SIZES]: new SizesApiService(notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};
