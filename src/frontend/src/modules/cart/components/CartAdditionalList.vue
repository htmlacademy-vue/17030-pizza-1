<template>
  <ul class="additional-list">
    <li
      v-for="miscItem in misc"
      :key="miscItem.name"
      class="additional-list__item sheet"
      data-test="cart-misc-item"
    >
      <p class="additional-list__description">
        <img
          :src="miscItem.image"
          :alt="miscItem.name"
          width="39"
          height="60"
        >
        <span>{{ miscItem.name }}</span>
      </p>

      <div class="additional-list__wrapper">
        <AppCounter
          :value="getMiscQuantity(miscItem.id)"
          :min="0"
          class="additional-list__counter"
          plus-color-modifier-class="counter__button--orange"
          data-test="misc-counter"
          @input="changeMiscCount(miscItem.id, $event)"
        />

        <div class="additional-list__price">
          <b>{{ miscItem.price }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import AppCounter from "@/common/components/AppCounter";
import { mapActions } from "vuex";

export default {
  name: "CartAdditionalList",

  components: {
    AppCounter,
  },

  props: {
    misc: {
      type: Array,
      default() {
        return [];
      },
    },

    cartOrder: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    ...mapActions("Cart", ["updateMiscCount"]),

    getMiscQuantity(id) {
      return (
        this.cartOrder?.misc?.find(
          ({ miscId }) => miscId.toString() === id.toString()
        )?.quantity ?? 0
      );
    },

    changeMiscCount(miscId, quantity) {
      this.updateMiscCount({ miscId, quantity });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
