<template>
  <header class="header">
    <div class="header__logo">
      <router-link class="logo" to="/">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ totalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <template v-if="isLogged">
        <router-link to="/profile">
          <picture>
            <source
              type="image/webp"
              srcset="
                @/assets/img/users/user5.webp    1x,
                @/assets/img/users/user5@2x.webp 2x
              "
            />
            <img
              src="@/assets/img/users/user5.jpg"
              srcset="@/assets/img/users/user5@2x.jpg"
              :alt="user.name"
              width="32"
              height="32"
            />
          </picture>
          <span>{{ user.name }}</span>
        </router-link>
        <a href="#" class="header__logout" @click.prevent="logOut"
          ><span>Выйти</span></a
        >
      </template>
      <router-link v-else class="header__login" to="login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",

  computed: {
    ...mapState("Auth", ["user", "isLogged"]),
    ...mapGetters("Cart", ["totalPrice"]),
  },

  methods: {
    ...mapActions("Auth", ["logOut"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/header.scss";
</style>
