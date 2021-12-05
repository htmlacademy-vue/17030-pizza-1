import { createLocalVue, mount } from "@vue/test-utils";
import Profile from "@/views/Profile.vue";
import { generateMockStore } from "@/store/mocks";
import AppButton from "@/common/components/AppButton.vue";
import AppIcon from "@/common/components/AppIcon.vue";
import AppTitle from "@/common/components/AppTitle";
import {
  authenticateUser,
  createAddresses,
  mocksAddresses,
} from "@/store/mocks/mocks-auth.js";

const localVue = createLocalVue();
localVue.component("AppButton", AppButton);
localVue.component("AppIcon", AppIcon);
localVue.component("AppTitle", AppTitle);

describe("Profile", () => {
  let wrapper;
  let actions;
  let store;
  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        queryAddresses: jest.fn(),
        createNewAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    authenticateUser(store);
    createAddresses(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders profile user", () => {
    authenticateUser(store);
    createComponent({ localVue, store });
    const profileUser = wrapper.find(`[data-test="profile-user-component"]`);
    expect(profileUser.exists()).toBeTruthy();
  });

  it("renders addresses", () => {
    createAddresses(store);
    createComponent({ localVue, store });
    const profileAddresses = wrapper.findAll(
      `[data-test="profile-address-component"]`
    );
    expect(profileAddresses.wrappers.length).toEqual(mocksAddresses.length);
  });

  it("calls queryAddresses action on created hook", () => {
    createComponent({ localVue, store });
    expect(actions.Auth.queryAddresses).toHaveBeenCalled();
  });

  it("calls create new address action", async () => {
    createAddresses(store);
    createComponent({ localVue, store });
    const createNewAddressBtn = wrapper.find(
      `[data-test="create-new-address-button"]`
    );
    await createNewAddressBtn.trigger("click");
    expect(actions.Auth.createNewAddress).toHaveBeenCalled();
  });
});

/*
 * Проверка
 *
 * <ProfileUser v-if="user" :user="user" data-test="profile-user-component" />
 * v-for="(address, index) in addresses"
 * @click.prevent="createNewAddress"
 *
 * ...mapState("Auth", ["user"]),
 * ...mapState("Auth", ["addresses"]),
 * ...mapActions("Auth", ["queryAddresses", "createNewAddress"]),
 *
 */
