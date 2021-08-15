<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>

        <AppRadio
          v-for="sauce in saucesList"
          :key="sauce.name"
          v-model="pickedSauce"
          :value="sauce.type"
          class="ingridients__input"
          name="sauce"
        >
          <span>{{ sauce.name }}</span>
        </AppRadio>
      </div>

      <div class="ingridients__filling">
        <p>Начинка:</p>

        <ul class="ingridients__list">
          <li
            v-for="fillingItem in fillingsList"
            :key="fillingItem.name"
            class="ingridients__item"
          >
            <AppDrag
              :transfer-data="fillingItem"
              :draggable="canDragFilling(fillingCounts[fillingItem.type])"
            >
              <span class="filling" :class="`filling--${fillingItem.type}`">
                {{ fillingItem.name }}
              </span>
            </AppDrag>
            <AppCounter
              :value="fillingCounts[fillingItem.type]"
              :min="APP_COUNTER_MIN_VALUE"
              :max="APP_COUNTER_MAX_VALUE"
              class="counter--orange ingridients__counter"
              @input="changeFillingCount(fillingItem.type, $event)"
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
import { mapActions, mapGetters, mapState } from "vuex";

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
      fillingCounts: (state) => state.pizza.fillingCounts,
    }),
    ...mapGetters("Builder", {
      saucesList: "sauces",
      fillingsList: "fillings",
    }),
    pickedSauce: {
      get() {
        return this.$store.state.Builder.pizza.sauceValue;
      },
      set(val) {
        this.$store.dispatch("Builder/setSauce", val);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["setFilling"]),
    changeFillingCount(fillingType, count) {
      this.setFilling({ fillingType, count });
    },
    canDragFilling(counter) {
      return counter < APP_COUNTER_MAX_VALUE;
    },
  },
};
</script>

<style lang="scss" scoped></style>
