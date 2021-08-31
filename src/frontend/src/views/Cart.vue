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
              <CartMiscItem
                class="sheet"
                v-for="miscItem in misc"
                :key="miscItem.name"
                :misc-item="miscItem"
                :misc-count="miscCounts[miscItem.type]"
              />
            </ul>
          </div>

          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select" v-model="receiving">
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

            <div v-if="isNotPickupReceiving" class="cart-form__address">
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
import CartMiscItem from "@/modules/cart/CartMiscItem.vue";
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
    CartMiscItem,
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
    ...mapState("Builder", ["pizza", "ingredients"]),
    ...mapState("Cart", ["products", "misc", "miscCounts"]),
    ...mapState("Auth", ["addresses", "user"]),
    hasProducts() {
      return this.products.length;
    },
    receiving: {
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
    isNotPickupReceiving() {
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
        } else {
          this.address = null;
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

  created() {
    this.$store.dispatch("Cart/fetchMisc");
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

      const userId = this.user?.id ?? null;
      const phone = this.phone;
      const address = this.address;
      const pizzas = this.products.map((pizza) => {
        const ingredients = this.ingredients
          .filter(({ type }) => pizza.ingredientCounts[type] > 0)
          .map(({ id, type }) => ({
            ingredientId: id,
            quantity: pizza.ingredientCounts[type],
          }));

        return {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.quantity,
          ingredients,
        };
      });
      const misc = this.misc
        .filter(({ type }) => this.miscCounts[type] > 0)
        .map(({ id, type }) => ({
          miscId: id,
          quantity: this.miscCounts[type],
        }));

      this.$store.dispatch("Orders/post", {
        userId,
        phone,
        address,
        pizzas,
        misc,
      });

      this.isPopupVisible = true;
    },
  },
};
</script>

<style scoped></style>
