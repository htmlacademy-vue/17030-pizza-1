<template>
  <div class="sign-form">
    <a href="#" class="close close--white" @click.prevent="$router.push('/')">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form
      action="test.html"
      method="post"
      @submit.prevent="sendForm"
      novalidate
    >
      <div class="sign-form__input">
        <AppInput
          ref="email"
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          :error-text="validations.email.error"
        >
          E-mail
        </AppInput>
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="pass"
          placeholder="***********"
          :error-text="validations.password.error"
        >
          Пароль
        </AppInput>
      </div>
      <AppButton type="submit">Авторизоваться</AppButton>
    </form>
  </div>
</template>

<script>
import { validator } from "@/mixins";

export default {
  name: "Login",
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
.sign-form {
  ::v-deep button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}
</style>
