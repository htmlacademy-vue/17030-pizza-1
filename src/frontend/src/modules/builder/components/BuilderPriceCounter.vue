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
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "BuilderPriceCounter",

  components: {
    AppButton,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
    fillingsList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    priceOfDough() {
      return this.pizza.dough?.price ?? 0;
    },
    priceOfSauce() {
      return this.pizza.sauce?.price ?? 0;
    },
    priceOfFillings() {
      return this.fillingsList.reduce((acc, { price, type }) => {
        return acc + price * this.pizza.fillingCounts[type];
      }, 0);
    },
    size() {
      return this.pizza.size?.multiplier ?? 0;
    },
    price() {
      return (
        (this.priceOfDough + this.priceOfSauce + this.priceOfFillings) *
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
        this.priceOfFillings &&
        this.size &&
        this.hasPizzaName
      );
    },
  },

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.price);
    },
  },
};
</script>

<style lang="scss" scoped></style>
