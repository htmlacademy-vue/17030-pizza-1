<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="hasProducts">
          <CartItemsList
            :cart-products="cartProducts"
            @update-product-count="$emit('update-product-count', $event)"
            @edit-product="$emit('edit-product', $event)"
          />

          <div class="cart__additional">
            <CartAdditional
              :additional="additional"
              :additional-counts="additionalCounts"
              @update-additional-count="
                $emit('update-additional-count', $event)
              "
            />
          </div>

          <div class="cart__form">
            <CartForm />
          </div>
        </template>
        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>

    <CartFooter v-if="hasProducts" :cart-price="cartPrice" />
  </form>
</template>

<script>
import CartItemsList from "@/modules/cart/componentns/CartItemsList.vue";
import CartAdditional from "@/modules/cart/componentns/CartAdditional.vue";
import CartForm from "@/modules/cart/componentns/CartForm.vue";
import CartFooter from "@/modules/cart/componentns/CartFooter.vue";

export default {
  name: "Cart",

  components: {
    CartItemsList,
    CartAdditional,
    CartForm,
    CartFooter,
  },

  props: {
    cartProducts: {
      type: Array,
      required: true,
    },
    additional: {
      type: Array,
      required: true,
    },
    additionalCounts: {
      type: Object,
      required: true,
    },
    cartPrice: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    hasProducts() {
      return !!this.cartProducts.length;
    },
  },
};
</script>

<style scoped></style>
