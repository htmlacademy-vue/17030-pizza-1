<template>
  <label class="dough__input">
    <input
      type="radio"
      name="dough"
      :value="value"
      :checked="isChecked"
      class="visually-hidden"
      @change="changeHandler"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "BuilderDoughRadio",

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

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
