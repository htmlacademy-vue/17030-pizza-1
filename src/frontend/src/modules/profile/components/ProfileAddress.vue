<template>
  <div class="layout__address">
    <div
      v-if="isDisplayMode"
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{ counter }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <AppIcon
            data-test="change-address-button"
            @click="edit"
          >
            Изменить адрес
          </AppIcon>
        </div>
      </div>

      <p>
        {{ address.street }}, д. {{ address.building }}, оф.
        {{ address.flat }}
      </p>
      <small>{{ address.comment }}</small>
    </div>

    <form
      v-else
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
      novalidate
      @submit.prevent="save"
    >
      <div class="address-form__header">
        <b>Адрес №{{ counter }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            ref="addrName"
            v-model="localAddress.name"
            name="addr-name"
            placeholder="Введите название адреса"
            :error-text="validations.name.error"
            data-test="addr-name"
            required
          >
            Название адреса*
          </AppInput>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            v-model="localAddress.street"
            name="addr-street"
            placeholder="Введите название улицы"
            :error-text="validations.street.error"
            data-test="addr-street"
            required
          >
            Улица*
          </AppInput>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="localAddress.building"
            name="addr-house"
            placeholder="Введите номер дома"
            :error-text="validations.building.error"
            data-test="addr-house"
            required
          >
            Дом*
          </AppInput>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="localAddress.flat"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            data-test="addr-apartment"
          >
            Квартира
          </AppInput>
        </div>
        <div class="address-form__input">
          <AppInput
            v-model="localAddress.comment"
            name="addr-comment"
            placeholder="Введите комментарий"
          >
            Комментарий
          </AppInput>
        </div>
      </div>

      <div class="address-form__buttons">
        <AppButton
          mod-transparent
          data-test="remove-button"
          @click.prevent="remove(localAddress.id)"
        >
          Удалить
        </AppButton>
        <AppButton
          type="submit"
          data-test="save-button"
        >
          Сохранить
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script>
import { validator } from "@/mixins";
import { mapActions } from "vuex";

export default {
  name: "ProfileAddress",

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
      isDisplayMode: false,
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

  created() {
    if (this.address.name) {
      this.isDisplayMode = true;
    }
  },

  mounted() {
    if (!this.isDisplayMode) {
      this.$refs.addrName.$refs.input.focus();
    }
  },

  methods: {
    ...mapActions("Auth", ["postAddress", "putAddress", "deleteAddress"]),
    remove(id) {
      this.deleteAddress({ id, isNewAddress: this.isNewAddress });
    },
    async edit() {
      this.isDisplayMode = false;
      await this.$nextTick();
      this.$refs.addrName.$refs.input.focus();
    },
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

      this.isDisplayMode = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
