<template>
  <div id="app">
    <AppLayout
      :cart-price="cartPrice"
      :user="user"
      :is-logged="isLogged"
      @logout="isLogged = false"
    >
      <router-view
        v-bind="routeProps"
        @update-sauce="updatedSauce"
        @update-size="updatedSize"
        @update-dough="updatedDough"
        @update-filling="updateFilling"
        @drop-filling="dropFilling"
        @update-product-count="updateProductCount"
        @update-additional-count="updateAdditionalCount"
        @edit-product="editProduct"
        @add-to-cart="addingToCart"
        @login="isLogged = true"
      />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import user from "@/static/user.json";
import misc from "@/static/misc.json";
import {
  normalizeDough,
  normalizeFilling,
  normalizeMisc,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers.js";
import {
  DOUGH_TYPES,
  FILLING_TYPES,
  MISC_ITEMS,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants.js";
import { cloneDeep } from "lodash";
import pizza from "@/static/pizza.json";

const createNewPizza = () => ({
  name: "",
  dough: null,
  doughValue: DOUGH_TYPES[0].value,
  size: null,
  sizeValue: SIZE_TYPES[0].value,
  sauce: null,
  sauceValue: SAUCE_TYPES[0].value,
  fillings: [],
  fillingCounts: pizza.ingredients.reduce((obj, { name }) => {
    const type = FILLING_TYPES.find(({ label }) => name === label)?.value;
    obj[type] = 0;

    return obj;
  }, {}),
  price: 0,
  count: 1,
});

export default {
  name: "App",

  components: {
    AppLayout,
  },

  data() {
    return {
      user,
      isLogged: false,
      cartProducts: [],
      pizza: createNewPizza(),
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      sizes: pizza.sizes.map((size) => normalizeSize(size)),
      dough: pizza.dough.map((item) => normalizeDough(item)),
      fillings: pizza.ingredients.map((filling) => normalizeFilling(filling)),
      additional: misc.map((miscItem) => normalizeMisc(miscItem)),
      additionalCounts: MISC_ITEMS.reduce((obj, { value }) => {
        obj[value] = 0;
        return obj;
      }, {}),
    };
  },

  computed: {
    routeProps() {
      const routes = {
        IndexHome: {
          pizza: this.pizza,
          sauces: this.sauces,
          sizes: this.sizes,
          dough: this.dough,
          fillings: this.fillings,
        },
        Cart: {
          cartProducts: this.cartProducts,
          additional: this.additional,
          additionalCounts: this.additionalCounts,
          cartPrice: this.cartPrice,
        },
        Profile: {
          user: this.user,
        },
      };

      let routeName = this.$route.name;

      if (routeName === "Login") {
        routeName = "IndexHome";
      }

      return routes[routeName] || {};
    },
    cartPrice() {
      return this.productsPrice + this.additionalProductsPrice;
    },
    productsPrice() {
      return this.cartProducts.reduce((sum, product) => {
        sum += product.count * product.price;
        return sum;
      }, 0);
    },
    additionalProductsPrice() {
      return this.additional
        .filter(({ slug }) => this.additionalCounts[slug] !== 0)
        .reduce((sum, { slug, price }) => {
          sum += this.additionalCounts[slug] * price;
          return sum;
        }, 0);
    },
  },

  mounted() {
    this.updatePizzaComponents();
  },

  methods: {
    updatePizzaComponents() {
      this.updatedDough(this.pizza.doughValue);
      this.updatedSauce(this.pizza.sauceValue);
      this.updatedSize(this.pizza.sizeValue);
    },
    addingToCart(price) {
      this.pizza.price = price;
      this.cartProducts.push(cloneDeep(this.pizza));
      this.$set(this, "pizza", createNewPizza());

      this.updatePizzaComponents();
    },
    updatedDough(doughValue) {
      const pizza = cloneDeep(this.pizza);

      pizza.doughValue = doughValue;
      pizza.dough = this.dough.find(({ type }) => type === doughValue);
      this.$set(this, "pizza", pizza);
    },
    updatedSize(sizeValue) {
      const pizza = cloneDeep(this.pizza);

      pizza.sizeValue = sizeValue;
      pizza.size = this.sizes.find(({ type }) => type === sizeValue);
      this.$set(this, "pizza", pizza);
    },
    updatedSauce(sauceValue) {
      const pizza = cloneDeep(this.pizza);

      pizza.sauceValue = sauceValue;
      pizza.sauce = this.sauces.find(({ type }) => type === sauceValue);
      this.$set(this, "pizza", pizza);
    },
    updateFilling({ slug, value }) {
      this.$set(this.pizza, "fillingCounts", {
        ...this.pizza.fillingCounts,
        [slug]: value,
      });
      const filteredFillings = this.fillings.filter(
        ({ type }) => this.pizza.fillingCounts[type] !== 0
      );
      this.$set(this.pizza, "fillings", filteredFillings);
    },
    dropFilling(filling) {
      this.pizza.fillingCounts[filling.type] += 1;
    },
    updateProductCount({ productName, value }) {
      const index = this.cartProducts.findIndex(
        ({ name }) => name === productName
      );

      if (~index) {
        const product = cloneDeep(this.cartProducts[index]);
        product.count = value;
        this.$set(this.cartProducts, index, product);
      }
    },
    updateAdditionalCount({ slug, value }) {
      this.additionalCounts[slug] = value;
    },
    editProduct(productName) {
      const index = this.cartProducts.findIndex(
        ({ name }) => name === productName
      );

      if (~index) {
        this.$set(this, "pizza", cloneDeep(this.cartProducts[index]));
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
