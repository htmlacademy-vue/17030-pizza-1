import { createLocalVue, mount } from "@vue/test-utils";
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { authenticateUser } from "@/store/mocks/mocks-auth.js";

const localVue = createLocalVue();
localVue.use(Vuex);

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $notifier: {
    success: jest.fn(),
  },
};

const stubs = ["router-link"];

describe("AppLayoutHeader", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders login button", () => {
    createComponent({ localVue, store, stubs });
    const loginBtn = wrapper.find(`[data-test="login-btn"]`);
    expect(loginBtn.exists()).toBeTruthy();
  });

  it("doesn't render login button", () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const loginBtn = wrapper.find(`[data-test="login-btn"]`);
    expect(loginBtn.exists()).toBeFalsy();
  });

  it("calls logout in logout button click", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs, mocks });
    const logoutBtn = wrapper.find(`[data-test="logout-btn"]`);
    await logoutBtn.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("login");
  });
});

/*
 * Протестировать
 *
 * <template v-if="isAuthenticated">
 * <router-link v-else class="header__login" to="login">
 * <a href="#" class="header__logout" @click.prevent="logout">
 * ...mapState("Auth", ["isAuthenticated"]),
 * ...mapGetters("Cart", ["totalPrice"]),
 * ...mapGetters("Auth", ["getUserAttribute"]),
 * await this.$store.dispatch("Auth/logout");
 * await this.$router.push("login");
 *
 */
