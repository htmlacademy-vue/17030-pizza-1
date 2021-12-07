import { createLocalVue, mount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types.js";
import { generateMockStore } from "@/store/mocks";
import AppTitle from "@/common/components/AppTitle";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppTitle", AppTitle);

const dough = [
  {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
    type: "light",
    nameAlt: "на тонком тесте",
  },
  {
    id: 2,
    name: "Толстое",
    image: "/public/img/dough-large.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
    type: "large",
    nameAlt: "на толстом тесте",
  },
];

const createDough = (store) => {
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "dough", value: dough },
    { root: true }
  );
};

const creteBuilderPizza = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "pizza",
      value: { id: "54", doughId: dough[0].id },
    },
    { root: true }
  );
};

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setDough: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createDough(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("sets dough", async () => {
    creteBuilderPizza(store);
    createDough(store);
    createComponent({ localVue, store });
    const doughRadio = wrapper.find(`[data-test="dough-radio"]`);
    await doughRadio.vm.$emit("change", dough[0].id);
    expect(actions.Builder.setDough).toHaveBeenCalledWith(
      expect.any(Object),
      dough[0].id
    );
  });
});

/*
 * Протестировать
 *
 * ...mapState("Builder", {
 *   doughList: "dough",
 * }),
 *
 * return this.$store.state.Builder.pizza?.doughId;
 * this.$store.dispatch("Builder/setDough", val);
 *
 */
