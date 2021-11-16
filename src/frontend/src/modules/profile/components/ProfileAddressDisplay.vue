<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №{{ counter }}. {{ address.name }}</b>
      <div class="address-form__edit">
        <AppIcon @click="$emit('editing')" data-test="change-address-button">
          Изменить адрес
        </AppIcon>
      </div>
    </div>

    <p>
      {{ address.street }}, д. {{ address.building }}, оф.
      {{ address.flat }}
    </p>
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressDisplay",

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
};
</script>

<style scoped></style>
