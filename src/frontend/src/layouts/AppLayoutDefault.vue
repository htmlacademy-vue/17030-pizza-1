<template>
  <div class="app-layout-default">
    <AppLayoutHeader
      :user="user"
      :cart-price="cartPrice"
      :is-logged="isLogged"
      @logout="$emit('logout')"
    />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
  },

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
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
