<script>
export default {
  name: "AppButton",

  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modTransparent: {
      type: Boolean,
      default: false,
    },
    modBorder: {
      type: Boolean,
      default: false,
    },
    modArrow: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modifiersClass() {
      return {
        "button--transparent": this.modTransparent,
        "button--border": this.modBorder,
        "button--arrow": this.modArrow,
      };
    },
  },

  render(createElement) {
    return createElement(
      this.tag,
      {
        class: ["button", this.modifiersClass],
        attrs: {
          href: this.tag === "a" ? this.$attrs.href : null,
          type: this.tag === "button" ? this.type : null,
          disabled: this.tag === "button" ? this.disabled : null,
        },
        on: this.$listeners,
      },
      this.$slots.default
    );
  },
};
</script>

<style lang="scss" scoped></style>
