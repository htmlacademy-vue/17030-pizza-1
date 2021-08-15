<template>
  <AppDrop @drop="dropFilling">
    <div class="pizza" :class="classFoundation">
      <div class="pizza__wrapper">
        <template v-for="filling in preferredFillings">
          <div
            v-for="counter in pizza.fillingCounts[filling.type]"
            :key="`${filling.type}-${counter}`"
            class="pizza__filling"
            :class="classFilling(filling.type, counter)"
          ></div>
        </template>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import doughTypes from "@/common/enums/doughTypes";
import fillingCount from "@/common/enums/fillingCount";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", {
      fillingsList: "fillings",
    }),
    classFoundation() {
      return `pizza--foundation--${doughTypes[this.pizza.dough?.type]}-${
        this.pizza.sauce?.type
      }`;
    },
    preferredFillings() {
      return this.fillingsList.filter(
        ({ type }) => this.pizza.fillingCounts[type] > 0
      );
    },
  },

  methods: {
    ...mapActions("Builder", ["dropFilling"]),
    classFilling(type, counter) {
      const classCount = fillingCount[counter] ?? "";

      return [`pizza__filling--${type}`, classCount];
    },
  },
};
</script>

<style lang="scss" scoped></style>
