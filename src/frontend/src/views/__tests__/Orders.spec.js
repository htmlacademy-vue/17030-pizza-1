import { createLocalVue, mount } from "@vue/test-utils";
import Orders from "@/views/Orders.vue";
import { generateMockStore } from "@/store/mocks";
import { queryOrders } from "@/store/mocks/mocks-order.js";
import AppButton from "@/common/components/AppButton.vue";

const localVue = createLocalVue();
localVue.component("AppButton", AppButton);

describe("Orders", () => {
  let wrapper;
  let actions;
  let store;
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        query: jest.fn(),
      },
      Auth: {
        queryAddresses: jest.fn(),
      },
      Cart: {
        fetchMisc: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders order items", () => {
    queryOrders(store);
    createComponent({ localVue, store });
    const orderItems = wrapper.findAll(`[data-test="order-item-component"]`);
    expect(orderItems.wrappers.length).toBe(store.state.Orders.orders.length);
  });

  it("calls actions", () => {
    queryOrders(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
    expect(actions.Orders.query).toHaveBeenCalled();
    expect(actions.Auth.queryAddresses).toHaveBeenCalled();
    expect(actions.Cart.fetchMisc).toHaveBeenCalled();
  });
});

/*
 * Проверка
 *
 * <OrderItem v-for="order in orders" :key="order.id" :order="order" />
 *
 * ...mapState("Orders", ["orders"]),
 * this.$store.dispatch("Orders/query");
 * this.$store.dispatch("Auth/queryAddresses");
 * this.$store.dispatch("Cart/fetchMisc");
 *
 */
