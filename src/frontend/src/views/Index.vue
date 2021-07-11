<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough-list="dough"
            @choose-dough="preferredDough = $event"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes-list="sizes"
            @choose-size="preferredSize = $event"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauces-list="sauces"
            :fillings-list="fillings"
            @choose-sauce="preferredSauce = $event"
          />
        </div>

        <div class="content__pizza">
          <AppInput
            v-model="preferredName"
            :is-visible-caption="false"
            name="pizza_name"
            placeholder="Введите название пиццы"
          >
            Название пиццы
          </AppInput>

          <div class="content__constructor">
            <BuilderPizzaView
              v-bind="preferredPizza"
              @drop-filling="droppedFilling"
            />
          </div>

          <BuilderPriceCounter
            v-bind="preferredPizza"
            class="content__result"
            @add-to-cart="addingToCart"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import AppInput from "@/common/components/AppInput";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

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
      dough: pizza.dough.map((item) => normalizeDough(item)),
      sizes: pizza.sizes.map((size) => normalizeSize(size)),
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      fillings: pizza.ingredients.map((ingredient) =>
        normalizeIngredient(ingredient)
      ),
      preferredName: "",
      preferredDough: null,
      preferredSize: null,
      preferredSauce: null,
    };
  },

  computed: {
    preferredFillings() {
      return this.fillings.filter((f) => {
        return f.count !== 0;
      });
    },

    preferredPizza() {
      return {
        preferredName: this.preferredName,
        preferredDough: this.preferredDough,
        preferredSize: this.preferredSize,
        preferredSauce: this.preferredSauce,
        preferredFillings: this.preferredFillings,
      };
    },
  },

  methods: {
    droppedFilling(filling) {
      const targetFilling = this.fillings.find(
        ({ type }) => type === filling.type
      );
      targetFilling.count = targetFilling.count + 1;
    },
    addingToCart(price) {
      this.$emit("add-to-cart", price);
    },
  },
};
</script>

<style lang="scss" scoped></style>
