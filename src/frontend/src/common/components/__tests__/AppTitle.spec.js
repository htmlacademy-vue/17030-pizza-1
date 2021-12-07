import { shallowMount } from "@vue/test-utils";
import AppTitle from "@/common/components/AppTitle";

describe("AppTitle", () => {
  let wrapper;
  const propsData = {};
  const slots = { default: "app title" };
  const createComponent = (options) => {
    wrapper = shallowMount(AppTitle, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("renders h1 by default", () => {
    createComponent();
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("renders h2", () => {
    propsData.level = 2;
    createComponent({ propsData });
    expect(wrapper.find("h2").exists()).toBeTruthy();
  });

  it("add `title--big` class", () => {
    propsData.modTextBig = true;
    createComponent({ propsData });
    expect(wrapper.find(".title--big").exists()).toBeTruthy();
  });

  it("add `title--small` class", () => {
    propsData.modTextSmall = true;
    createComponent({ propsData });
    expect(wrapper.find(".title--small").exists()).toBeTruthy();
  });
});
