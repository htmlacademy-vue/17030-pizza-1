<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  created() {
    this.fetchPizzaOptions();
    this.createNewPizza();
  },

  methods: {
    ...mapActions("Builder", ["fetchPizzaOptions", "createNewPizza"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
