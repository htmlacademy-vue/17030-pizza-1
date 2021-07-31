<template>
  <ul class="additional-list">
    <CartAdditionalItem
      v-for="additionalItem in additional"
      :key="additionalItem.name"
      :additional-item="additionalItem"
      :additional-count="additionalCounts[additionalItem.slug]"
      @update-additional-count="$emit('update-additional-count', $event)"
    />
  </ul>
</template>

<script>
import CartAdditionalItem from "@/modules/cart/componentns/CartAdditionalItem";

export default {
  name: "CartAdditional",

  components: {
    CartAdditionalItem,
  },

  props: {
    additional: {
      type: Array,
      required: true,
    },
    additionalCounts: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
