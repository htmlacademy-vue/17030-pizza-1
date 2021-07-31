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
          <li>Начинка: {{ fillingText }}</li>
        </ul>
      </div>
    </div>

    <AppCounter
      class="cart-list__counter"
      :value="product.count"
      :min="0"
      plus-color-modifier-class="counter__button--orange"
      @input="$emit('update-product-count', $event)"
    />

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click.prevent="$emit('edit-product')"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";

export default {
  name: "CartItem",

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
    totalPrice() {
      return this.product.price * this.product.count;
    },
    sizeAndDoughText() {
      return `${this.product.size.name}, ${this.product.dough.nameAlt}`;
    },
    sauceText() {
      return this.product.sauce.name.toLowerCase();
    },
    fillingText() {
      return this.product.fillings
        .map(({ name }) => name.toLowerCase())
        .join(", ");
    },
  },
};
</script>

<style scoped></style>
