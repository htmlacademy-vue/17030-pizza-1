<template>
  <div id="app">
    <AppLayout>
      <transition
        appear
        enter-active-class="animate__animated animate__fast animate__slideInUp"
        @appear="appear"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers.js";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.log(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },

  methods: {
    appear(el, done) {
      if (this.$route.meta.notAnimate) {
        done();
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
