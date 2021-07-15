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
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },

  computed: {
    canNotDecrease() {
      return this.value <= this.min;
    },
    canNotIncrease() {
      return this.value >= this.max;
    },
  },

  methods: {
    inputHandler(evt) {
      let value = 0;
      if (Number.isInteger(parseInt(evt.target.value))) {
        value = parseInt(evt.target.value);
      }

      if (value < this.min) {
        value = this.min;
      }

      if (value > this.max) {
        value = this.max;
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
