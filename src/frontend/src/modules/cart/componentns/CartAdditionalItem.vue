<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="additionalItem.image"
        :alt="additionalItem.name"
        width="39"
        height="60"
      />
      <span>{{ additionalItem.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <AppCounter
        :value="additionalCount"
        :min="0"
        class="additional-list__counter"
        @input="
          $emit('update-additional-count', {
            slug: additionalItem.slug,
            value: $event,
          })
        "
      />

      <div class="additional-list__price">
        <b>{{ additionalItem.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";

export default {
  name: "CartAdditionalItem",

  components: {
    AppCounter,
  },

  props: {
    additionalItem: {
      type: Object,
      required: true,
    },
    additionalCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
