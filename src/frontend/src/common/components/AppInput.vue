<template>
  <label class="input" :class="modifiersClass">
    <span
      class="input__caption"
      :class="{ 'visually-hidden': !isVisibleCaption }"
      data-test="input-caption"
    >
      <slot />
    </span>
    <input
      ref="input"
      :type="type"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="showError" class="input__text" data-test="error-text">
      {{ errorText }}
    </span>
  </label>
</template>

<script>
export default {
  name: "AppInput",

  props: {
    value: {
      type: [String, Number],
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    isVisibleCaption: {
      type: Boolean,
      default: true,
    },
    modBigLabel: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modifiersClass() {
      return {
        "input--big-label": this.modBigLabel,
      };
    },
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  display: block;

  &__caption {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    .input__caption {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }

  &__text {
    position: absolute;
    top: 100%;
    left: 0;

    color: $red-800;

    @include l-s11-h13;
  }
}
</style>
