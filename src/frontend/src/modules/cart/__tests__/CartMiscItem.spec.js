import { mount } from "@vue/test-utils";
import CartMiscItem from "@/modules/cart/components/CartMiscItem.vue";
import { generateMockStore } from "@/store/mocks";

describe("CartMiscItem", () => {
  const propsData = {
    miscItem: {
      id: 1,
      name: "Cola-Cola 0,5 литра",
      image: "/public/img/cola.svg",
      price: 56,
      type: "cola",
    },
    miscQuantity: 4,
  };
  let wrapper;
  let store;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(CartMiscItem, options);
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
    const miscCounterInput = wrapper.find(`[data-test="misc-counter"] input`);
    expect(wrapper.html()).toContain(propsData.miscItem.name);
    expect(wrapper.html()).toContain(propsData.miscItem.price);
    expect(miscCounterInput.element.value).toBe(
      propsData.miscQuantity.toString()
    );
  });

  it("calls `updateMiscCount` action when on input misc counter", async () => {
    createComponent({ propsData, store });
    const quantity = 2;
    const miscCounter = wrapper.find(`[data-test="misc-counter"]`);
    await miscCounter.vm.$emit("input", quantity);
    expect(actions.Cart.updateMiscCount).toHaveBeenCalledWith(
      expect.any(Object),
      { miscId: propsData.miscItem.id, quantity }
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
