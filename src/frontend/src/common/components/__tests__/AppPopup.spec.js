import { shallowMount } from "@vue/test-utils";
import AppPopup from "@/common/components/AppPopup.vue";
import AppButton from "@/common/components/AppButton.vue";
import AppClose from "@/common/components/AppClose";
import AppTitle from "@/common/components/AppTitle";

const transitionStub = () => ({
  render: function () {
    return this.$options._renderChildren;
  },
});

describe("AppPopup", () => {
  const stubs = {
    transition: transitionStub(),
    AppButton,
    AppClose,
    AppTitle,
  };
  const slots = {
    default: "Slot content",
    title: "Slot title",
    action: "Slot action",
  };
  let propsData;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppPopup, options);
  };

  beforeEach(() => {
    propsData = {
      visible: true,
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slots", () => {
    createComponent({ slots, stubs, propsData });
    expect(wrapper.html()).toContain(slots.default);
    expect(wrapper.html()).toContain(slots.title);
    expect(wrapper.html()).toContain(slots.action);
  });

  it("closes by click close button", async () => {
    createComponent({ stubs, propsData });
    const closeBtn = wrapper.find(`[data-test="close-btn"]`);
    await closeBtn.trigger("click");
    expect(wrapper.vm.localVisible).toBeFalsy();
  });
});
