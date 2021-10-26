import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import { mount } from "@vue/test-utils";
import { createSizes, generateMockStore, mockSizes } from "@/store/mocks";

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
    createComponent({ store });
    expect(wrapper.exists).toBeTruthy();
  });

  it("creates size radio items", () => {
    createSizes(store);
    createComponent({ store });
    const sizeRadioItems = wrapper.findAll(`[data-test="size-radio-item"]`);
    expect(sizeRadioItems.wrappers.length).toBe(mockSizes.length);
  });

  it("calls set size item", async () => {
    createSizes(store);
    createComponent({ store });
    const secondRadioItem = wrapper.find(`[data-test="size-radio-item"]`);
    await secondRadioItem.vm.$emit("change", mockSizes[0].id);
    expect(actions.Builder.setSize).toHaveBeenCalledWith(
      expect.any(Object),
      mockSizes[0].id
    );
  });
});
