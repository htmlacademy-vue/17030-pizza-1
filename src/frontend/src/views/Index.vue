<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough-value="pizza.doughValue"
            :dough-list="dough"
            @update-dough="updatedDough"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :size-value="pizza.sizeValue"
            :sizes-list="sizes"
            @update-size="updatedSize"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauce-value="pizza.sauceValue"
            :sauces-list="sauces"
            :fillings-list="fillings"
            :filling-counts="pizza.fillingCounts"
            @update-sauce="updatedSauce"
            @update-filling="updateFilling"
          />
        </div>

        <div class="content__pizza">
          <AppInput
            v-model="pizza.name"
            :is-visible-caption="false"
            name="pizza_name"
            placeholder="Введите название пиццы"
          >
            Название пиццы
          </AppInput>

          <div class="content__constructor">
            <BuilderPizzaView
              :pizza="pizza"
              :fillings-list="fillings"
              @drop-filling="dropFilling"
            />
          </div>

          <BuilderPriceCounter
            :pizza="pizza"
            :fillings-list="fillings"
            class="content__result"
            @add-to-cart="addingToCart"
          />
        </div>
      </div>
    </form>
    <router-view @login="$emit('login')" />
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import AppInput from "@/common/components/AppInput";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import {
  DOUGH_TYPES,
  FILLING_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants.js";
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeFilling,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers.js";

const createNewPizza = () => ({
  name: "",
  dough: null,
  doughValue: DOUGH_TYPES[0].value,
  size: null,
  sizeValue: SIZE_TYPES[0].value,
  sauce: null,
  sauceValue: SAUCE_TYPES[0].value,
  fillings: [],
  fillingCounts: pizza.ingredients.reduce((obj, { name }) => {
    const type = FILLING_TYPES.find(({ label }) => name === label)?.value;
    obj[type] = 0;

    return obj;
  }, {}),
  price: 0,
  count: 1,
});

export default {
  name: "IndexHome",

  components: {
    AppInput,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderPriceCounter,
  },

  data() {
    return {
      pizza: createNewPizza(),
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      sizes: pizza.sizes.map((size) => normalizeSize(size)),
      dough: pizza.dough.map((item) => normalizeDough(item)),
      fillings: pizza.ingredients.map((filling) => normalizeFilling(filling)),
    };
  },

  mounted() {
    this.updatePizzaComponents();
  },

  methods: {
    updatePizzaComponents() {
      this.updatedDough(this.pizza.doughValue);
      this.updatedSauce(this.pizza.sauceValue);
      this.updatedSize(this.pizza.sizeValue);
    },
    updatedDough(doughValue) {
      this.pizza.doughValue = doughValue;
      this.pizza.dough = this.dough.find(({ type }) => type === doughValue);
    },
    updatedSize(sizeValue) {
      this.pizza.sizeValue = sizeValue;
      this.pizza.size = this.sizes.find(({ type }) => type === sizeValue);
    },
    updatedSauce(sauceValue) {
      this.pizza.sauceValue = sauceValue;
      this.pizza.sauce = this.sauces.find(({ type }) => type === sauceValue);
    },
    updateFilling({ slug, value }) {
      this.pizza.fillingCounts[slug] = value;
      this.pizza.fillings = this.fillings.filter(
        ({ type }) => this.pizza.fillingCounts[type] !== 0
      );
    },
    dropFilling(filling) {
      this.pizza.fillingCounts[filling.type] += 1;
    },
    addingToCart(price) {
      this.pizza.price = price;
      this.$emit("add-to-cart", this.pizza);
      this.pizza = createNewPizza();
      this.updatePizzaComponents();
    },
  },
};
</script>

<style lang="scss" scoped>
.content__result {
  ::v-deep button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
