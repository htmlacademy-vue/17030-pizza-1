import { shallowMount } from "@vue/test-utils";
import AppCounter from "@/common/components/AppCounter.vue";

describe("AppCounter", () => {
  const propsData = {
    min: 5,
    value: 7,
    max: 10,
    plusColorModifierClass: "test-class",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is Vue instance", () => {
    createComponent({ propsData });
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("It emits an input event when click by button minus", async () => {
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button-minus"]`);
    await btnMinus.trigger("click");
    expect(wrapper.emitted("input")).toBeTruthy();
  });

  it("emits the input value when click by button minus", async () => {
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button-minus"]`);
    await btnMinus.trigger("click");
    expect(wrapper.emitted("input")[0][0]).toEqual(propsData.value - 1);
  });

  it("It emits an input event when click by button plus", async () => {
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button-plus"]`);
    await btnPlus.trigger("click");
    expect(wrapper.emitted("input")).toBeTruthy();
  });

  it("emits the input value when click by button plus", async () => {
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button-plus"]`);
    await btnPlus.trigger("click");
    expect(wrapper.emitted("input")[0][0]).toEqual(propsData.value + 1);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = 8;
    await input.trigger("input");
    expect(wrapper.emitted("input")[0][0]).toEqual(8);
  });

  it("emits edges values of the range", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = propsData.min - 10;
    await input.trigger("input");
    input.element.value = propsData.max + 10;
    await input.trigger("input");
    expect(wrapper.emitted("input")[0][0]).toEqual(propsData.min);
    expect(wrapper.emitted("input")[1][0]).toEqual(propsData.max);
  });

  it("disables minus button, if value <= min", async () => {
    propsData.value = propsData.min;
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button-minus"]`);
    expect(btnMinus.attributes("disabled")).toBeTruthy();
  });

  it("disables plus button, if value >= max", () => {
    propsData.value = propsData.max;
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button-plus"]`);
    expect(btnPlus.attributes("disabled")).toBeTruthy();
  });

  it("adds color modifier class for plus button", () => {
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button-plus"]`);
    expect(btnPlus.classes()).toContain(propsData.plusColorModifierClass);
  });
});
