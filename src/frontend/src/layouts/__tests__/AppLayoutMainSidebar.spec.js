import { shallowMount } from "@vue/test-utils";
import AppLayoutMainSidebar from "@/layouts/AppLayoutMainSidebar.vue";

const stubs = ["router-link"];

describe("AppLayoutMainSidebar", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutMainSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});
