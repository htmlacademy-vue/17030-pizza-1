<template>
  <label class="radio ingredients__input">
    <input
      type="radio"
      name="sauce"
      :value="sauce.type"
      @change="changeHandler"
    />
    <span>{{ sauce.name }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderIngredientsSauce",
  props: {
    sauce: {
      type: Object,
      required: true,
    },
  },

  methods: {
    changeHandler(evt) {
      this.$emit("input", evt.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
