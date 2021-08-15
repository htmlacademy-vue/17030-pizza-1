<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
export const APP_LAYOUT_DEFAULT = "AppLayoutDefault";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout || APP_LAYOUT_DEFAULT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
