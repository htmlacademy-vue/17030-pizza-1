<template>
  <div draggable="true" @dragstart.self="dragstartHandler">
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants";

export default {
  name: "AppDrag",

  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    dragstartHandler({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>
