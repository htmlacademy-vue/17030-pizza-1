<template>
  <div class="app-layout-main">
    <AppLayoutHeader
      :user="user"
      :is-logged="isLogged"
      @logout="$emit('logout')"
    />

    <main class="layout">
      <AppLayoutMainSidebar class="layout__sidebar" />

      <div class="layout__content">
        <slot />
      </div>
    </main>
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
};
</script>

<style scoped></style>
