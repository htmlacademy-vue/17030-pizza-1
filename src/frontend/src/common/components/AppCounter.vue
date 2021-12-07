<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--disabled': canNotDecrease }"
      :disabled="canNotDecrease"
      data-test="button-minus"
      @click.prevent="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @input="inputHandler"
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="[
        { 'counter__button--disabled': canNotIncrease },
        plusColorModifierClass,
      ]"
      :disabled="canNotIncrease"
      data-test="button-plus"
      @click.prevent="increase"
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
      default: 0,
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

    plusColorModifierClass: {
      type: String,
      default: "",
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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(#{$el}--disabled) {
      background-color: $purple-200;
    }

    &:active:not(#{$el}--disabled) {
      background-color: $purple-300;
    }

    &:focus:not(#{$el}--disabled) {
      box-shadow: $shadow-regular;
    }

    &#{$el}--disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(#{$el}--disabled) {
      background-color: $green-400;
    }

    &:active:not(#{$el}--disabled) {
      background-color: $green-600;
    }

    &:focus:not(#{$el}--disabled) {
      box-shadow: $shadow-regular;
    }

    &#{$el}--disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(#{$el}--disabled) {
      background-color: $orange-100;
    }

    &:active:not(#{$el}--disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
