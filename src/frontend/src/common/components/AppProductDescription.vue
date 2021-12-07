<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    >
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>{{ getSizeAndDoughText }}</li>
        <li>Соус: {{ getSauceText }}</li>
        <li>Начинка: {{ getIngredientsText }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import pizzaComponents from "@/common/enums/pizzaComponents";
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppProductDescription",

  props: {
    pizza: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    ...mapState("Builder", ["ingredients"]),
    ...mapGetters("Builder", ["getFullPizzaComponentById"]),

    getSizeAndDoughText() {
      const size = this.getFullPizzaComponentById(
        pizzaComponents.SIZES,
        this.pizza?.sizeId
      );

      const dough = this.getFullPizzaComponentById(
        pizzaComponents.DOUGH,
        this.pizza?.doughId
      );

      return `${size?.name}, ${dough?.nameAlt}`;
    },

    getSauceText() {
      const sauce = this.getFullPizzaComponentById(
        pizzaComponents.SAUCES,
        this.pizza?.sauceId
      );

      return sauce?.name.toLowerCase();
    },

    getIngredientsText() {
      const appliedIngredients = this.ingredients?.filter(({ id }) => {
        return (
          this.pizza?.ingredients.find(
            ({ ingredientId }) => ingredientId.toString() === id.toString()
          )?.quantity > 0
        );
      });

      return appliedIngredients
        ?.map(({ name }) => name.toLowerCase())
        .join(", ");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
