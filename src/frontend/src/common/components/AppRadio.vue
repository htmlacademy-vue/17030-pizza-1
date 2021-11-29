<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="changeHandler"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "AppRadio",

  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    checked: {
      type: [String, Number],
      required: true,
      default: "",
    },

    value: {
      type: [String, Number],
      required: true,
    },

    name: {
      type: String,
      default: "",
    },
  },

  computed: {
    isChecked() {
      return this.checked.toString() === this.value.toString();
    },
  },

  methods: {
    changeHandler(evt) {
      this.$emit("change", evt.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}
</style>
