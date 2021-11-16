import { createLocalVue, mount } from "@vue/test-utils";
import ProfileAddress from "@/modules/profile/components/ProfileAddress.vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import { mocksOrder } from "@/store/mocks/mocks-order.js";
import AppIcon from "@/common/components/AppIcon.vue";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);
localVue.component("AppButton", AppButton);
localVue.component("AppIcon", AppIcon);

describe("ProfileAddress", () => {
  let wrapper;
  let store;
  const propsData = {
    counter: 1,
    address: mocksOrder.orderAddress,
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls method edit and save", async () => {
    createComponent({ localVue, propsData, store });
    const changeAddrBtn = wrapper.find(`[data-test="change-address-button"]`);
    await changeAddrBtn.trigger("click");
    const saveBtn = wrapper.find(`[data-test="save-button"]`);
    expect(saveBtn.exists()).toBeTruthy();
    expect(changeAddrBtn.exists()).toBeFalsy();
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");
    expect(saveBtn.exists()).toBeFalsy();
    expect(changeAddrBtn.exists).toBeTruthy();
  });
});
