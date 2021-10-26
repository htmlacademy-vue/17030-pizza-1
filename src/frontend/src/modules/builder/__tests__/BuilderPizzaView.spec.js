import { createLocalVue, mount } from "@vue/test-utils";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import {
  createDough,
  createIngredients,
  createPizza,
  createSauces,
  createSizes,
  generateMockStore,
  mockDough,
  mockIngredients,
  mockSauces,
} from "@/store/mocks";
import {
  SET_DOUGH,
  SET_INGREDIENT,
  SET_SAUCE,
} from "@/store/mutation-types.js";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const setPizzaCreamySauce = (store) => {
  store.commit(`Builder/${SET_SAUCE}`, mockSauces[1].id);
};

const setPizzaBigDough = (store) => {
  store.commit(`Builder/${SET_DOUGH}`, mockDough[1].id);
};

const INGREDIENT = mockIngredients[0];
const FILLING_AMOUNT = 3;

const setPizzaMushroomsIngredient = (store) => {
  store.commit(`Builder/${SET_INGREDIENT}`, {
    ingredientId: INGREDIENT.id,
    quantity: FILLING_AMOUNT,
  });
};

const transitionStub = () => ({
  render: function () {
    return this.$options._renderChildren;
  },
});

describe("BuilderPizzaView", () => {
  const classFoundation = "pizza--foundation--big-creamy";
  const classFilling = `pizza__filling--${INGREDIENT.type}`;
  const classFillingSecond = "pizza__filling--second";
  const classFillingThird = "pizza__filling--second";

  const stubs = {
    transition: transitionStub(),
  };
  let wrapper;
  let actions;
  let store;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        dropIngredient: jest.fn(),
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
    createComponent({ store, localVue, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("generates `pizza--foundation--big-creamy` class", () => {
    setPizzaBigDough(store);
    setPizzaCreamySauce(store);
    createComponent({ store, localVue, stubs });
    const pizza = wrapper.find(`[data-test="pizza"]`);
    expect(pizza.classes(classFoundation)).toBeTruthy();
  });

  it(`generates \`pizza__${INGREDIENT.type}\` class with modifiers`, () => {
    setPizzaMushroomsIngredient(store);
    createComponent({ store, localVue, stubs });
    const pizzaIngredients = wrapper.findAll(`[data-test="pizza-ingredient"]`);
    expect(pizzaIngredients.wrappers.length).toBe(FILLING_AMOUNT);
    expect(pizzaIngredients.wrappers[0].classes(classFilling)).toBeTruthy();
    expect(
      pizzaIngredients.wrappers[1].classes(classFilling, classFillingSecond)
    ).toBeTruthy();
    expect(
      pizzaIngredients.wrappers[2].classes(classFilling, classFillingThird)
    ).toBeTruthy();
  });

  it("calls `dropIngredient` action", async () => {
    createComponent({ store, localVue, stubs });
    const transferData = mockIngredients[0];
    const appDropElement = wrapper.findComponent({ name: "AppDrop" });
    await appDropElement.vm.$emit("drop", transferData);
    expect(actions.Builder.dropIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      transferData
    );
  });
});

/*
 * Протестировать
 *
 * <div v-if="pizza" class="pizza" :class="classFoundation">
 * <template v-for="ingredientMini in this.pizza.ingredients">
 * :class="classIngredient(ingredientMini.ingredientId, quantity)"
 *
 * ...mapState("Builder", ["pizza", "ingredients"]),
 * ...mapActions("Builder", ["dropIngredient"]),
 *
 */
