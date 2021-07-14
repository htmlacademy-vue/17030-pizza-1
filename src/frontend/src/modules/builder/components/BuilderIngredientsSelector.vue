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
            v-for="(fillingItem, index) in fillingsList"
            :key="fillingItem.name"
            class="ingridients__item"
          >
            <AppDrag
              :transfer-data="fillingsCounterList[index]"
              :draggable="canDragFilling(fillingsCounterList[index].count)"
            >
              <span class="filling" :class="`filling--${fillingItem.type}`">
                {{ fillingItem.name }}
              </span>
            </AppDrag>
            <AppCounter
              :value="fillingsCounterList[index].count"
              :min="APP_COUNTER_MIN_VALUE"
              :max="APP_COUNTER_MAX_VALUE"
              class="counter--orange ingridients__counter"
              @input="changeFillingCount($event, fillingItem.type)"
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

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppRadio,
    AppDrag,
    AppCounter,
  },

  props: {
    sauceValue: {
      type: String,
      required: true,
    },
    saucesList: {
      type: Array,
      required: true,
    },
    fillingsList: {
      type: Array,
      required: true,
    },
    fillingsCounterList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      pickedSauce: this.sauceValue,
      APP_COUNTER_MIN_VALUE,
      APP_COUNTER_MAX_VALUE,
    };
  },

  watch: {
    pickedSauce(val) {
      this.$emit("choose-sauce", val);
    },
  },

  methods: {
    changeFillingCount(count, type) {
      this.$emit("change-filling", count, type);
    },
    canDragFilling(counter) {
      return counter < APP_COUNTER_MAX_VALUE;
    },
  },
};
</script>

<style lang="scss" scoped></style>
