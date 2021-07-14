<template>
  <div @drop.stop="dropHandler" @dragenter.prevent @dragover.prevent>
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "AppDrop",

  methods: {
    dropHandler({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }

      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);

      if (payload) {
        const transferData = JSON.parse(payload);
        this.$emit("drop", transferData);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
