<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--disabled': canNotDecrease }"
      @click.prevent="decrease"
      :disabled="canNotDecrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @input="inputHandler"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--disabled': canNotIncrease }"
      @click.prevent="increase"
      :disabled="canNotIncrease"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import {
  APP_COUNTER_MAX_VALUE,
  APP_COUNTER_MIN_VALUE,
} from "@/common/constants";

export default {
  name: "AppCounter",
  props: {
    value: {
      type: Number,
      required: true,
      validator(value) {
        return Number.isFinite(value);
      },
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },

  data() {
    return {
      APP_COUNTER_MIN_VALUE,
      APP_COUNTER_MAX_VALUE,
    };
  },

  computed: {
    canNotDecrease() {
      return this.value <= APP_COUNTER_MIN_VALUE;
    },
    canNotIncrease() {
      return this.value >= APP_COUNTER_MAX_VALUE;
    },
  },

  methods: {
    inputHandler(evt) {
      let value = 0;
      if (Number.isInteger(parseInt(evt.target.value))) {
        value = parseInt(evt.target.value);
      }

      if (value < APP_COUNTER_MIN_VALUE) {
        value = APP_COUNTER_MIN_VALUE;
      }

      if (value > APP_COUNTER_MAX_VALUE) {
        value = APP_COUNTER_MAX_VALUE;
      }

      this.$emit("input", value);
    },
    decrease() {
      if (this.canNotDecrease) {
        return;
      }
      this.$emit("input", this.value - 1);
    },
    increase() {
      if (this.canNotIncrease) {
        return;
      }
      this.$emit("input", this.value + 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
