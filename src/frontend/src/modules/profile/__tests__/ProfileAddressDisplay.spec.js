import { createLocalVue, shallowMount } from "@vue/test-utils";
import ProfileAddressDisplay from "@/modules/profile/components/ProfileAddressDisplay.vue";
import { mocksOrder } from "@/store/mocks/mocks-order.js";
import AppIcon from "@/common/components/AppIcon.vue";

const localVue = createLocalVue();
localVue.component("AppIcon", AppIcon);

describe("ProfileAddressDisplay", () => {
  let wrapper;
  const propsData = {
    counter: 1,
    address: mocksOrder.orderAddress,
  };
  const createComponent = (options) => {
    wrapper = shallowMount(ProfileAddressDisplay, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is output address name", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.html()).toContain(propsData.address.name);
  });

  it("emit editing custom event when on click change address button", async () => {
    createComponent({ localVue, propsData });
    const changeAddrBtn = wrapper.find(`[data-test="change-address-button"]`);
    await changeAddrBtn.vm.$emit("click");
    expect(wrapper.emitted("editing")).toBeTruthy();
  });
});
