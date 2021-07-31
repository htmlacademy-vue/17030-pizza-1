<template>
  <ul class="cart-list sheet">
    <CartItem
      v-for="product in cartProducts"
      :key="product.name"
      :product="product"
      @update-product-count="
        $emit('update-product-count', {
          productName: product.name,
          value: $event,
        })
      "
      @edit-product="$emit('edit-product', product.name)"
    />
  </ul>
</template>

<script>
import CartItem from "@/modules/cart/componentns/CartItem";

export default {
  name: "CartItemsList",

  components: {
    CartItem,
  },

  props: {
    cartProducts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
