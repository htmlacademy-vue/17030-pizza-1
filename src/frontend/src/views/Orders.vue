<template>
  <div>
    <div class="layout__title">
      <AppTitle mod-text-big>
        История заказов
      </AppTitle>
    </div>

    <OrderItem
      v-for="order in orders"
      :key="order.id"
      :order="order"
      data-test="order-item-component"
    />
  </div>
</template>

<script>
import OrderItem from "@/modules/orders/components/OrderItem.vue";
import { mapState } from "vuex";
import { auth } from "@/middlewares";

export default {
  name: "Orders",

  layout: "AppLayoutMain",
  middlewares: [auth],

  components: {
    OrderItem,
  },

  computed: {
    ...mapState("Orders", ["orders"]),
  },

  created() {
    this.$store.dispatch("Orders/query");
    this.$store.dispatch("Auth/queryAddresses");
    this.$store.dispatch("Cart/fetchMisc");
  },
};
</script>

<style lang="scss" scoped></style>
