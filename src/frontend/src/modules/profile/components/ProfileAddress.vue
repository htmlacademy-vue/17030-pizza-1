<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №1. Тест</b>
      <div class="address-form__edit">
        <AppIcon>Изменить адрес</AppIcon>
      </div>
    </div>
    <p>Невский пр., д. 22, оф. 46</p>
    <small>Позвоните, пожалуйста, от проходной</small>
  </div>
</template>

<script>
import AppIcon from "@/common/components/AppIcon.vue";

export default {
  name: "ProfileAddress",

  components: {
    AppIcon,
  },
};
</script>

<style scoped></style>
