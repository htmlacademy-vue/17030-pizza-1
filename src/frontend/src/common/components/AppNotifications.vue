<template>
  <div v-if="notifications.length" class="notifications-wrapper">
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppNotifications",

  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss">
.notifications-wrapper {
  position: fixed;
  z-index: 9999;
  top: 61px;
  right: 0;

  width: 420px;
  padding: 10px;
}

.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;

  text-align: center;

  color: $white;

  &--info {
    background: $blue-600;
  }

  &--error {
    background: $red-800;
  }

  &--success {
    background: $green-600;
  }

  &--warning {
    background: $orange-100;
  }
}
</style>
