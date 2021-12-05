<script>
export default {
  name: "AppTitle",

  props: {
    level: {
      type: Number,
      default: 1,
      validator(value) {
        const permittedLevels = [1, 2, 3, 4, 5, 6];
        return permittedLevels.includes(value);
      },
    },

    modTextBig: {
      type: Boolean,
      default: false,
    },

    modTextSmall: {
      type: Boolean,
      default: false,
    },
  },

  render(createElement) {
    return createElement(
      `h${this.level}`,
      {
        class: {
          title: true,
          "title--big": this.modTextBig,
          "title--small": this.modTextSmall,
        },
      },
      this.$slots.default
    );
  },
};
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}
</style>
