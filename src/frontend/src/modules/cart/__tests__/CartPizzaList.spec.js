import { mount } from "@vue/test-utils";
import CartPizzaList from "@/modules/cart/components/CartPizzaList.vue";
import { generateMockStore } from "@/store/mocks";
import { mockCartPizza } from "@/store/mocks/mocks-cart.js";
import { createIngredients } from "@/store/mocks/mocks-builder.js";

describe("CartPizzaList", () => {
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
    wrapper = mount(CartPizzaList, options);
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
    createComponent({ store, propsData });
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
        quantity,
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
