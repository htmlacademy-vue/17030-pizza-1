import { shallowMount } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput.vue";

describe("AppInput", () => {
  const bigLabelClass = "input--big-label";
  const visuallyHiddenClass = "visually-hidden";
  const slots = { default: "Input caption" };
  const propsData = {
    value: "testValue",
    name: "attr-name",
    type: "text",
    placeholder: "Test",
    errorText: "Error",
    readonly: false,
    required: true,
    isVisibleCaption: false,
    modBigLabel: true,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.find(`[data-test="input-caption"]`).html()).toContain(
      slots.default
    );
  });

  it("caption has `visually-hidden` class", () => {
    createComponent({ propsData, slots });
    const inputCaption = wrapper.find(`[data-test="input-caption"]`);
    expect(inputCaption.classes()).toContain(visuallyHiddenClass);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted("input")).toBeTruthy();
  });

  it("emits the current input value when typing", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("input");
    expect(wrapper.emitted("input")[0][0]).toEqual("test");
  });

  it("root element has `input--big-label` class", () => {
    createComponent({ propsData });
    expect(wrapper.classes()).toContain(bigLabelClass);
  });

  it("It sets the initial model value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("input type is prop type", () => {
    propsData.type = "number";
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("input readonly is prop readonly", () => {
    propsData.readonly = true;
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("readonly")).toBeTruthy();
  });

  it("input required is prop required", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("required")).toBeTruthy();
  });

  it("has error message", () => {
    createComponent({ propsData });
    const error = wrapper.find(`[data-test="error-text"]`);
    expect(error.exists()).toBeTruthy();
    expect(error.text()).toBe(propsData.errorText);
  });

  it("does not have error message", () => {
    propsData.errorText = "";
    createComponent({ propsData });
    const error = wrapper.find(`[data-test="error-text"]`);
    expect(error.exists()).toBeFalsy();
  });
});
