<template>
  <div>
    <div class="layout__title">
      <AppTitle mod-text-big>Мои данные</AppTitle>
    </div>

    <ProfileUser v-if="user" :user="user" data-test="profile-user-component" />

    <ProfileAddress
      v-for="(address, index) in addresses"
      :key="address.id"
      :counter="index + 1"
      :address="address"
      data-test="profile-address-component"
    />

    <div class="layout__button">
      <AppButton
        mod-border
        data-test="create-new-address-button"
        @click.prevent="createNewAddress"
      >
        Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser.vue";
import ProfileAddress from "@/modules/profile/components/ProfileAddress.vue";
import { mapActions, mapState } from "vuex";
import { auth } from "@/middlewares";

export default {
  name: "Profile",
  layout: "AppLayoutMain",
  middlewares: [auth],

  components: {
    ProfileUser,
    ProfileAddress,
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Auth", ["addresses"]),
  },

  created() {
    this.queryAddresses();
  },

  methods: {
    ...mapActions("Auth", ["queryAddresses", "createNewAddress"]),
  },
};
</script>

<style lang="scss" scoped>
.layout__button ::v-deep button {
  padding: 12px 23px;
}
</style>
