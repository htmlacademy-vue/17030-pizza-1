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

<style lang="scss" scoped></style>
