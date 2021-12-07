import { createLocalVue, mount } from "@vue/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import { generateMockStore } from "@/store/mocks";
import {
  createIngredients,
  createPizza,
  createSauces,
  mockIngredients,
  mockSauces,
} from "@/store/mocks/mocks-builder.js";
import AppTitle from "@/common/components/AppTitle";

const localVue = createLocalVue();
localVue.component("AppTitle", AppTitle);

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let actions;
  let store;
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setSauce: jest.fn(),
        setIngredient: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store, localVue });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders sauces", () => {
    createPizza(store);
    createSauces(store);
    createComponent({ store, localVue });
    const sauceRadios = wrapper.findAll(`[data-test="sauce-radio-input"]`);
    expect(sauceRadios.wrappers.length).toEqual(mockSauces.length);
  });

  it("renders ingredients", () => {
    createPizza(store);
    createIngredients(store);
    createComponent({ store, localVue });
    const ingredientCounterItems = wrapper.findAll(
      `[data-test="ingredient-counter"]`
    );
    expect(ingredientCounterItems.wrappers.length).toEqual(
      mockIngredients.length
    );
  });

  it("calls set sauce action", async () => {
    createPizza(store);
    createSauces(store);
    createComponent({ store, localVue });
    const secondSauceRadio = wrapper.find(`[data-test="sauce-radio-input"]`);
    await secondSauceRadio.vm.$emit("change", mockSauces[0].id);
    expect(actions.Builder.setSauce).toHaveBeenCalled();
    expect(actions.Builder.setSauce).toHaveBeenCalledWith(
      expect.any(Object),
      mockSauces[0].id
    );
  });

  it("calls set ingredient action", async () => {
    createPizza(store);
    createIngredients(store);
    createComponent({ store, localVue });
    const ingredientCounter = wrapper.find(`[data-test="ingredient-counter"]`);
    await ingredientCounter.vm.$emit("input", 1);
    expect(actions.Builder.setIngredient).toHaveBeenCalled();
    expect(actions.Builder.setIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      { ingredientId: mockIngredients[0].id, quantity: 1 }
    );
  });
});

/*
 * Протестировать
 *
 * <ul v-if="ingredients" class="ingredients__list">
 * <div v-if="pizza" class="sheet__content ingredients">
 *
 * ...mapState("Builder", ["pizza", "ingredients", "sauces"]),
 * this.$store.dispatch("Builder/setSauce", val);
 * ...mapActions("Builder", ["setIngredient"]),
 *
 */
