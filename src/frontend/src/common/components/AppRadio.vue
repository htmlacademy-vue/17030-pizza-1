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
      type: [String, Number],
      required: true,
      default: "",
    },
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
  },

  computed: {
    isChecked() {
      return this.checked.toString() === this.value.toString();
    },
  },

  methods: {
    changeHandler(evt) {
      this.$emit("change", evt.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
