<template>
  <form
    action="test.html"
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent="save"
  >
    <div class="address-form__header">
      <b>Адрес №{{ counter }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          name="addr-name"
          placeholder="Введите название адреса"
          required
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
          v-model="localAddress.house"
        >
          Дом*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          name="addr-apartment"
          placeholder="Введите № квартиры"
          v-model="localAddress.apartment"
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

export default {
  name: "ProfileAddressCreator",

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
      localAddress: { ...this.address },
    };
  },

  methods: {
    ...mapActions("Auth", ["saveAddress", "removeAddress"]),
    save() {
      this.saveAddress(this.localAddress);
      this.$emit("save");
    },
    remove(id) {
      this.removeAddress(id);
    },
  },
};
</script>

<style scoped></style>
