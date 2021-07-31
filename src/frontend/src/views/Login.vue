<template>
  <div class="sign-form">
    <a href="#" class="close close--white" @click.prevent="$router.push('/')">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="test.html" method="post">
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
        >
          E-mail
        </AppInput>
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="pass"
          type="password"
          name="pass"
          placeholder="***********"
        >
          Пароль
        </AppInput>
      </div>
      <AppButton type="submit" @click.prevent="$emit('login')">
        Авторизоваться
      </AppButton>
    </form>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "Login",

  components: {
    AppInput,
    AppButton,
  },

  data() {
    return {
      email: "",
      pass: "",
    };
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
