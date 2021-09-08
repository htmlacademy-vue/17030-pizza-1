import pizzaComponents from "@/common/enums/pizzaComponents.js";

export default {
  methods: {
    $priceOfDough(pizza) {
      const dough = this.getFullPizzaComponentById(
        pizzaComponents.DOUGH,
        pizza?.doughId
      );
      return dough?.price ?? 0;
    },

    $priceOfSauce(pizza) {
      const sauce = this.getFullPizzaComponentById(
        pizzaComponents.SAUCES,
        pizza?.sauceId
      );
      return sauce?.price ?? 0;
    },

    $priceOfIngredients(pizza) {
      return pizza?.ingredients?.reduce((sum, ingredientMini) => {
        const ingredient = this.getFullPizzaComponentById(
          pizzaComponents.INGREDIENTS,
          ingredientMini.ingredientId
        );
        return sum + ingredient.price * ingredientMini.quantity;
      }, 0);
    },

    $multiplier(pizza) {
      const size = this.getFullPizzaComponentById(
        pizzaComponents.SIZES,
        pizza?.sizeId
      );
      return size?.multiplier ?? 0;
    },

    $priceForOnePizza(pizza) {
      return (
        (this.$priceOfDough(pizza) +
          this.$priceOfSauce(pizza) +
          this.$priceOfIngredients(pizza)) *
        this.$multiplier(pizza)
      );
    },
  },
};
