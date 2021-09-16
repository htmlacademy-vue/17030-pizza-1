<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ getSizeAndDoughText }}</li>
          <li>Соус: {{ getSauceText }}</li>
          <li>Начинка: {{ getIngredientsText }}</li>
        </ul>
      </div>
    </div>

    <AppCounter
      class="cart-list__quantityer"
      :value="pizza.quantity"
      :min="0"
      plus-color-modifier-class="quantityer__button--orange"
      @input="changeQuantity(pizza.id, $event)"
    />

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click.prevent="editPizza(pizza.id)"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import pizzaComponents from "@/common/enums/pizzaComponents.js";
import { PizzaCalculator } from "@/common/helpers.js";

export default {
  name: "CartProductItem",

  components: {
    AppCounter,
  },

  props: {
    pizza: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      pizzaCalculator: new PizzaCalculator(this.$store),
    };
  },

  computed: {
    ...mapState("Builder", ["ingredients"]),
    ...mapGetters("Builder", ["getFullPizzaComponentById"]),

    totalPrice() {
      return this.pizzaCalculator.getPrice(this.pizza) * this.pizza.quantity;
    },

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
          this.pizza.ingredients.find(
            ({ ingredientId }) => ingredientId.toString() === id.toString()
          )?.quantity > 0
        );
      });

      return appliedIngredients
        .map(({ name }) => name.toLowerCase())
        .join(", ");
    },
  },

  methods: {
    ...mapActions("Cart", ["updatePizzaQuantity", "changePizza"]),

    changeQuantity(pizzaId, quantity) {
      this.updatePizzaQuantity({ pizzaId, quantity });
    },

    editPizza(pizzaId) {
      this.$router.push("/");
      this.changePizza(pizzaId);
    },
  },
};
</script>

<style scoped></style>
