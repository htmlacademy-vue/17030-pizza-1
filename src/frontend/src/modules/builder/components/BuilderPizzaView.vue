<template>
  <AppDrop @drop="dropIngredient">
    <div class="pizza" :class="classFoundation">
      <div class="pizza__wrapper">
        <template v-for="ingredient in preferredIngredients">
          <div
            v-for="counter in pizza.ingredientCounts[ingredient.type]"
            :key="`${ingredient.type}-${counter}`"
            class="pizza__filling"
            :class="classIngredient(ingredient.type, counter)"
          ></div>
        </template>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import doughTypes from "@/common/enums/doughTypes";
import ingredientCountClasses from "@/common/enums/ingredientCountClasses.js";
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  computed: {
    ...mapState("Builder", ["pizza", "ingredients"]),
    classFoundation() {
      return `pizza--foundation--${doughTypes[this.pizza?.dough?.type]}-${
        this.pizza?.sauce?.type
      }`;
    },
    preferredIngredients() {
      return this.ingredients?.filter(
        ({ type }) => this.pizza?.ingredientCounts[type] > 0
      );
    },
  },

  methods: {
    ...mapActions("Builder", ["dropIngredient"]),
    classIngredient(type, counter) {
      const classCount = ingredientCountClasses[counter] ?? "";

      return [`pizza__filling--${type}`, classCount];
    },
  },
};
</script>

<style lang="scss" scoped></style>
