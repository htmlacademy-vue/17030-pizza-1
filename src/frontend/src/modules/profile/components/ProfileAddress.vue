<template>
  <component
    :is="componentName"
    :counter="counter"
    :address="address"
    @edit="edit"
    @save="save"
  />
</template>

<script>
import ProfileAddressCreator from "@/modules/profile/components/ProfileAddressCreator.vue";
import ProfileAddressDisplay from "@/modules/profile/components/ProfileAddressDisplay.vue";

export default {
  name: "ProfileAddress",

  components: {
    ProfileAddressDisplay,
    ProfileAddressCreator,
  },

  props: {
    counter: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      isDisplayMode: false,
    };
  },

  computed: {
    componentName() {
      return this.isDisplayMode
        ? "ProfileAddressDisplay"
        : "ProfileAddressCreator";
    },
  },

  created() {
    if (this.address.name) {
      this.isDisplayMode = true;
    }
  },

  methods: {
    edit() {
      this.isDisplayMode = false;
    },
    save() {
      this.isDisplayMode = true;
    },
  },
};
</script>

<style scoped></style>
