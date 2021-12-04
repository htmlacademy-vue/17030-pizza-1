import { createLocalVue, mount } from "@vue/test-utils";
import Cart from "@/views/Cart.vue";
import { generateMockStore } from "@/store/mocks";
import {
  addPizzaToCart,
  createCartMisc,
  mocksCartMisc,
  newAddress,
  setReceivingAddress,
  setReceivingMethod,
} from "@/store/mocks/mocks-cart.js";
import AppPopup from "@/common/components/AppPopup.vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import {
  createDough,
  createIngredients,
  createSauces,
  createSizes,
} from "@/store/mocks/mocks-builder.js";
import AppProductDescription from "@/common/components/AppProductDescription";
import AppClose from "@/common/components/AppClose";

const localVue = createLocalVue();
localVue.component("AppPopup", AppPopup);
localVue.component("AppInput", AppInput);
localVue.component("AppButton", AppButton);
localVue.component("AppProductDescription", AppProductDescription);
localVue.component("AppClose", AppClose);

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        post: jest.fn(),
      },
      Cart: {
        fetchMisc: jest.fn(),
        resetState: jest.fn(),
        setReceivingMethod: jest.fn(),
        setAddressToCartOrder: jest.fn(),
      },
      Builder: {
        createNewPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("empty cart", () => {
    createComponent({ localVue, store });
    const cartEmpty = wrapper.find(`[data-test="cart-empty"]`);
    const cartFooter = wrapper.find(`[data-test="cart-footer"]`);
    expect(cartEmpty.exists()).toBeTruthy();
    expect(cartFooter.exists()).toBeFalsy();
  });

  it("has items in the cart", () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createComponent({ localVue, store });
    const cartEmpty = wrapper.find(`[data-test="cart-empty"]`);
    const cartFooter = wrapper.find(`[data-test="cart-footer"]`);
    expect(cartEmpty.exists()).toBeFalsy();
    expect(cartFooter.exists()).toBeTruthy();
  });

  it("renders cart product items", () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createComponent({ localVue, store });
    const cartProductItems = wrapper.findAll(`[data-test="cart-product-item"]`);
    expect(cartProductItems.wrappers.length).toBe(
      store.state.Cart.cartOrder.pizzas.length
    );
  });

  it("renders cart misc items", () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createCartMisc(store);
    createComponent({ localVue, store });
    const cartMiscItems = wrapper.findAll(`[data-test="cart-misc-item"]`);
    expect(cartMiscItems.wrappers.length).toBe(mocksCartMisc.length);
  });

  it("selects pickup receiving", async () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createCartMisc(store);
    createComponent({ localVue, store });
    const selectReceivingOptions = wrapper
      .find(`[data-test="select-receiving"]`)
      .findAll("option");
    await selectReceivingOptions.at(0).setSelected();
    const deliveryAddress = wrapper.find(`[data-test="delivery-address-form"]`);
    expect(wrapper.find("option:checked").element.value).toBe("pickup");
    expect(deliveryAddress.exists()).toBeFalsy();
  });

  it("sets new-address receiving", async () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createCartMisc(store);
    setReceivingMethod(store, "new-address");
    setReceivingAddress(store, newAddress);
    createComponent({ localVue, store });
    const deliveryAddress = wrapper.find(`[data-test="delivery-address-form"]`);
    expect(wrapper.find("option:checked").element.value).toBe("new-address");
    expect(deliveryAddress.exists()).toBeTruthy();
  });

  it("selects new address on change select receiving", async () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createCartMisc(store);
    createComponent({ localVue, store });
    const selectReceivingOptions = wrapper
      .find(`[data-test="select-receiving"]`)
      .findAll("option");
    await selectReceivingOptions.at(1).setSelected();
    expect(wrapper.find("option:checked").element.value).toBe("new-address");
  });

  it("validate mixin has been called on form submit", async () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createCartMisc(store);
    setReceivingMethod(store, "new-address");
    setReceivingAddress(store, newAddress);
    createComponent({ localVue, store });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    expect(wrapper.find("option:checked").element.value).toBe("new-address");
    await wrapper.trigger("submit.prevent");
    expect(spyValidateFields).toHaveBeenCalled();
  });

  it("send pizza on form submit", async () => {
    createDough(store);
    createSauces(store);
    createIngredients(store);
    createSizes(store);
    addPizzaToCart(store);
    createCartMisc(store);
    setReceivingMethod(store, "new-address");
    setReceivingAddress(store, newAddress);
    createComponent({ localVue, store, mocks });
    const selectReceivingOptions = wrapper
      .find(`[data-test="select-receiving"]`)
      .findAll("option");
    await selectReceivingOptions.at(1).setSelected();
    const fieldTel = wrapper.find(`[data-test="tel"]`);
    await fieldTel.vm.$emit("input", "8800880088");
    const fieldStreet = wrapper.find(`[data-test="street"]`);
    await fieldStreet.vm.$emit("input", "Street");
    const fieldHouse = wrapper.find(`[data-test="house"]`);
    await fieldHouse.vm.$emit("input", "8");
    const fieldApartment = wrapper.find(`[data-test="apartment"]`);
    await fieldApartment.vm.$emit("input", "88");
    await wrapper.trigger("submit");
    expect(actions.Orders.post).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("Спасибо за заказ");
    const popup = wrapper.find(`[data-test="popup"]`);
    await popup.vm.$emit("close");
    expect(actions.Cart.resetState).toHaveBeenCalled();
    expect(actions.Builder.createNewPizza).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});

/*
 * Проверка
 *
 * <template v-if="hasProducts">
 * v-for="pizza in cartOrder.pizzas"
 * v-for="miscItem in misc"
 * v-for="address in addresses"
 * <div v-if="isNotPickupReceiving" class="cart-form__address">
 * <CartFooter v-if="hasProducts" />
 * <AppPopup :visible="isPopupVisible" @close="closePopup">
 *
 * ...mapState("Builder", ["pizza", "ingredients"]),
 * ...mapState("Cart", ["cartOrder", "misc", "receivingMethodValue"]),
 * ...mapState("Auth", ["addresses", "user"]),
 * this.$store.dispatch("Cart/fetchMisc");
 * ...mapActions("Cart", [
 *   "setUserIdToCartOrder",
 *   "resetState",
 *   "setReceivingMethod",
 * ]),
 * ...mapActions("Builder", ["createNewPizza"]),
 * await this.$store.dispatch("Orders/post", this.cartOrder);
 * this.$router.push("/orders");
 * this.$router.push("/");
 *
 */
