<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      class="visually-hidden"
      @change="changeHandler"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "AppSelectorRadio",
  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    checked: {
      required: true,
    },
    value: {
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
  },

  computed: {
    isChecked() {
      return this.checked === this.value;
    },
  },

  methods: {
    changeHandler() {
      this.$emit("change", this.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
