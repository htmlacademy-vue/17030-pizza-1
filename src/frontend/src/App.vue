<template>
  <div id="app">
    <AppLayout :user="user" :is-logged="isLogged" @logout="isLogged = false">
      <router-view @login="isLogged = true" />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import user from "@/static/user.json";
import { mapActions } from "vuex";

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
    productsPrice() {
      return this.cartProducts.reduce((sum, product) => {
        sum += product.count * product.price;
        return sum;
      }, 0);
    },
  },

  created() {
    this.fetchPizzaOptions();
    this.createNewPizza();
  },

  methods: {
    ...mapActions("Builder", ["fetchPizzaOptions", "createNewPizza"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
