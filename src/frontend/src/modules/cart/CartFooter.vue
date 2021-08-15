<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton tag="a" mod-border mod-arrow @click.prevent="$router.push('/')"
        >Хочу еще одну
      </AppButton>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton type="submit">Оформить заказ</AppButton>
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
};
</script>

<style lang="scss" scoped>
.footer__more {
  ::v-deep a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__submit {
  ::v-deep button {
    padding: 16px 14px;
  }
}
</style>
