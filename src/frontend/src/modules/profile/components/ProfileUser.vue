<template>
  <div v-if="user" class="user">
    <picture>
      <source
        type="image/webp"
        srcset="img/users/user5@2x.webp 1x, img/users/user5@4x.webp 2x"
      />
      <img
        :src="getUserAttribute('avatar')"
        srcset="img/users/user5@4x.jpg"
        :alt="getUserAttribute('name')"
        width="72"
        height="72"
      />
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
import { mapGetters, mapState } from "vuex";

export default {
  name: "ProfileUser",

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["getUserAttribute"]),
  },
};
</script>

<style scoped></style>
