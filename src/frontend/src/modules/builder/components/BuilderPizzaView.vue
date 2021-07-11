<template>
  <AppDrop @drop="dropHandler">
    <div class="pizza" :class="classFoundation">
      <div class="pizza__wrapper">
        <div
          v-for="filling in preferredFillings"
          :key="filling.name"
          class="pizza__filling"
          :class="classFilling(filling)"
        ></div>
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
    preferredName: {
      type: String,
      required: true,
    },
    preferredDough: {
      type: Object,
      default() {
        return {};
      },
    },
    preferredSize: {
      type: Object,
      default() {
        return {};
      },
    },
    preferredSauce: {
      type: Object,
      default() {
        return {};
      },
    },
    preferredFillings: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  computed: {
    classFoundation() {
      return `pizza--foundation--${doughTypes[this.preferredDough?.type]}-${
        this.preferredSauce?.type
      }`;
    },
  },

  methods: {
    dropHandler(evt) {
      this.$emit("drop-filling", evt);
    },
    classFilling(filling) {
      const classCount = fillingCount[filling.count] ?? "";
      return [`pizza__filling--${filling.type}`, classCount];
    },
  },
};
</script>

<style lang="scss" scoped></style>
