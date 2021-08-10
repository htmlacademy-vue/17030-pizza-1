<template>
  <component
    :is="layout"
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
