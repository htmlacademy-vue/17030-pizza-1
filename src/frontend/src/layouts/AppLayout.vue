<template>
  <component
    :is="layout"
    :cart-price="cartPrice"
    :user="user"
    :is-logged="isLogged"
    @logout="$emit('logout')"
  >
    <slot />
  </component>
</template>

<script>
export const APP_LAYOUT_DEFAULT = "AppLayoutDefault";

export default {
  name: "AppLayout",

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

  computed: {
    layout() {
      const layout = this.$route.meta.layout || APP_LAYOUT_DEFAULT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
