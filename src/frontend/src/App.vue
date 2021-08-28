<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  created() {
    console.log("App created");
    console.log(this.$store.dispatch("init"));
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
