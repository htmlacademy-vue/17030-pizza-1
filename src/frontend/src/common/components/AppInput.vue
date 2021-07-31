<template>
  <label class="input">
    <span :class="{ 'visually-hidden': !isVisibleCaption }">
      <slot />
    </span>
    <input
      ref="input"
      :type="type"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="showError">{{ errorText }}</span>
  </label>
</template>

<script>
export default {
  name: "AppInput",

  props: {
    value: {
      type: [String, Number],
      required: true,
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
    required: {
      type: Boolean,
      default: false,
    },
    isVisibleCaption: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style lang="scss" scoped></style>
