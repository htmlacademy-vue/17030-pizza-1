<template>
  <div class="app-layout">
    <AppLayoutHeader :cart-price="cartPrice" />
    <IndexHome @add-to-cart="addingToCart" />
  </div>
</template>

<script>
import IndexHome from "@/views/Index";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayout",
  components: {
    IndexHome,
    AppLayoutHeader,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  methods: {
    addingToCart(price) {
      this.cartPrice = price;
    },
  },
};
</script>

<style lang="scss" scoped></style>
