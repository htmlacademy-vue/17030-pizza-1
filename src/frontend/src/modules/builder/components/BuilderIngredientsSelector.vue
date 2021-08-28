<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <AppRadio
          v-for="sauce in sauces"
          :key="sauce.name"
          v-model="pickedSauce"
          :value="sauce.type"
          class="ingredients__input"
          name="sauce"
        >
          <span>{{ sauce.name }}</span>
        </AppRadio>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul v-if="ingredients && ingredientCounts" class="ingredients__list">
          <li
            v-for="ingredientItem in ingredients"
            :key="ingredientItem.name"
            class="ingredients__item"
          >
            <AppDrag
              :transfer-data="ingredientItem"
              :draggable="
                canDragIngredient(ingredientCounts[ingredientItem.type])
              "
            >
              <span class="filling" :class="`filling--${ingredientItem.type}`">
                {{ ingredientItem.name }}
              </span>
            </AppDrag>
            <AppCounter
              :value="ingredientCounts[ingredientItem.type]"
              :min="APP_COUNTER_MIN_VALUE"
              :max="APP_COUNTER_MAX_VALUE"
              class="counter--orange ingredients__counter"
              @input="changeIngredientCount(ingredientItem.type, $event)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadio from "@/common/components/AppRadio";
import AppDrag from "@/common/components/AppDrag";
import AppCounter from "@/common/components/AppCounter";
import {
  APP_COUNTER_MAX_VALUE,
  APP_COUNTER_MIN_VALUE,
} from "@/common/constants";
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppRadio,
    AppDrag,
    AppCounter,
  },

  data() {
    return {
      APP_COUNTER_MIN_VALUE,
      APP_COUNTER_MAX_VALUE,
    };
  },

  computed: {
    ...mapState("Builder", {
      ingredientCounts: (state) => state.pizza?.ingredientCounts,
      ingredients: "ingredients",
      sauces: "sauces",
    }),
    pickedSauce: {
      get() {
        return this.$store.state.Builder.pizza?.sauceValue;
      },
      set(val) {
        this.$store.dispatch("Builder/setSauce", val);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["setIngredient"]),
    changeIngredientCount(ingredientType, count) {
      this.setIngredient({ ingredientType, count });
    },
    canDragIngredient(counter) {
      return counter < APP_COUNTER_MAX_VALUE;
    },
  },
};
</script>

<style lang="scss" scoped></style>
