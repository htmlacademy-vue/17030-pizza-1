<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <AppSelectorRadio
        v-for="size in sizesList"
        :key="size.name"
        v-model="pickedSize"
        :value="size.type"
        class="diameter__input"
        :class="`diameter__input--${size.type}`"
        name="size"
      >
        <span>{{ size.name }}</span>
      </AppSelectorRadio>
    </div>
  </div>
</template>

<script>
import AppSelectorRadio from "@/common/components/AppSelectorRadio";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppSelectorRadio,
  },

  props: {
    sizeValue: {
      type: String,
      required: true,
    },
    sizesList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pickedSize: this.sizeValue,
    };
  },

  watch: {
    sizeValue(newSize) {
      this.pickedSize = newSize;
    },
    pickedSize(val) {
      this.$emit("update-size", val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
