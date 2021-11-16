<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="checkout"
    novalidate
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="hasProducts">
          <ul class="cart-list sheet">
            <CartProductItem
              v-for="pizza in cartOrder.pizzas"
              :key="pizza.id"
              :pizza="pizza"
              data-test="cart-product-item"
            />
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <CartMiscItem
                class="sheet"
                v-for="miscItem in misc"
                :key="miscItem.name"
                :misc-item="miscItem"
                :misc-quantity="getMiscQuantity(miscItem.id)"
                data-test="cart-misc-item"
              />
            </ul>
          </div>

          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                v-model="receiving"
                data-test="select-receiving"
              >
                <option value="pickup">Заберу сам</option>
                <option value="new-address">Новый адрес</option>
                <option
                  v-for="address in addresses"
                  :key="address.id"
                  :value="address.id"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <AppInput
              name="tel"
              placeholder="+7 999-999-99-99"
              v-model="cartOrder.phone"
              mod-big-label
              :error-text="validations.phone.error"
              required
              data-test="tel"
            >
              Контактный телефон:
            </AppInput>

            <div
              v-if="isNotPickupReceiving"
              class="cart-form__address"
              data-test="delivery-address-form"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <AppInput
                  name="street"
                  v-model="cartOrder.address.street"
                  :readonly="isAddressFromProfile"
                  :error-text="validations.street.error"
                  required
                  data-test="street"
                  >Улица*
                </AppInput>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  name="house"
                  v-model="cartOrder.address.building"
                  :readonly="isAddressFromProfile"
                  :error-text="validations.building.error"
                  required
                  data-test="house"
                  >Дом*
                </AppInput>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  name="apartment"
                  v-model="cartOrder.address.flat"
                  :readonly="isAddressFromProfile"
                  data-test="apartment"
                >
                  Квартира
                </AppInput>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="sheet cart__empty" data-test="cart-empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>

    <CartFooter v-if="hasProducts" data-test="cart-footer" />

    <AppPopup :visible="isPopupVisible" @close="closePopup" data-test="popup">
      <template #title>Спасибо за заказ</template>
      <template #default>
        Мы начали готовить Ваш заказ, скоро привезём его вам ;)
      </template>
      <template #action>Отлично, я жду!</template>
    </AppPopup>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartProductItem from "@/modules/cart/components/CartProductItem.vue";
import CartMiscItem from "@/modules/cart/components/CartMiscItem.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import { validator } from "@/mixins";

const newAddress = () => {
  return {
    street: "",
    building: "",
    flat: "",
    comment: "",
  };
};

export default {
  name: "Cart",
  mixins: [validator],

  components: {
    CartProductItem,
    CartMiscItem,
    CartFooter,
  },

  data() {
    return {
      isPopupVisible: false,
      isAddressFromProfile: false,
      validations: null,
      validationCommon: {
        phone: {
          error: "",
          rules: ["required", "phone"],
        },
      },
      validationAddress: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  computed: {
    ...mapState("Builder", ["pizza", "ingredients"]),
    ...mapState("Cart", ["cartOrder", "misc", "receivingMethodValue"]),
    ...mapState("Auth", ["addresses", "user"]),

    hasProducts() {
      return this.cartOrder.pizzas.length;
    },

    receiving: {
      get() {
        return this.receivingMethodValue;
      },
      set(val) {
        this.setReceivingMethod(val);

        const address = this.addresses.find(
          ({ id }) => id.toString() === val.toString()
        );

        if (this.isNotPickupReceiving) {
          if (address) {
            this.isAddressFromProfile = true;
            this.setAddressToCartOrder(address);
          } else {
            this.isAddressFromProfile = false;
            this.setAddressToCartOrder(newAddress());
          }
        } else {
          this.setAddressToCartOrder(null);
        }
      },
    },

    isNotPickupReceiving() {
      return this.receivingMethodValue !== "pickup";
    },
  },

  watch: {
    receivingMethodValue: {
      immediate: true,
      handler() {
        let result = this.validationCommon;

        if (this.receivingMethodValue !== "pickup") {
          result = { ...result, ...this.validationAddress };
        } else {
          this.address = null;
        }

        this.validations = result;
      },
    },
    "cartOrder.phone"() {
      this.$clearValidationErrors();
    },
    "cartOrder.address.street"() {
      this.$clearValidationErrors();
    },
    "cartOrder.address.building"() {
      this.$clearValidationErrors();
    },
  },

  created() {
    this.$store.dispatch("Cart/fetchMisc");
  },

  methods: {
    ...mapActions("Cart", [
      "setUserIdToCartOrder",
      "resetState",
      "setReceivingMethod",
      "setAddressToCartOrder",
    ]),
    ...mapActions("Builder", ["createNewPizza"]),

    getMiscQuantity(id) {
      return (
        this.cartOrder.misc?.find(
          ({ miscId }) => miscId.toString() === id.toString()
        )?.quantity ?? 0
      );
    },

    async checkout() {
      if (
        !this.$validateFields(
          {
            phone: this.cartOrder.phone,
            street: this.cartOrder.address?.street,
            building: this.cartOrder.address?.building,
          },
          this.validations
        )
      ) {
        return;
      }

      if (this.user && !this.cartOrder.userId) {
        this.setUserIdToCartOrder(this.user?.id);
      }

      await this.$store.dispatch("Orders/post", this.cartOrder);
      this.isPopupVisible = true;
    },

    closePopup() {
      this.isPopupVisible = false;
      this.resetState();
      this.createNewPizza();

      if (this.user) {
        this.$router.push("/orders");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped></style>
