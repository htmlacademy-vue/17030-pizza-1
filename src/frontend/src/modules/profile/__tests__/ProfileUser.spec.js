import { mount } from "@vue/test-utils";
import ProfileUser from "@/modules/profile/components/ProfileUser.vue";
import { authenticateUser, generateMockStore } from "@/store/mocks";
import user from "@/static/user.json";

describe("ProfileUser", () => {
  let wrapper;
  let store;
  const propsData = {
    user: user,
  };
  const createComponent = (options) => {
    wrapper = mount(ProfileUser, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    authenticateUser(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("sets user attribute for avatar to image", () => {
    createComponent({ store, propsData });
    const imageAvatar = wrapper.find("img");
    expect(imageAvatar.element.src).toContain(propsData.user.avatar);
  });

  it("renders name ", () => {
    createComponent({ store, propsData });
    expect(wrapper.html()).toContain(propsData.user.name);
  });

  it("renders phone number", () => {
    createComponent({ store, propsData });
    expect(wrapper.html()).toContain(propsData.user.phone);
  });
});
