<template>
  <div class="app-layout">
    <header class="header">
      <div class="header__logo">
        <a href="" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="">{{ cartPrice }} ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <IndexHome @add-to-cart="addingToCart" />
  </div>
</template>

<script>
import IndexHome from "@/views/Index";

export default {
  name: "AppLayout",
  components: {
    IndexHome,
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
