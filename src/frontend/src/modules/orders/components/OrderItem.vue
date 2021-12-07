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
        <AppButton
          mod-border
          data-test="remove-button"
          @click.prevent="deleteOrder(order.id)"
        >
          Удалить
        </AppButton>
      </div>
      <div class="order__button">
        <AppButton
          data-test="repeat-button"
          @click.prevent="repeatOrder(order.id)"
        >
          Повторить
        </AppButton>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="orderPizza in orderPizzas"
        :key="orderPizza.id"
        class="order__item"
      >
        <AppProductDescription :pizza="orderPizza" />

        <p class="order__price">{{ costOfPizzaText(orderPizza) }} ₽</p>
      </li>
    </ul>

    <ul
      v-if="misc.length"
      class="order__additional"
      data-test="order-additional"
    >
      <li
        v-for="oneMisc in getMisc()"
        :key="oneMisc.id"
      >
        <img
          :src="oneMisc.image"
          width="20"
          height="30"
          :alt="oneMisc.name"
        />
        <p>
          <span>{{ oneMisc.name }}</span>
          <b>{{ oneMisc.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ getAddressText() }}</p>
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
      return this.dough?.find(
        ({ id }) => id.toString() === orderPizza.doughId.toString()
      );
    },

    getIngredients(orderPizza) {
      return this.ingredients?.filter(({ id }) => {
        return orderPizza.ingredients?.some(
          ({ ingredientId }) => id.toString() === ingredientId.toString()
        );
      });
    },

    getSauce(orderPizza) {
      return this.sauces?.find(
        ({ id }) => id.toString() === orderPizza.sauceId.toString()
      );
    },

    getSize(orderPizza) {
      return this.sizes?.find(
        ({ id }) => id.toString() === orderPizza.sizeId.toString()
      );
    },

    getMisc() {
      return this.misc?.filter(({ id }) =>
        this.order.orderMisc?.some(
          ({ miscId }) => id.toString() === miscId.toString()
        )
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
              ({ ingredientId }) =>
                ingredientId.toString() === ingredient.id.toString()
            )?.quantity ?? 1;
          return sum + ingredient.price * quantity;
        }, 0) ?? 0;

      return multiplier * (priceDough + priceSauce + priceIngredients);
    },

    costOfPizzaText(orderPizza) {
      return `${orderPizza.quantity} × ${this.calcCostOfOnePizza(orderPizza)}`;
    },

    calcTotalCostOfOrder() {
      const totalOfPizza = this.order.orderPizzas?.reduce(
        (sum, orderPizza) =>
          sum + this.calcCostOfOnePizza(orderPizza) * orderPizza.quantity,
        0
      );

      const totalOfMisc = this.getMisc()?.reduce((sum, misc) => {
        const quantity = this.order.orderMisc?.find(
          ({ miscId }) => miscId.toString() === misc.id.toString()
        )?.quantity;
        return sum + misc.price * quantity;
      }, 0);

      return totalOfPizza + totalOfMisc;
    },

    getAddressText() {
      return this.order?.orderAddress?.name ?? "Заберу сам";
    },

    deleteOrder(orderId) {
      this.$store.dispatch("Orders/delete", orderId);
    },

    repeatOrder(orderId) {
      this.$store.dispatch("Orders/repeatOrder", orderId);
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
