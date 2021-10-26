import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import {
  createDough,
  createIngredients,
  createPizza,
  createSauces,
  createSizes,
  generateMockStore,
  mockIngredients,
} from "@/store/mocks";
import AppButton from "@/common/components/AppButton.vue";
import { SET_INGREDIENT, SET_NAME } from "@/store/mutation-types.js";

const setPizzaName = (store) => {
  store.commit(`Builder/${SET_NAME}`, "pizza name");
};

const setPizzaIngredient = (store) => {
  store.commit(`Builder/${SET_INGREDIENT}`, {
    ingredientId: mockIngredients[0].id,
    quantity: 3,
  });
};

const localVue = createLocalVue();
localVue.component("AppButton", AppButton);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      actions: {
        addPizzaToCart: jest.fn(),
      },
      Builder: {
        createNewPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    createPizza(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
  });

  it("is disabled button which add a pizza to the order", () => {
    createComponent({ localVue, store });
    const btnCook = wrapper.find(`[data-test="button-cook"]`);
    expect(btnCook.attributes("disabled")).toBeTruthy();
  });

  it("is enabled button which add a pizza to the order", () => {
    setPizzaName(store);
    setPizzaIngredient(store);
    createComponent({ localVue, store });
    const btnCook = wrapper.find(`[data-test="button-cook"]`);
    expect(btnCook.attributes("disabled")).toBeFalsy();
  });

  it("adds a pizza to the cart", async () => {
    setPizzaName(store);
    setPizzaIngredient(store);
    createComponent({ localVue, store });
    const spyAddToCart = jest.spyOn(wrapper.vm, "addToCart");
    const btnCook = wrapper.find(`[data-test="button-cook"]`);
    await btnCook.trigger("click");
    expect(spyAddToCart).toHaveBeenCalled();
    expect(actions.actions.addPizzaToCart).toHaveBeenCalled();
    expect(actions.Builder.createNewPizza).toHaveBeenCalled();
  });
});

/*
 * Проверка
 *
 * :disabled="canNotOrder"
 * ...mapActions("Builder", ["createNewPizza"]),
 * ...mapActions("Cart", ["updatePizzaPrices"]),
 *
 */
