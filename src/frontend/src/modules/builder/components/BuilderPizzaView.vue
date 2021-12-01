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
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

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
