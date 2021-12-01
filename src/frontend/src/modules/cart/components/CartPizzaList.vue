<template>
  <ul class="cart-list sheet">
    <li
      v-for="pizza in pizzas"
      :key="pizza.id"
      class="cart-list__item"
      data-test="cart-product-item"
    >
      <AppProductDescription class="cart-list__product" :pizza="pizza" />

      <AppCounter
        class="cart-list__quantityer"
        :value="pizza.quantity"
        :min="0"
        plus-color-modifier-class="counter__button--orange"
        data-test="pizza-counter"
        @input="changeQuantity(pizza.id, $event)"
      />

      <div class="cart-list__price">
        <b>{{ totalPrice(pizza) }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          data-test="change-button"
          @click.prevent="editPizza(pizza.id)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";
import { mapActions } from "vuex";
import { PizzaCalculator } from "@/common/helpers.js";

export default {
  name: "CartPizzaList",

  components: {
    AppCounter,
  },

  props: {
    pizzas: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      pizzaCalculator: new PizzaCalculator(this.$store),
    };
  },

  methods: {
    ...mapActions("Cart", ["updatePizzaQuantity", "changePizza"]),

    changeQuantity(pizzaId, quantity) {
      this.updatePizzaQuantity({ pizzaId, quantity });
    },

    totalPrice(pizza) {
      return this.pizzaCalculator.getPrice(pizza) * pizza?.quantity ?? 0;
    },

    editPizza(pizzaId) {
      this.$router.push("/");
      this.changePizza(pizzaId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}
</style>
