<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="product.name"
      />
      <div class="product__text">
        <h2>{{ product.name }}</h2>
        <ul>
          <li>{{ sizeAndDoughText }}</li>
          <li>Соус: {{ sauceText }}</li>
          <li>Начинка: {{ ingredientsText }}</li>
        </ul>
      </div>
    </div>

    <AppCounter
      class="cart-list__quantityer"
      :value="product.quantity"
      :min="0"
      plus-color-modifier-class="quantityer__button--orange"
      @input="changeQuantity(product.id, $event)"
    />

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click.prevent="editPizza(product.id)"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "CartProductItem",

  components: {
    AppCounter,
  },

  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    ...mapState("Builder", ["ingredients"]),
    totalPrice() {
      return this.product.price * this.product.quantity;
    },
    sizeAndDoughText() {
      return `${this.product.size.name}, ${this.product.dough.nameAlt}`;
    },
    sauceText() {
      return this.product.sauce.name.toLowerCase();
    },
    ingredientsText() {
      const filteredIngredients = this.ingredients.filter(({ type }) => {
        return this.product.ingredientCounts[type] > 0;
      });

      return filteredIngredients
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
