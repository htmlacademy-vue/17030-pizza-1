<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderItem v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import OrderItem from "@/modules/orders/components/OrderItem.vue";
import { mapState } from "vuex";

export default {
  name: "Orders",

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
