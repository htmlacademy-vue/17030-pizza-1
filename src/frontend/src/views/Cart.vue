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
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
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

          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select" v-model="receivingMethodComp">
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
              v-model="phone"
              mod-big-label
              :error-text="validations.phone.error"
              required
            >
              Контактный телефон:
            </AppInput>

            <div v-if="isAddressFormVisible" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <AppInput
                  name="street"
                  v-model="address.street"
                  :readonly="isAddressFromProfile"
                  :error-text="validations.street.error"
                  required
                  >Улица*
                </AppInput>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  name="house"
                  v-model="address.building"
                  :readonly="isAddressFromProfile"
                  :error-text="validations.building.error"
                  required
                  >Дом*
                </AppInput>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  name="apartment"
                  v-model="address.flat"
                  :readonly="isAddressFromProfile"
                  >Квартира
                </AppInput>
              </div>
            </div>
          </div>
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
import { mapState } from "vuex";
import CartProductItem from "@/modules/cart/CartProductItem.vue";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem.vue";
import CartFooter from "@/modules/cart/CartFooter.vue";
import { validator } from "@/mixins";

const newAddress = () => {
  return {
    street: "",
    building: "",
    flat: "",
  };
};

export default {
  name: "Cart",
  mixins: [validator],

  components: {
    CartProductItem,
    CartAdditionalItem,
    CartFooter,
  },

  data() {
    return {
      receivingMethod: "pickup",
      phone: "",
      address: null,
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
    ...mapState("Cart", ["products", "additional", "additionalCounts"]),
    ...mapState("Auth", ["addresses"]),
    hasProducts() {
      return this.products.length;
    },
    receivingMethodComp: {
      get() {
        return this.receivingMethod;
      },
      set(val) {
        const address = this.addresses.find(({ id }) => +id === +val);

        if (address) {
          this.address = { ...address };
          this.isAddressFromProfile = true;
        } else {
          this.address = newAddress();
          this.isAddressFromProfile = false;
        }

        this.receivingMethod = val;
      },
    },
    isAddressFormVisible() {
      return this.receivingMethod !== "pickup";
    },
  },

  watch: {
    receivingMethod: {
      immediate: true,
      handler() {
        let result = this.validationCommon;

        if (this.receivingMethod !== "pickup") {
          result = { ...result, ...this.validationAddress };
        }

        this.validations = result;
      },
    },
    phone() {
      this.$clearValidationErrors();
    },
    "address.street"() {
      this.$clearValidationErrors();
    },
    "address.building"() {
      this.$clearValidationErrors();
    },
  },

  methods: {
    checkout() {
      if (
        !this.$validateFields(
          {
            phone: this.phone,
            street: this.address?.street,
            building: this.address?.building,
          },
          this.validations
        )
      ) {
        return;
      }

      this.isPopupVisible = true;
    },
  },
};
</script>

<style scoped></style>
