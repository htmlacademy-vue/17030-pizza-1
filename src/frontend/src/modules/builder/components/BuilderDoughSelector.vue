<template>
  <div class="sheet">
    <AppTitle
      class="sheet__title"
      :level="2"
      mod-text-small
    >
      Выберите тесто
    </AppTitle>

    <div class="sheet__content dough">
      <BuilderDoughRadio
        v-for="doughItem in doughList"
        :key="doughItem.name"
        v-model="pickedDough"
        :value="doughItem.id"
        :class="`dough__input--${doughItem.type}`"
        data-test="dough-radio"
      >
        <b>{{ doughItem.name }}</b>
        <span>{{ doughItem.description }}</span>
      </BuilderDoughRadio>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BuilderDoughRadio from "@/modules/builder/components/BuilderDoughRadio.vue";

export default {
  name: "BuilderDoughSelector",

  components: {
    BuilderDoughRadio,
  },

  computed: {
    ...mapState("Builder", {
      doughList: "dough",
    }),

    pickedDough: {
      get() {
        return this.$store.state.Builder.pizza?.doughId;
      },
      set(val) {
        this.$store.dispatch("Builder/setDough", val);
      },
    },
  },
};
</script>
