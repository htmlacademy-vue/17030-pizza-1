<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №{{ counter }}. {{ address.name }}</b>
      <div class="address-form__edit">
        <AppIcon @click="$emit('edit')">Изменить адрес</AppIcon>
      </div>
    </div>

    <p>
      {{ address.street }}, д. {{ address.house }}, оф.
      {{ address.apartment }}
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
