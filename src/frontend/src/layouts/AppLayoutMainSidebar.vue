<template>
  <div class="sidebar">
    <a href="" class="logo layout__logo" @click.prevent="$router.push('/')">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </a>

    <router-link
      to="/orders"
      class="layout__link"
      active-class="layout__link--active"
      >История заказов
    </router-link>
    <router-link
      to="/profile"
      class="layout__link"
      active-class="layout__link--active"
      >Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutMainSidebar",
};
</script>

<style scoped></style>
