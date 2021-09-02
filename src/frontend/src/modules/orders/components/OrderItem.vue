<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ calcTotalCostOfOrder() }} ₽</span>
      </div>

      <div class="order__button">
        <AppButton mod-border>Удалить</AppButton>
      </div>
      <div class="order__button">
        <AppButton>Повторить</AppButton>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="orderPizza in orderPizzas"
        :key="orderPizza.id"
        class="order__item"
      >
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="orderPizza.name"
          />
          <div class="product__text">
            <h2>{{ orderPizza.name }}</h2>
            <ul>
              <li>{{ getSizeAndDoughText(orderPizza) }}</li>
              <li>Соус: {{ getSauceText(orderPizza) }}</li>
              <li>Начинка: {{ getIngredientsText(orderPizza) }}</li>
            </ul>
          </div>
        </div>

        <pre><mark>{{ calcCostOfOnePizza(orderPizza) }}</mark></pre>
        <p class="order__price">{{ costOfPizzaText(orderPizza) }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="oneMisc in getMisc()" :key="oneMisc.id">
        <img :src="oneMisc.image" width="20" height="30" :alt="oneMisc.name" />
        <p>
          <span>{{ oneMisc.name }}</span>
          <b>{{ oneMisc.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ order.orderAddress.name }}</p>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderItem",

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", ["dough", "ingredients", "sauces", "sizes"]),
    ...mapState("Cart", ["misc"]),
    orderPizzas() {
      return this.order.orderPizzas;
    },
  },

  methods: {
    getDough(orderPizza) {
      return this.dough?.find(({ id }) => id === orderPizza.doughId);
    },

    getIngredients(orderPizza) {
      return this.ingredients?.filter(({ id }) => {
        return orderPizza.ingredients.some(
          ({ ingredientId }) => id === ingredientId
        );
      });
    },

    getSauce(orderPizza) {
      return this.sauces?.find(({ id }) => id === orderPizza.sauceId);
    },

    getSize(orderPizza) {
      return this.sizes?.find(({ id }) => id === orderPizza.sizeId);
    },

    getMisc() {
      return this.misc?.filter(({ id }) =>
        this.order.orderMisc?.some(({ miscId }) => id === miscId)
      );
    },

    calcCostOfOnePizza(orderPizza) {
      const multiplier = this.getSize(orderPizza)?.multiplier ?? 1;
      const priceDough = this.getDough(orderPizza)?.price ?? 0;
      const priceSauce = this.getSauce(orderPizza)?.price ?? 0;
      const priceIngredients =
        this.getIngredients(orderPizza)?.reduce((sum, ingredient) => {
          const quantity =
            orderPizza.ingredients.find(
              ({ ingredientId }) => ingredientId === ingredient.id
            )?.quantity ?? 1;
          return sum + ingredient.price * quantity;
        }, 0) ?? 0;

      return multiplier * (priceDough + priceSauce + priceIngredients);
    },

    costOfPizzaText(orderPizza) {
      return `${orderPizza.quantity} × ${this.calcCostOfOnePizza(orderPizza)}`;
    },

    calcTotalCostOfOrder() {
      const totalOfPizza = this.order.orderPizzas.reduce(
        (sum, orderPizza) =>
          sum + this.calcCostOfOnePizza(orderPizza) * orderPizza.quantity,
        0
      );

      const totalOfMisc = this.getMisc()?.reduce((sum, misc) => {
        const quantity = this.order.orderMisc?.find(
          ({ miscId }) => miscId === misc.id
        )?.quantity;
        return sum + misc.price * quantity;
      }, 0);

      return totalOfPizza + totalOfMisc;
    },

    getSizeAndDoughText(orderPizza) {
      return `${this.getSize(orderPizza)?.name}, ${
        this.getDough(orderPizza)?.nameAlt
      }`;
    },

    getSauceText(orderPizza) {
      return this.getSauce(orderPizza)?.name.toLowerCase();
    },

    getIngredientsText(orderPizza) {
      return this.getIngredients(orderPizza)
        ?.map(({ name }) => name.toLowerCase())
        .join(", ");
    },
  },
};
</script>

<style scoped></style>
