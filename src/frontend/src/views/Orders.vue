<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderItem v-for="i in 2" :key="i" />
  </div>
</template>

<script>
import OrderItem from "@/modules/order/components/OrderItem.vue";

export default {
  name: "Orders",

  components: {
    OrderItem,
  },
};
</script>

<style scoped></style>
