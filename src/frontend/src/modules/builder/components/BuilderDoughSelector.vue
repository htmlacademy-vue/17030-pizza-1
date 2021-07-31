<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <AppSelectorRadio
        v-for="doughItem in doughList"
        :key="doughItem.name"
        v-model="pickedDough"
        :value="doughItem.type"
        class="dough__input"
        :class="`dough__input--${doughItem.type}`"
        name="dough"
      >
        <b>{{ doughItem.name }}</b>
        <span>{{ doughItem.description }}</span>
      </AppSelectorRadio>
    </div>
  </div>
</template>

<script>
import AppSelectorRadio from "@/common/components/AppSelectorRadio";

export default {
  name: "BuilderDoughSelector",

  components: {
    AppSelectorRadio,
  },

  props: {
    doughValue: {
      type: String,
      required: true,
    },
    doughList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pickedDough: this.doughValue,
    };
  },

  watch: {
    doughValue(newDough) {
      this.pickedDough = newDough;
    },
    pickedDough(val) {
      this.$emit("update-dough", val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
