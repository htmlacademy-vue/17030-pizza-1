import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout.vue";
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
  $route: {
    meta: {
      layout: "",
    },
  },
};

describe("AppLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({ stubs, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
