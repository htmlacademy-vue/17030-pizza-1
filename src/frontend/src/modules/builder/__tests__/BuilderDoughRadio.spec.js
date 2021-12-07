import { shallowMount } from "@vue/test-utils";
import BuilderDoughRadio from "@/modules/builder/components/BuilderDoughRadio.vue";

describe("BuilderDoughRadio", () => {
  const slots = {
    default: "Default slot content",
  };
  let propsData;

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BuilderDoughRadio, options);
  };

  beforeEach(() => {
    propsData = {
      checked: "Equal value",
      value: "Equal value",
      name: "test-name",
    };
  });

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

  it("emits the current value when invoke a change event", async () => {
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
});
