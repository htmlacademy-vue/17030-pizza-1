<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    novalidate
    @submit.prevent="checkout"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle mod-text-big>Корзина</AppTitle>
        </div>

        <template v-if="hasProducts">
          <CartPizzaList :pizzas="cartOrder.pizzas" />

          <div class="cart__additional">
            <CartAdditionalList
              :misc="misc"
              :cartOrder="cartOrder"
            />
          </div>

          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                v-model="receiving"
                name="test"
                class="select"
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
              v-model="cartOrder.phone"
              name="tel"
              placeholder="+7 999-999-99-99"
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
                  v-model="cartOrder.address.street"
                  name="street"
                  :readonly="isAddressFromProfile"
                  :error-text="validations.street.error"
                  required
                  data-test="street"
                  >Улица*
                </AppInput>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  v-model="cartOrder.address.building"
                  name="house"
                  :readonly="isAddressFromProfile"
                  :error-text="validations.building.error"
                  required
                  data-test="house"
                >
                  Дом*
                </AppInput>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  v-model="cartOrder.address.flat"
                  name="apartment"
                  :readonly="isAddressFromProfile"
                  data-test="apartment"
                >
                  Квартира
                </AppInput>
              </div>
            </div>
          </div>
        </template>

        <div
          v-else
          class="sheet cart__empty"
          data-test="cart-empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>

    <CartFooter
      v-if="hasProducts"
      data-test="cart-footer"
    />

    <AppPopup
      :visible="isPopupVisible"
      data-test="popup"
      @close="closePopup"
    >
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
import CartPizzaList from "@/modules/cart/components/CartPizzaList.vue";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList.vue";
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
    CartPizzaList,
    CartFooter,
    CartAdditionalList,
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
    ...mapActions("Builder", ["createNewPizza"]),

    ...mapActions("Cart", [
      "setUserIdToCartOrder",
      "resetState",
      "setReceivingMethod",
      "setAddressToCartOrder",
    ]),

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

<style lang="scss" scoped>
.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
