<template>
  <div>
    <p>Итого: {{ price }} ₽</p>

    <AppButton
      :class="{ 'button--disabled': canNotOrder }"
      :disabled="canNotOrder"
      @click.prevent="addToCart"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapState("Builder", ["pizza", "ingredients"]),
    priceOfDough() {
      return this.pizza?.dough?.price ?? 0;
    },
    priceOfSauce() {
      return this.pizza?.sauce?.price ?? 0;
    },
    priceOfIngredients() {
      return this.ingredients?.reduce((acc, { price, type }) => {
        return acc + price * this.pizza?.ingredientCounts[type];
      }, 0);
    },
    size() {
      return this.pizza?.size?.multiplier ?? 0;
    },
    price() {
      return (
        (this.priceOfDough + this.priceOfSauce + this.priceOfIngredients) *
        this.size
      );
    },
    hasPizzaName() {
      return !!this.pizza.name.length;
    },
    canNotOrder() {
      return !(
        this.priceOfDough &&
        this.priceOfSauce &&
        this.priceOfIngredients &&
        this.size &&
        this.hasPizzaName
      );
    },
  },

  methods: {
    ...mapActions("Builder", ["setPrice", "createNewPizza"]),
    addToCart() {
      this.setPrice(this.price);
      this.$store.dispatch("addPizzaToCart");
      this.createNewPizza();
    },
  },
};
</script>

<style lang="scss" scoped></style>
