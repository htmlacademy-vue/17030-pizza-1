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
      type: String,
      required: true,
      default: "",
    },
    value: {
      type: String,
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
    changeHandler(evt) {
      this.$emit("change", evt.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
