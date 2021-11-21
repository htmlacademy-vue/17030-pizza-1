<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileUser v-if="user" :user="user" data-test="profile-user-component" />

    <div class="layout__address">
      <ProfileAddress
        v-for="(address, index) in addresses"
        :key="address.id"
        :counter="index + 1"
        :address="address"
        data-test="profile-address-component"
      />
    </div>

    <div class="layout__button">
      <AppButton
        mod-border
        @click.prevent="createNewAddress"
        data-test="create-new-address-button"
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
  middlewares: { auth },

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

<style lang="scss" scoped></style>
