<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          srcset="
            @/assets/img/users/user5@2x.webp 1x,
            @/assets/img/users/user5@4x.webp 2x
          "
        />
        <img
          src="@/assets/img/users/user5@2x.jpg"
          srcset="@/assets/img/users/user5@4x.jpg"
          alt="Василий Ложкин"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div class="layout__address">
      <ProfileAddress />
    </div>

    <div class="layout__address">
      <ProfileAddressEditor />
    </div>

    <div class="layout__button">
      <AppButton mod-border>Добавить новый адрес</AppButton>
    </div>
  </div>
</template>

<script>
import ProfileAddressEditor from "@/modules/profile/components/ProfileAddressEditor.vue";
import ProfileAddress from "@/modules/profile/components/ProfileAddress.vue";
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "Profile",

  components: {
    AppButton,
    ProfileAddress,
    ProfileAddressEditor,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.layout__button {
  ::v-deep button {
    padding: 12px 23px;
  }
}
</style>
