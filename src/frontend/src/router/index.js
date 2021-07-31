import VueRouter from "vue-router";
import Vue from "vue";
import routes from "@/router/routes";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
