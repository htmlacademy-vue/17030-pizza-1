<template>
  <li class="additional-list__item">
    <p class="additional-list__description">
      <img :src="miscItem.image" :alt="miscItem.name" width="39" height="60" />
      <span>{{ miscItem.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <AppCounter
        :value="miscQuantity"
        :min="0"
        class="additional-list__counter"
        @input="changeMiscCount(miscItem.id, $event)"
        plus-color-modifier-class="counter__button--orange"
      />

      <div class="additional-list__price">
        <b>{{ miscItem.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter.vue";
import { mapActions } from "vuex";

export default {
  name: "CartMiscItem",

  components: {
    AppCounter,
  },

  props: {
    miscItem: {
      type: Object,
      required: true,
    },
    miscQuantity: {
      type: Number,
      required: true,
    },
  },

  methods: {
    ...mapActions("Cart", ["updateMiscCount"]),
    changeMiscCount(miscId, quantity) {
      this.updateMiscCount({ miscId, quantity });
    },
  },
};
</script>

<style scoped></style>
