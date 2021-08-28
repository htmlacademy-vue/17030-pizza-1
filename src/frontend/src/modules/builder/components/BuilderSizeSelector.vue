<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <AppSelectorRadio
        v-for="size in sizes"
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
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppSelectorRadio,
  },

  computed: {
    ...mapState("Builder", ["sizes"]),
    pickedSize: {
      get() {
        return this.$store.state.Builder.pizza?.sizeValue;
      },
      set(val) {
        this.$store.dispatch("Builder/setSize", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
