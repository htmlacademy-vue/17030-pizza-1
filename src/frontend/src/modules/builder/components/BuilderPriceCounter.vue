<template>
  <div>
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': canNotOrder }"
      :disabled="canNotOrder"
      @click.prevent="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    preferredName: {
      type: String,
      required: true,
    },
    preferredDough: {
      type: Object,
      default() {
        return {};
      },
    },
    preferredSize: {
      type: Object,
      default() {
        return {};
      },
    },
    preferredSauce: {
      type: Object,
      default() {
        return {};
      },
    },
    preferredFillings: {
      type: Array,
      default() {
        return [];
      },
    },
    preferredFillingCounts: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    priceOfDough() {
      return this.preferredDough?.price ?? 0;
    },
    priceOfSauce() {
      return this.preferredSauce?.price ?? 0;
    },
    priceOfFillings() {
      return this.preferredFillings.reduce((acc, { price, type }) => {
        return acc + price * this.preferredFillingCounts[type];
      }, 0);
    },
    size() {
      return this.preferredSize?.multiplier ?? 0;
    },
    price() {
      return (
        (this.priceOfDough + this.priceOfSauce + this.priceOfFillings) *
        this.size
      );
    },
    canNotOrder() {
      return !(
        this.priceOfDough &&
        this.priceOfSauce &&
        this.priceOfFillings &&
        this.size &&
        this.preferredName.length
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
