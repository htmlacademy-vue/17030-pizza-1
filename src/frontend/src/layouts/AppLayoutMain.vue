<template>
  <div class="app-layout-main">
    <AppLayoutHeader />

    <main class="layout">
      <AppLayoutMainSidebar class="layout__sidebar" />

      <div class="layout__content">
        <slot />
      </div>
    </main>

    <AppNotifications />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import AppLayoutMainSidebar from "@/layouts/AppLayoutMainSidebar.vue";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
    AppLayoutMainSidebar,
  },
};
</script>

<style scoped></style>
