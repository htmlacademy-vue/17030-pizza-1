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
      <b>Итого: {{ cartPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton>Оформить заказ</AppButton>
    </div>
  </section>
</template>

<script>
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "CartFooter",

  components: {
    AppButton,
  },

  props: {
    cartPrice: {
      type: Number,
      default: 0,
    },
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
