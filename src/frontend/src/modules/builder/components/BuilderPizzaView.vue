<template>
  <AppDrop @drop="dropIngredient">
    <div v-if="pizza" class="pizza" :class="classFoundation" data-test="pizza">
      <div class="pizza__wrapper">
        <transition-group name="ingredients" tag="div">
          <template v-for="ingredientMini in this.pizza.ingredients">
            <div
              v-for="quantity in ingredientMini.quantity"
              :key="`${ingredientMini.ingredientId}-${quantity}`"
              class="pizza__filling"
              :class="classIngredient(ingredientMini.ingredientId, quantity)"
              data-test="pizza-ingredient"
            ></div>
          </template>
        </transition-group>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import doughTypes from "@/common/enums/doughTypes";
import ingredientCountClasses from "@/common/enums/ingredientCountClasses.js";
import { mapActions, mapGetters, mapState } from "vuex";
import pizzaComponents from "@/common/enums/pizzaComponents.js";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  computed: {
    ...mapState("Builder", ["pizza", "ingredients"]),
    ...mapGetters("Builder", ["getFullPizzaComponentById"]),
    classFoundation() {
      const doug = this.getFullPizzaComponentById(
        pizzaComponents.DOUGH,
        this.pizza?.doughId
      );
      const sauce = this.getFullPizzaComponentById(
        pizzaComponents.SAUCES,
        this.pizza.sauceId
      );

      return `pizza--foundation--${doughTypes[doug.type]}-${sauce.type}`;
    },
  },

  methods: {
    ...mapActions("Builder", ["dropIngredient"]),
    classIngredient(id, quantity) {
      const ingredient = this.getFullPizzaComponentById(
        pizzaComponents.INGREDIENTS,
        id
      );
      const classCount = ingredientCountClasses[quantity] ?? "";

      return [`pizza__filling--${ingredient.type}`, classCount];
    },
  },
};
</script>

<style lang="scss" scoped>
.ingredients-enter-active,
.ingredients-leave-active {
  transition: 0.5s;
}

.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
