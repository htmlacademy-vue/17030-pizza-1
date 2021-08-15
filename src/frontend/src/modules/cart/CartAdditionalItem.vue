<template>
  <li class="additional-list__item">
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
        @input="changeAdditionalCount(additionalItem.type, $event)"
        plus-color-modifier-class="counter__button--orange"
      />

      <div class="additional-list__price">
        <b>{{ additionalItem.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";
import { mapActions } from "vuex";

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

  methods: {
    ...mapActions("Cart", ["updateAdditionalCount"]),
    changeAdditionalCount(additionalType, count) {
      this.updateAdditionalCount({ additionalType, count });
    },
  },
};
</script>

<style scoped></style>
