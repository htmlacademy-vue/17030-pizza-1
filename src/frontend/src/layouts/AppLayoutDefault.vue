<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
    <slot />
    <AppNotifications />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
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
