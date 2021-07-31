<template>
  <header class="header">
    <div class="header__logo">
      <a href="" class="logo" @click.prevent="$router.push('/')">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="" @click.prevent="$router.push({ name: 'Cart' })">
        {{ cartPrice }} ₽
      </a>
    </div>
    <div class="header__user">
      <template v-if="isLogged">
        <a href="" @click.prevent="$router.push({ name: 'Profile' })">
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
        </a>
        <a href="#" class="header__logout" @click.prevent="$emit('logout')"
          ><span>Выйти</span></a
        >
      </template>
      <a
        v-else
        href="#"
        class="header__login"
        @click.prevent="$router.push({ name: 'Login' })"
        ><span>Войти</span></a
      >
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",
  props: {
    isLogged: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
    cartPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/header.scss";
</style>
