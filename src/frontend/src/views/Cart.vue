<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="checkout"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="hasProducts">
          <ul class="cart-list sheet">
            <CartItem v-for="pizza in pizzas" :key="pizza.id" :pizza="pizza" />
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <CartAdditionalItem
                class="sheet"
                v-for="additionalItem in additional"
                :key="additionalItem.name"
                :additional-item="additionalItem"
                :additional-count="additionalCounts[additionalItem.type]"
              />
            </ul>
          </div>

          <CartForm />
        </template>

        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>

    <CartFooter v-if="hasProducts" />

    <AppPopup v-if="isPopupVisible" @close-popup="isPopupVisible = false">
      <template v-slot:title>Спасибо за заказ</template>
      <template v-slot:default>
        Мы начали готовить Ваш заказ, скоро привезём его вам ;)
      </template>
      <template v-slot:action>Отлично, я жду!</template>
    </AppPopup>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartItem from "@/modules/cart/CartItem.vue";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem.vue";
import CartFooter from "@/modules/cart/CartFooter.vue";
import CartForm from "@/modules/cart/CartForm.vue";

export default {
  name: "Cart",

  components: {
    CartItem,
    CartAdditionalItem,
    CartForm,
    CartFooter,
  },

  data() {
    return {
      isPopupVisible: false,
    };
  },

  computed: {
    ...mapState("Cart", ["pizzas", "additional", "additionalCounts"]),
    hasProducts() {
      return this.pizzas.length || 1;
    },
  },

  methods: {
    ...mapActions("Cart", ["showPopup"]),
    checkout() {
      this.isPopupVisible = true;
    },
  },
};
</script>

<style scoped></style>
