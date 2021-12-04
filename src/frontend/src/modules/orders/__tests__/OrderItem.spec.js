import { createLocalVue, mount } from "@vue/test-utils";
import OrderItem from "@/modules/orders/components/OrderItem.vue";
import { generateMockStore } from "@/store/mocks";
import AppButton from "@/common/components/AppButton.vue";
import { mocksOrder } from "@/store/mocks/mocks-order.js";
import { createCartMisc } from "@/store/mocks/mocks-cart.js";
import {
  createDough,
  createIngredients,
  createPizza,
  createSauces,
  createSizes,
} from "@/store/mocks/mocks-builder.js";
import AppProductDescription from "@/common/components/AppProductDescription";

const localVue = createLocalVue();
const selfPickupPhrase = "Заберу сам";
localVue.component("AppButton", AppButton);
localVue.component("AppProductDescription", AppProductDescription);

describe("OrderItem", () => {
  let wrapper;
  let actions;
  let store;
  const propsData = {
    order: mocksOrder,
  };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(OrderItem, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        delete: jest.fn(),
        repeatOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createCartMisc(store);
    createIngredients(store);
    createSizes(store);
    createSauces(store);
    createDough(store);
    createPizza(store);
    createComponent({ store, propsData, localVue });
    const orderNumber = `Заказ #${propsData.order.id}`;
    const orderPizzaName = propsData.order.orderPizzas[0].name;
    const orderAddressName = propsData.order.orderAddress.name;
    const orderAdditional = wrapper.find(`[data-test="order-additional"]`);
    expect(wrapper.html()).toContain(orderNumber);
    expect(wrapper.html()).toContain(orderPizzaName);
    expect(wrapper.html()).toContain(orderAddressName);
    expect(orderAdditional.exists()).toBeTruthy();
    expect(wrapper.exists()).toBeTruthy();
  });

  it(`show ${selfPickupPhrase} when isn't set address`, () => {
    createCartMisc(store);
    createIngredients(store);
    createSizes(store);
    createSauces(store);
    createDough(store);
    createPizza(store);
    propsData.order.addressId = null;
    propsData.order.orderAddress = null;
    createComponent({ store, propsData, localVue });
    expect(wrapper.html()).toContain(selfPickupPhrase);
  });

  it("don`t show order additional when isn't created `misc`", () => {
    createIngredients(store);
    createSizes(store);
    createSauces(store);
    createDough(store);
    createPizza(store);
    propsData.order.orderMisc = null;
    createComponent({ store, propsData, localVue });
    const orderAdditional = wrapper.find(`[data-test="order-additional"]`);
    expect(orderAdditional.exists()).toBeFalsy();
  });

  it("removes order on click remove button", async () => {
    createCartMisc(store);
    createIngredients(store);
    createSizes(store);
    createSauces(store);
    createDough(store);
    createPizza(store);
    createComponent({ store, propsData, localVue });
    const removeBtn = wrapper.find(`[data-test="remove-button"]`);
    await removeBtn.trigger("click");
    expect(actions.Orders.delete).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.order.id
    );
  });

  it("repeat order on click repeat button", async () => {
    createCartMisc(store);
    createIngredients(store);
    createSizes(store);
    createSauces(store);
    createDough(store);
    createPizza(store);
    createComponent({ store, propsData, localVue, mocks });
    const repeatBtn = wrapper.find(`[data-test="repeat-button"]`);
    await repeatBtn.trigger("click");
    expect(actions.Orders.repeatOrder).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.order.id
    );
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});

/*
 * Проверка
 *
 * <ul v-if="order.orderMisc" class="order__additional">

 * ...mapState("Builder", ["dough", "ingredients", "sauces", "sizes"]),
 * ...mapState("Cart", ["misc"]),
 * this.$store.dispatch("Orders/delete", orderId);
 * this.$store.dispatch("Orders/repeatOrder", orderId);
 * this.$router.push("/cart");
 *
 */
