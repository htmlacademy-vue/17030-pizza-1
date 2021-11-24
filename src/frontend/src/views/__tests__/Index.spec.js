import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Index from "@/views/index/Index.vue";
import { generateMockStore } from "@/store/mocks";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import {
  createDough,
  createIngredients,
  createPizza,
  createSauces,
  createSizes,
  mockPizza,
} from "@/store/mocks/mocks-builder.js";

const localVue = createLocalVue();

localVue.component("AppButton", AppButton);
localVue.component("AppInput", AppInput);

localVue.use(Vuex);

describe("Index", () => {
  const stubs = ["router-view"];
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setName: jest.fn(),
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
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls `setName` action when on input name of the pizza", async () => {
    createComponent({ localVue, store, stubs });
    const pizzaName = "test mame";
    const pizzaNameField = wrapper.find(`[data-test="pizza-name"]`);
    await pizzaNameField.vm.$emit("input", pizzaName);
    expect(actions.Builder.setName).toHaveBeenLastCalledWith(
      expect.any(Object),
      pizzaName
    );
  });

  it("gets pizza name from store", () => {
    mockPizza.name = "test name 2";
    createComponent({ localVue, stubs, store });
    const pizzaNameField = wrapper.find(`[data-test="pizza-name"]`);
    expect(pizzaNameField.find("input").element.value).toBe(mockPizza.name);
  });
});

// Список элементов для тестирования
/*
 * this.$store.dispatch("Builder/setName", val);
 * */

// Данные из тест-хранилища
/*
 * this.$store.state.Builder.pizza?.name;
 * */
