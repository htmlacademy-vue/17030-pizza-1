<template>
  <div class="sheet">
    <AppTitle
      class="sheet__title"
      :level="2"
      mod-text-small
    >
      Выберите размер
    </AppTitle>

    <div class="sheet__content diameter">
      <BuilderSizeRadio
        v-for="size in sizes"
        :key="size.name"
        v-model="pickedSize"
        :value="size.id"
        :class="`diameter__input--${size.type}`"
        data-test="size-radio-item"
      >
        <span>{{ size.name }}</span>
      </BuilderSizeRadio>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BuilderSizeRadio from "@/modules/builder/components/BuilderSizeRadio.vue";

export default {
  name: "BuilderSizeSelector",
  components: {
    BuilderSizeRadio,
  },

  computed: {
    ...mapState("Builder", ["sizes"]),

    pickedSize: {
      get() {
        return this.$store.state.Builder.pizza?.sizeId;
      },
      set(val) {
        this.$store.dispatch("Builder/setSize", val);
      },
    },
  },
};
</script>
