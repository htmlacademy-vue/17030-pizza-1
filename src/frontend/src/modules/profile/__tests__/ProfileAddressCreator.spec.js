import { createLocalVue, mount } from "@vue/test-utils";
import ProfileAddressCreator from "@/modules/profile/components/ProfileAddressCreator.vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import { mocksOrder } from "@/store/mocks/mocks-order.js";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);
localVue.component("AppButton", AppButton);

describe("ProfileAddressCreator", () => {
  let wrapper;
  let actions;
  let store;
  const propsData = {
    counter: 1,
    address: mocksOrder.orderAddress,
  };
  const mocks = {
    $store: {
      dispatch: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(ProfileAddressCreator, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        deleteAddress: jest.fn(),
        postAddress: jest.fn(),
        putAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls `deleteAddress` action when on click remove button", async () => {
    createComponent({ localVue, propsData, store });
    const removeBtn = wrapper.find(`[data-test="remove-button"]`);
    await removeBtn.trigger("click");
    expect(actions.Auth.deleteAddress).toHaveBeenLastCalledWith(
      expect.any(Object),
      { id: propsData.address.id, isNewAddress: false }
    );
  });

  it("validation mixin has been called on form submit", async () => {
    propsData.address = {};
    createComponent({ localVue, propsData, store });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(actions.Auth.postAddress).not.toHaveBeenCalled();
    expect(actions.Auth.putAddress).not.toHaveBeenCalled();
  });

  it("calls `postAddress` action when on form submit a new address", async () => {
    propsData.address = {};
    createComponent({ localVue, propsData, store });
    const addrNameInput = wrapper.find(`[data-test="addr-name"]`).find("input");
    const addrStreetInput = wrapper
      .find(`[data-test="addr-street"]`)
      .find("input");
    const addrHouseInput = wrapper
      .find(`[data-test="addr-house"]`)
      .find("input");
    const addrApartmentInput = wrapper
      .find(`[data-test="addr-apartment"]`)
      .find("input");
    addrNameInput.element.value = "name address";
    await addrNameInput.trigger("input");
    addrStreetInput.element.value = "street address";
    await addrStreetInput.trigger("input");
    addrHouseInput.element.value = "23";
    await addrHouseInput.trigger("input");
    addrApartmentInput.element.value = "12";
    await addrApartmentInput.trigger("input");
    await wrapper.trigger("submit");
    expect(actions.Auth.postAddress).toHaveBeenCalled();
  });

  it("calls `putAddress` action when on form submit an edited address", async () => {
    createComponent({ localVue, propsData, store });
    await wrapper.trigger("submit");
    expect(actions.Auth.putAddress).toHaveBeenCalled();
  });
});

/*
 * Проверка
 *
 * @submit.prevent="save"
 * ...mapActions("Auth", ["postAddress", "putAddress", "deleteAddress"]),
 *
 */
