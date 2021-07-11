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
          :value="sauce"
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
            <AppDrag :transfer-data="fillingItem">
              <span class="filling" :class="`filling--${fillingItem.type}`">
                {{ fillingItem.name }}
              </span>
            </AppDrag>
            <AppCounter
              v-model.number="fillingItem.count"
              class="counter--orange ingridients__counter"
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

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppRadio,
    AppDrag,
    AppCounter,
  },

  props: {
    saucesList: {
      type: Array,
      required: true,
    },
    fillingsList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pickedSauce: null,
    };
  },

  watch: {
    pickedSauce(val) {
      this.$emit("choose-sauce", val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
