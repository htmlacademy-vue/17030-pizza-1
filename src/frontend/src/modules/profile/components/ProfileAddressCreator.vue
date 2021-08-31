<template>
  <form
    action="test.html"
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent="save"
    novalidate
  >
    <div class="address-form__header">
      <b>Адрес №{{ counter }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          ref="addrName"
          name="addr-name"
          placeholder="Введите название адреса"
          required
          :error-text="validations.name.error"
          v-model="localAddress.name"
        >
          Название адреса*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          name="addr-street"
          placeholder="Введите название улицы"
          required
          :error-text="validations.street.error"
          v-model="localAddress.street"
        >
          Улица*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          name="addr-house"
          placeholder="Введите номер дома"
          required
          :error-text="validations.building.error"
          v-model="localAddress.building"
        >
          Дом*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          name="addr-apartment"
          placeholder="Введите № квартиры"
          v-model="localAddress.flat"
        >
          Квартира
        </AppInput>
      </div>
      <div class="address-form__input">
        <AppInput
          name="addr-comment"
          placeholder="Введите комментарий"
          v-model="localAddress.comment"
        >
          Комментарий
        </AppInput>
      </div>
    </div>

    <div class="address-form__buttons">
      <AppButton mod-transparent @click.prevent="remove(localAddress.id)">
        Удалить
      </AppButton>
      <AppButton type="submit">Сохранить</AppButton>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validator } from "@/mixins";

export default {
  name: "ProfileAddressCreator",
  mixins: [validator],

  props: {
    counter: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      isNewAddress: !this.address.name,
      localAddress: this.address,
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
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

  watch: {
    "localAddress.name"() {
      this.$clearValidationErrors();
    },
    "localAddress.street"() {
      this.$clearValidationErrors();
    },
    "localAddress.building"() {
      this.$clearValidationErrors();
    },
  },

  mounted() {
    this.$refs.addrName.$refs.input.focus();
  },

  methods: {
    ...mapActions("Auth", ["postAddress", "putAddress", "deleteAddress"]),
    save() {
      if (
        !this.$validateFields(
          {
            name: this.localAddress.name,
            street: this.localAddress.street,
            building: this.localAddress.building,
          },
          this.validations
        )
      ) {
        return;
      }

      if (this.isNewAddress) {
        this.postAddress(this.localAddress);
      } else {
        this.putAddress(this.localAddress);
      }

      this.$emit("saved");
    },
    remove(id) {
      this.deleteAddress({ id, isNewAddress: this.isNewAddress });
    },
  },
};
</script>

<style scoped></style>
