<template>
  <div class="sheet">
    <AppTitle
      class="sheet__title"
      :level="2"
      mod-text-small
    >
      Выберите ингредиенты
    </AppTitle>

    <div
      v-if="pizza"
      class="sheet__content ingredients"
    >
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <AppRadio
          v-for="sauce in sauces"
          :key="sauce.name"
          v-model="pickedSauce"
          :value="sauce.id"
          class="ingredients__input"
          name="sauce"
          data-test="sauce-radio-input"
        >
          <span>{{ sauce.name }}</span>
        </AppRadio>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul
          v-if="ingredients"
          class="ingredients__list"
        >
          <li
            v-for="ingredientItem in ingredients"
            :key="ingredientItem.name"
            class="ingredients__item"
          >
            <AppDrag
              :transfer-data="ingredientItem"
              :draggable="canDragIngredient(ingredientItem)"
            >
              <span
                class="filling"
                :class="`filling--${ingredientItem.type}`"
              >
                {{ ingredientItem.name }}
              </span>
            </AppDrag>
            <AppCounter
              :value="getIngredientQuantity(ingredientItem.id)"
              :min="APP_COUNTER_MIN_VALUE"
              :max="APP_COUNTER_MAX_VALUE"
              class="counter--orange ingredients__counter"
              data-test="ingredient-counter"
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
          ({ ingredientId }) => ingredientId.toString() === id.toString()
        )?.quantity ?? 0
      );
    },

    changeIngredientQuantity(ingredientId, quantity) {
      this.setIngredient({ ingredientId, quantity });
    },

    canDragIngredient(ingredientItem) {
      const ingredientMini = this.pizza?.ingredients?.find(
        ({ ingredientId }) =>
          ingredientId.toString() === ingredientItem.id.toString()
      );

      if (!ingredientMini) {
        return true;
      }

      return ingredientMini?.quantity < APP_COUNTER_MAX_VALUE;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";
@import "~@/assets/scss/mixins/m_center.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}
</style>
