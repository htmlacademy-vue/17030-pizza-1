<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="img/users/user5@2x.webp 1x, img/users/user5@4x.webp 2x"
      >
      <img
        :src="getUserAttribute('avatar')"
        srcset="img/users/user5@4x.jpg"
        :alt="getUserAttribute('name')"
        width="72"
        height="72"
      >
    </picture>
    <div class="user__name">
      <span>{{ getUserAttribute("name") }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ getUserAttribute("phone") }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileUser",

  props: {
    user: {
      type: Object,
      default() {
        return null;
      },
    },
  },

  computed: {
    ...mapGetters("Auth", ["getUserAttribute"]),
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
