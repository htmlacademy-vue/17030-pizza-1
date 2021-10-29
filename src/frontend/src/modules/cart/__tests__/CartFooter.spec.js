import { createLocalVue, mount } from "@vue/test-utils";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import { generateMockStore } from "@/store/mocks";
import AppButton from "@/common/components/AppButton.vue";

const localVue = createLocalVue();
localVue.component("AppButton", AppButton);

describe("CartFooter", () => {
  let wrapper;
  let store;
  let actions;
  let mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        createNewPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("creates a new pizza on click want another button", async () => {
    createComponent({ localVue, store, mocks });
    const wantAnotherBtn = wrapper.find(`[data-test="want-another-button"]`);
    await wantAnotherBtn.trigger("click");
    expect(actions.Builder.createNewPizza).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});

/*
 *
 * Проверка
 *
 * this.$store.dispatch("Builder/createNewPizza");
 *
 */
