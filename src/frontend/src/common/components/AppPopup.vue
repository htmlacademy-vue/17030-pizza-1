<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="$emit('close-popup')">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">
        <slot name="title" />
      </h2>
    </div>
    <p>
      <slot name="default" />
    </p>

    <div class="popup__button">
      <AppButton tag="a" @click.prevent="$emit('close-popup')">
        <slot name="action">Хорошо</slot>
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopup",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  ::v-deep a {
    padding: 16px 32px;
  }
}
</style>
