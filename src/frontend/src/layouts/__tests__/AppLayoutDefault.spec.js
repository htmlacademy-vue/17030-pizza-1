import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";

const stubs = {
  AppNotifications: {
    template: "<div>App Notification</div>",
  },
};

const slots = {
  default: "test content",
};

describe("AppLayoutDefault", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    createComponent({ stubs, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
