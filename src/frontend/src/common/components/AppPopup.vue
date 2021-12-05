<template>
  <transition name="popup" @after-leave="afterLeave">
    <div v-if="localVisible" class="popup">
      <AppClose data-test="close-btn" @click.prevent="localVisible = false">
        Закрыть попап
      </AppClose>
      <a
        href="#"
        class="close"
        data-test="close-btn"
        @click.prevent="localVisible = false"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <AppTitle :level="2">
          <slot name="title" />
        </AppTitle>
      </div>
      <p>
        <slot name="default" />
      </p>

      <div class="popup__button">
        <AppButton tag="a" @click.prevent="localVisible = false">
          <slot name="action">Хорошо</slot>
        </AppButton>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppPopup",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localVisible: this.visible,
    };
  },

  watch: {
    visible(visible) {
      this.localVisible = visible;
    },
  },

  methods: {
    afterLeave() {
      this.$emit("close");
    },
  },
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
