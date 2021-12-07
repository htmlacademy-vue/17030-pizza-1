import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { createSizes, mockSizes } from "@/store/mocks/mocks-builder.js";
import AppTitle from "@/common/components/AppTitle";

const localVue = createLocalVue();
localVue.component("AppTitle", AppTitle);

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setSize: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createSizes(store);
    createComponent({ store, localVue });
    expect(wrapper.exists).toBeTruthy();
  });

  it("creates size radio items", () => {
    createSizes(store);
    createComponent({ store, localVue });
    const sizeRadioItems = wrapper.findAll(`[data-test="size-radio-item"]`);
    expect(sizeRadioItems.wrappers.length).toBe(mockSizes.length);
  });

  it("calls set size item", async () => {
    createSizes(store);
    createComponent({ store, localVue });
    const secondRadioItem = wrapper.find(`[data-test="size-radio-item"]`);
    await secondRadioItem.vm.$emit("change", mockSizes[0].id);
    expect(actions.Builder.setSize).toHaveBeenCalledWith(
      expect.any(Object),
      mockSizes[0].id
    );
  });
});
