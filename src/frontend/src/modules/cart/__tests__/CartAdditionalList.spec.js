import { mount } from "@vue/test-utils";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList.vue";
import { generateMockStore } from "@/store/mocks";
import { mocksCartMisc } from "@/store/mocks/mocks-cart";

describe("CartAdditionalList", () => {
  const propsData = {
    misc: mocksCartMisc,
    cartOrder: {
      userId: null,
      phone: "",
      address: null,
      pizzas: [
        {
          id: "1",
          name: "gfhgh",
          sauceId: 1,
          doughId: 1,
          sizeId: 1,
          quantity: 1,
          ingredients: [{ ingredientId: 8, quantity: 1 }],
        },
      ],
      misc: [{ miscId: 1, quantity: 1 }],
    },
  };
  let wrapper;
  let store;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(CartAdditionalList, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updateMiscCount: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("sets props data", () => {
    createComponent({ propsData });
    const miscItem = wrapper.find(`[data-test="cart-misc-item"]`);
    const miscCounterInput = miscItem.find(`[data-test="misc-counter"] input`);
    expect(miscItem.html()).toContain(propsData.misc[0].name);
    expect(miscItem.html()).toContain(propsData.misc[0].price);
    const misc = propsData.cartOrder.misc.find(
      ({ miscId }) => miscId === propsData.misc[0].id
    );
    expect(miscCounterInput.element.value).toBe(misc.quantity.toString());
  });

  it("calls `updateMiscCount` action when on input misc counter", async () => {
    createComponent({ propsData, store });
    const quantity = 2;
    const miscCounter = wrapper.find(`[data-test="misc-counter"]`);
    await miscCounter.vm.$emit("input", quantity);
    expect(actions.Cart.updateMiscCount).toHaveBeenCalledWith(
      expect.any(Object),
      { miscId: propsData.misc[0].id, quantity }
    );
  });
});

/*
 *
 * Проверка
 *
 * @input="changeMiscCount(miscItem.id, $event)"
 * ...mapActions("Cart", ["updateMiscCount"]),
 *
 */
