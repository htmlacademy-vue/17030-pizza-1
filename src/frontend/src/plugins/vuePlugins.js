import Vue from "vue";
import JWTService from "@/services/jwt.service.js";
import Notifier from "@/plugins/notifier.js";
import store from "@/store";
import { createResources } from "@/common/helpers.js";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $notifier: () => new Notifier(store),
        $api() {
          return createResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
