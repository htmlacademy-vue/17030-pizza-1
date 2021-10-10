import { shallowMount } from "@vue/test-utils";
import AppRadio from "@/common/components/AppRadio.vue";

describe("AppRadio", () => {
  const slots = {
    default: "Default slot",
  };
  const propsData = {
    checked: "Equals value",
    value: "Equals value",
    name: "test-name",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppRadio, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out default slot content", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("emits a change event", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    await input.trigger("change");
    expect(wrapper.emitted("change")).toBeTruthy();
  });

  it("emits the current input value when invoke change event", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    await input.trigger("change");
    expect(wrapper.emitted("change")[0][0]).toBe(propsData.value);
  });

  it("is checked", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.element.checked).toBeTruthy();
  });

  it("is not checked", () => {
    propsData.value = "Another value";
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.element.checked).toBeFalsy();
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("name")).toEqual(propsData.name);
  });
});
