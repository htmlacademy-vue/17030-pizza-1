import { shallowMount } from "@vue/test-utils";
import AppIcon from "@/common/components/AppIcon.vue";

describe("AppIcon", () => {
  const listeners = {
    click: null,
  };
  const slots = { default: "Slot test" };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppIcon, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.find("button").html()).toContain(slots.default);
  });

  it("raises the click event on click", async () => {
    createComponent({ listeners });
    await wrapper.find("button").trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });
});
