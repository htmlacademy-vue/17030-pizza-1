<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton
        tag="a"
        mod-border
        mod-arrow
        data-test="want-another-button"
        @click.prevent="wantAnother"
      >
        Хочу еще одну
      </AppButton>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br>чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton
        type="submit"
        data-test="checkout-button"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",

  computed: {
    ...mapGetters("Cart", ["totalPrice"]),
  },

  methods: {
    wantAnother() {
      this.$store.dispatch("Builder/createNewPizza");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  ::v-deep a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  ::v-deep button {
    padding: 16px 14px;
  }
}
</style>
