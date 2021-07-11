<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="changeHandler"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "AppRadio",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: [String, Object],
    },
    value: {
      type: [String, Object],
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
