import { shallowMount } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput.vue";

describe("AppInput", () => {
  const slots = { default: "Input caption" };
  const propsData = {
    value: "test message",
    name: "attr-name",
    type: "number",
    placeholder: "text placeholder",
    errorText: "error test",
    readonly: true,
    required: true,
    isVisibleCaption: false,
    modBigLabel: true,
  };
  const listeners = { input: null };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  beforeEach(() => {
    listeners.input = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.find(`[data-test="input-caption"]`).html()).toContain(
      slots.default
    );
  });

  it("sets caption `visually-hidden` class", () => {
    createComponent({ propsData, slots });
    const inputCaption = wrapper.find(`[data-test="input-caption"]`);
    expect(inputCaption.classes()).toContain("visually-hidden");
  });

  it("emit input", async () => {
    createComponent({ propsData, listeners });
    const payload = "emit payload";
    wrapper.vm.$emit("input");
    wrapper.vm.$emit("input", payload);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input").length).toBe(2);
    expect(wrapper.emitted("input")[1]).toEqual([payload]);
  });

  it("sets root element `input--big-label` class", () => {
    createComponent({ propsData });
    expect(wrapper.classes()).toContain("input--big-label");
  });

  it("displays value", () => {
    createComponent({ propsData });
    expect(wrapper.vm.value).toEqual(propsData.value);
  });

  it("displays correct value of the name attr", () => {
    createComponent({ propsData });
    expect(wrapper.vm.name).toEqual(propsData.name);
  });

  it("displays correct value of the type attr", () => {
    createComponent({ propsData });
    expect(wrapper.vm.type).toEqual(propsData.type);
  });

  it("displays correct value of the placeholder attr", () => {
    createComponent({ propsData });
    expect(wrapper.vm.placeholder).toEqual(propsData.placeholder);
  });

  it("sets readonly attr", () => {
    createComponent({ propsData });
    expect(wrapper.vm.readonly).toEqual(propsData.readonly);
    expect(wrapper.vm.readonly).toBeTruthy();
  });

  it("sets required attr", () => {
    createComponent({ propsData });
    expect(wrapper.vm.required).toEqual(propsData.required);
    expect(wrapper.vm.readonly).toBeTruthy();
  });

  it("displays error", () => {
    createComponent({ propsData });
    const error = wrapper.find(`[data-test="error-text"]`);
    expect(error.exists()).toBeTruthy();
    expect(error.text()).toBe(propsData.errorText);
  });
});
