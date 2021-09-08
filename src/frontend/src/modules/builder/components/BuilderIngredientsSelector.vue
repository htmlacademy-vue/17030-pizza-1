<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div v-if="pizza" class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <AppRadio
          v-for="sauce in sauces"
          :key="sauce.name"
          v-model="pickedSauce"
          :value="sauce.id"
          class="ingredients__input"
          name="sauce"
        >
          <span>{{ sauce.name }}</span>
        </AppRadio>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul v-if="ingredients" class="ingredients__list">
          <li
            v-for="ingredientItem in ingredients"
            :key="ingredientItem.name"
            class="ingredients__item"
          >
            <AppDrag
              :transfer-data="ingredientItem"
              :draggable="canDragIngredient(ingredientItem)"
            >
              <span class="filling" :class="`filling--${ingredientItem.type}`">
                {{ ingredientItem.name }}
              </span>
            </AppDrag>
            <AppCounter
              :value="getIngredientQuantity(ingredientItem.id)"
              :min="APP_COUNTER_MIN_VALUE"
              :max="APP_COUNTER_MAX_VALUE"
              class="counter--orange ingredients__counter"
              @input="changeIngredientQuantity(ingredientItem.id, $event)"
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
    ...mapState("Builder", ["pizza", "ingredients", "sauces"]),

    pickedSauce: {
      get() {
        return this.$store.state.Builder.pizza?.sauceId;
      },
      set(val) {
        this.$store.dispatch("Builder/setSauce", val);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["setIngredient"]),

    getIngredientQuantity(id) {
      return (
        this.pizza?.ingredients?.find(
          ({ ingredientId }) => +ingredientId === +id
        )?.quantity ?? 1
      );
    },

    changeIngredientQuantity(ingredientId, quantity) {
      this.setIngredient({ ingredientId, quantity });
    },

    canDragIngredient(ingredientItem) {
      const ingredientMini = this.pizza?.ingredients?.find(
        ({ ingredientId }) => +ingredientId === ingredientItem.id
      );

      if (!ingredientMini) {
        return true;
      }

      return ingredientMini?.quantity < APP_COUNTER_MAX_VALUE;
    },
  },
};
</script>

<style lang="scss" scoped></style>
