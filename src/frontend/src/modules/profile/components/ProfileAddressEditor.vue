<template>
  <form
    action="test.html"
    method="post"
    class="address-form address-form--opened sheet"
  >
    <div class="address-form__header">
      <b>Адрес №1</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          v-model="addrName"
          type="text"
          name="addr-name"
          placeholder="Введите название адреса"
          required
        >
          Название адреса*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          v-model="addrStreet"
          type="text"
          name="addr-street"
          placeholder="Введите название улицы"
          required
        >
          Улица*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="addrHouse"
          type="text"
          name="addr-house"
          placeholder="Введите номер дома"
          required
        >
          Дом*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="addrApartment"
          type="text"
          name="addr-apartment"
          placeholder="Введите № квартиры"
        >
          Квартира
        </AppInput>
      </div>
      <div class="address-form__input">
        <AppInput
          v-model="addrComment"
          type="text"
          name="addr-comment"
          placeholder="Введите комментарий"
        >
          Комментарий
        </AppInput>
      </div>
    </div>

    <div class="address-form__buttons">
      <AppButton mod-transparent>Удалить</AppButton>
      <AppButton type="submit">Сохранить</AppButton>
    </div>
  </form>
</template>

<script>
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "ProfileAddressEditor",

  components: {
    AppInput,
    AppButton,
  },

  data() {
    return {
      addrName: "",
      addrStreet: "",
      addrHouse: "",
      addrApartment: "",
      addrComment: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.address-form__buttons {
  ::v-deep button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}
</style>
