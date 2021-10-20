import { mount } from "@vue/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types.js";

const mockIngredients = [
  {
    id: 1,
    name: "Грибы",
    image: "/public/img/filling/mushrooms.svg",
    price: 33,
    type: "mushrooms",
  },
  {
    id: 2,
    name: "Чеддер",
    image: "/public/img/filling/cheddar.svg",
    price: 42,
    type: "cheddar",
  },
  {
    id: 3,
    name: "Томаты",
    image: "/public/img/filling/tomatoes.svg",
    price: 35,
    type: "tomatoes",
  },
  {
    id: 4,
    name: "Лосось",
    image: "/public/img/filling/salmon.svg",
    price: 50,
    type: "salmon",
  },
];
const mockSauces = [
  { id: 1, name: "Томатный", price: 50, type: "tomato" },
  {
    id: 2,
    name: "Сливочный",
    price: 50,
    type: "creamy",
  },
];
const mockPizza = {
  id: "1",
  name: "",
  sauceId: 1,
  doughId: 1,
  sizeId: 1,
  quantity: 1,
  ingredients: [],
};
const mocks = {
  $store: {},
};

const createIngredients = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: mockIngredients,
    },
    { root: true }
  );
};

const createSauces = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: mockSauces,
    },
    { root: true }
  );
};

const createPizza = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "pizza",
      value: mockPizza,
    },
    { root: true }
  );
};

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
    createComponent({ store });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders sauces", () => {
    createPizza(store);
    createSauces(store);
    createComponent({ store });
    const sauceRadios = wrapper.findAll(`[data-test="sauce-radio-input"]`);
    expect(sauceRadios.wrappers.length).toEqual(mockSauces.length);
  });

  it("renders ingredients", () => {
    createPizza(store);
    createIngredients(store);
    createComponent({ store });
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
    createComponent({ mocks, store });
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
    createComponent({ mocks, store });
    const ingredientCounter = wrapper.find(`[data-test="ingredient-counter"]`);
    await ingredientCounter.vm.$emit("input", mockIngredients[0].id, 1);
    expect(actions.Builder.setIngredient).toHaveBeenCalled();
    expect(actions.Builder.setIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      { ingredientId: mockIngredients[0].id, quantity: 1 }
    );
  });
});

/*
 * <ul v-if="ingredients" class="ingredients__list">
 * <div v-if="pizza" class="sheet__content ingredients">
 *
 * ...mapState("Builder", ["pizza", "ingredients", "sauces"]),
 * this.$store.dispatch("Builder/setSauce", val);
 * ...mapActions("Builder", ["setIngredient"]),
 * */
