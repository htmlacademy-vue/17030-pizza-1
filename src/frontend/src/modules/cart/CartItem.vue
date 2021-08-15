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
          <li>{{ sizeAndDoughText }}</li>
          <li>Соус: {{ sauceText }}</li>
          <li>Начинка: {{ fillingText }}</li>
        </ul>
      </div>
    </div>

    <AppCounter
      class="cart-list__counter"
      :value="pizza.count"
      :min="0"
      plus-color-modifier-class="counter__button--orange"
      @input="changePizzaCount(pizza.id, $event)"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CartItem",

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

  computed: {
    ...mapGetters("Builder", ["fillings"]),
    totalPrice() {
      return this.pizza.price * this.pizza.count;
    },
    sizeAndDoughText() {
      return `${this.pizza.size.name}, ${this.pizza.dough.nameAlt}`;
    },
    sauceText() {
      return this.pizza.sauce.name.toLowerCase();
    },
    fillingText() {
      const filteredFillings = this.fillings.filter(({ type }) => {
        return this.pizza.fillingCounts[type] > 0;
      });

      return filteredFillings.map(({ name }) => name.toLowerCase()).join(", ");
    },
  },

  methods: {
    ...mapActions("Cart", ["updatePizzaCount", "changePizza"]),
    changePizzaCount(pizzaId, count) {
      this.updatePizzaCount({ pizzaId, count });
    },
    editPizza(pizzaId) {
      this.$router.push("/");
      this.changePizza(pizzaId);
    },
  },
};
</script>

<style scoped></style>
