import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import AppProductDescription from "@/common/components/AppProductDescription";
import {
  createDough,
  createIngredients,
  createSauces,
  createSizes,
  mockDough,
  mockIngredients,
  mockSizes,
} from "@/store/mocks/mocks-builder";
import { generateMockStore } from "@/store/mocks";
import { mockCartPizza } from "@/store/mocks/mocks-cart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppProductDescription", () => {
  const propsData = {
    pizza: mockCartPizza,
  };
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = shallowMount(AppProductDescription, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createIngredients(store);
    createDough(store);
    createSizes(store);
    createSauces(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it renders", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays pizza name", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain(mockCartPizza.name);
  });

  it("displays size and dough names", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain(
      mockSizes.find(({ id }) => mockCartPizza.sizeId === id).name
    );
    expect(wrapper.html()).toContain(
      mockDough.find(({ id }) => mockCartPizza.doughId === id).nameAlt
    );
  });

  it("displays ingredient names", () => {
    createComponent({ localVue, store, propsData });
    mockIngredients
      .filter(({ id }) => {
        return mockCartPizza.ingredients.some(
          ({ ingredientId }) => ingredientId === id
        );
      })
      .forEach(({ name }) => {
        expect(wrapper.html()).toContain(name.toLowerCase());
      });
  });
});
