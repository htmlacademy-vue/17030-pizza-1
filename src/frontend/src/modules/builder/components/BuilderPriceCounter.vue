<template>
  <div>
    <p>Итого: {{ this.pizzaCalculator.getPrice(this.pizza) }} ₽</p>

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
import { mapActions, mapGetters, mapState } from "vuex";
import { PizzaCalculator } from "@/common/helpers.js";

export default {
  name: "BuilderPriceCounter",

  data() {
    return {
      pizzaCalculator: new PizzaCalculator(this.$store),
    };
  },

  computed: {
    ...mapState("Builder", ["pizza", "ingredients"]),
    ...mapGetters("Builder", ["getFullPizzaComponentById"]),

    hasPizzaName() {
      return !!this.pizza?.name.trim();
    },

    canNotOrder() {
      return !(
        this.pizzaCalculator.getPriceOfIngredients(this.pizza) &&
        this.pizzaCalculator.getPrice(this.pizza) &&
        this.hasPizzaName
      );
    },
  },

  methods: {
    ...mapActions("Builder", ["createNewPizza"]),
    ...mapActions("Cart", ["updatePizzaPrices"]),

    addToCart() {
      this.updatePizzaPrices(
        this.pizzaCalculator.getPriceOfIngredients(this.pizza)
      );
      this.$store.dispatch("addPizzaToCart");
      this.createNewPizza();
    },
  },
};
</script>

<style lang="scss" scoped></style>
