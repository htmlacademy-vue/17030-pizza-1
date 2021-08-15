<template>
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
      v-model="tel"
      mod-big-label
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
          required
          >Улица*
        </AppInput>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          name="house"
          v-model="address.house"
          :readonly="isAddressFromProfile"
          required
          >Дом*
        </AppInput>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          name="apartment"
          v-model="address.apartment"
          :readonly="isAddressFromProfile"
          >Квартира
        </AppInput>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const newAddress = () => {
  return {
    street: "",
    house: "",
    apartment: "",
  };
};

export default {
  name: "CartForm",

  data() {
    return {
      receivingMethod: "pickup",
      tel: "",
      isAddressFromProfile: false,
      address: null,
    };
  },

  computed: {
    ...mapState("Auth", ["addresses"]),
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
};
</script>

<style scoped></style>
