<template>
  <div class="sidebar">
    <AppLogo class="layout__logo" />

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

<style lang="scss" scoped>
.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: $green-500;

  &::v-deep img {
    display: block;

    margin: 0 auto;
  }
}
</style>
