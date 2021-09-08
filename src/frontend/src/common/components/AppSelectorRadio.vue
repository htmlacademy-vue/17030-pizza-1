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
      return +this.checked === +this.value;
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
