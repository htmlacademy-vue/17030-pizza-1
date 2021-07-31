<template>
  <div id="app">
    <AppLayout
      :cart-price="cartPrice"
      :user="user"
      :is-logged="isLogged"
      @logout="isLogged = false"
    >
      <router-view @add-to-cart="addingToCart" @login="isLogged = true" />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import user from "@/static/user.json";
import { cloneDeep } from "lodash";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  data() {
    return {
      user,
      isLogged: false,
      cartProducts: [],
    };
  },

  computed: {
    cartPrice() {
      return this.productsPrice;
    },
    productsPrice() {
      return this.cartProducts.reduce((sum, product) => {
        sum += product.count * product.price;
        return sum;
      }, 0);
    },
  },

  methods: {
    addingToCart(pizza) {
      this.cartProducts.push(cloneDeep(pizza));
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
