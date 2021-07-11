<template>
  <label class="input">
    <span :class="{ 'visually-hidden': !isVisibleCaption }">
      <slot />
    </span>
    <input
      type="text"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      @input="inputHandler"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isVisibleCaption: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    inputHandler(evt) {
      this.$emit("input", evt.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
