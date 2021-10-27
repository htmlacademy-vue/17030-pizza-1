import { mount } from "@vue/test-utils";
import CartProductItem from "@/modules/cart/components/CartProductItem.vue";
import { createIngredients, generateMockStore } from "@/store/mocks";
import { mockCartPizza } from "@/store/mocks/mocks-cart.js";

describe("CartProductItem", () => {
  const propsData = {
    pizza: mockCartPizza,
  };
  let wrapper;
  let store;
  let actions;
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(CartProductItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updatePizzaQuantity: jest.fn(),
        changePizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createIngredients(store);
    // addPizzaToCart(store);
    createComponent({ store, propsData });
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls `updatePizzaQuantity` action on input AppCounter", async () => {
    createIngredients(store);
    createComponent({ store, propsData });
    const quantity = 2;
    const pizzaCounter = wrapper.find(`[data-test="pizza-counter"]`);
    await pizzaCounter.vm.$emit("input", quantity);
    expect(actions.Cart.updatePizzaQuantity).toHaveBeenCalledWith(
      expect.any(Object),
      {
        pizzaId: mockCartPizza.id,
        quantity: quantity,
      }
    );
  });

  it("calls `editPizza` on click by button", async () => {
    createIngredients(store);
    createComponent({ store, propsData, mocks });
    const editBtn = wrapper.find(`[data-test="change-button"]`);
    await editBtn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalled();
    expect(actions.Cart.changePizza).toHaveBeenCalledWith(
      expect.any(Object),
      mockCartPizza.id
    );
  });
});

/*
 * Проверка
 *
 * @input="changeQuantity(pizza.id, $event)"
 * @click.prevent="editPizza(pizza.id)"
 * ...mapActions("Cart", ["updatePizzaQuantity", "changePizza"]),
 *
 */
