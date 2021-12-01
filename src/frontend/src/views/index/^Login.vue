<template>
  <transition appear name="popup">
    <div class="sign-form">
      <AppClose
        data-test="close-button"
        mod-white
        @click.prevent="$router.push('/')"
      >
        Закрыть форму авторизации
      </AppClose>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form
        action="test.html"
        method="post"
        novalidate
        @submit.prevent="sendForm"
      >
        <div class="sign-form__input">
          <AppInput
            ref="email"
            v-model="email"
            :error-text="validations.email.error"
            data-test="email-component"
            name="email"
            placeholder="example@mail.ru"
            type="email"
          >
            E-mail
          </AppInput>
        </div>

        <div class="sign-form__input">
          <AppInput
            v-model="password"
            :error-text="validations.password.error"
            data-test="password-component"
            name="pass"
            placeholder="***********"
            type="password"
          >
            Пароль
          </AppInput>
        </div>
        <AppButton type="submit">Авторизоваться</AppButton>
      </form>
    </div>
  </transition>
</template>

<script>
import { validator } from "@/mixins";
import { isLoggedIn } from "@/middlewares";

export default {
  name: "Login",
  notAnimate: true,
  middlewares: { isLoggedIn },
  mixins: [validator],

  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  watch: {
    email() {
      this.$clearValidationErrors();
    },

    password() {
      this.$clearValidationErrors();
    },
  },

  mounted() {
    this.$refs.email.$refs.input.focus();
  },

  methods: {
    async sendForm() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  ::v-deep button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.5s;
}

.popup-enter {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}

.popup-leave-to {
  transform: translate(-50%, -50%) scale(1.2);
  opacity: 0;
}
</style>
