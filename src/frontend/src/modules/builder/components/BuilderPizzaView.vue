<template>
  <AppDrop @drop="dropHandler">
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

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
    fillingsList: {
      type: Array,
      required: true,
    },
  },

  computed: {
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
    dropHandler(evt) {
      this.$emit("drop-filling", evt);
    },
    classFilling(type, counter) {
      const classCount = fillingCount[counter] ?? "";
      return [`pizza__filling--${type}`, classCount];
    },
  },
};
</script>

<style lang="scss" scoped></style>
