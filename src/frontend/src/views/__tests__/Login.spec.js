import { createLocalVue, mount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);
localVue.component("AppButton", AppButton);

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $store: {
    dispatch: jest.fn(),
  },
};

describe("Login", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    mocks.$router.push = jest.fn();
    mocks.$store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("redirects to index on close button click", async () => {
    createComponent({ localVue, mocks });
    const closeBtn = wrapper.find(`[data-test="close-button"]`);
    await closeBtn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("validation mixin has been called on form submit", async () => {
    createComponent({ localVue, mocks });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find("form").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(mocks.$store.dispatch).not.toHaveBeenCalled();
  });

  it("calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, mocks });
    const emailInput = wrapper
      .find(`[data-test="email-component"]`)
      .find("input");
    const passInput = wrapper
      .find(`[data-test="password-component"]`)
      .find("input");

    emailInput.element.value = "user@example.com";
    await emailInput.trigger("input");
    passInput.element.value = "user@example.com";
    await passInput.trigger("input");

    await wrapper.find("form").trigger("submit");
    expect(mocks.$store.dispatch).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});

/*
 * Протестировать
 *
 * <a href="#" class="close close--white" @click.prevent="$router.push('/')">
 * @submit.prevent="sendForm"
 * await this.$store.dispatch("Auth/login", {
 * await this.$router.push("/");
 *
 */
