<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileUser v-if="user" :user="user" />

    <div class="layout__address">
      <ProfileAddress
        v-for="(address, index) in addresses"
        :key="address.id"
        :counter="index + 1"
        :address="address"
      />
    </div>

    <div class="layout__button">
      <AppButton mod-border @click.prevent="createNewAddress"
        >Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser.vue";
import ProfileAddress from "@/modules/profile/components/ProfileAddress.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",

  components: {
    ProfileUser,
    ProfileAddress,
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Auth", ["addresses"]),
  },

  created() {
    this.$store.dispatch("Auth/queryAddresses");
  },

  methods: {
    ...mapActions("Auth", ["createNewAddress"]),
  },
};
</script>

<style lang="scss" scoped></style>
