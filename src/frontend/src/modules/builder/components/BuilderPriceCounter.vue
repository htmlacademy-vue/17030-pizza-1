<template>
  <div>
    <p>Итого: {{ $priceForOnePizza(pizza) }} ₽</p>

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
import { priceForOnePizza } from "@/mixins";

export default {
  name: "BuilderPriceCounter",
  mixins: [priceForOnePizza],

  computed: {
    ...mapState("Builder", ["pizza", "ingredients"]),
    ...mapGetters("Builder", ["getFullPizzaComponentById"]),

    hasPizzaName() {
      return !!this.pizza?.name.trim();
    },

    canNotOrder() {
      return !(
        this.$priceOfIngredients(this.pizza) &&
        this.$priceForOnePizza(this.pizza) &&
        this.hasPizzaName
      );
    },
  },

  methods: {
    ...mapActions("Builder", ["createNewPizza"]),
    ...mapActions("Cart", ["updatePizzaPrices"]),

    addToCart() {
      this.updatePizzaPrices(this.$priceForOnePizza(this.pizza));
      this.$store.dispatch("addPizzaToCart");
      this.createNewPizza();
    },
  },
};
</script>

<style lang="scss" scoped></style>
