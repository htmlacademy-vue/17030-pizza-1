import { shallowMount } from "@vue/test-utils";
import AppLayoutMain from "@/layouts/AppLayoutMain.vue";
import AppNotifications from "@/common/components/AppNotifications.vue";

const stubs = {
  AppNotifications,
};

const mocks = {
  $store: {
    state: {
      notifications: [],
    },
  },
};

const slots = {
  default: "test content",
};

describe("AppLayoutMain", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutMain, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    createComponent({ stubs, mocks, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
