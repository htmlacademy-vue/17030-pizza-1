<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough-value="pizza.doughValue"
            :dough-list="dough"
            @update-dough="$emit('update-dough', $event)"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :size-value="pizza.sizeValue"
            :sizes-list="sizes"
            @update-size="$emit('update-size', $event)"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :sauce-value="pizza.sauceValue"
            :sauces-list="sauces"
            :fillings-list="fillings"
            :filling-counts="pizza.fillingCounts"
            @update-sauce="$emit('update-sauce', $event)"
            @update-filling="$emit('update-filling', $event)"
          />
        </div>

        <div class="content__pizza">
          <AppInput
            v-model="pizza.name"
            :is-visible-caption="false"
            name="pizza_name"
            placeholder="Введите название пиццы"
          >
            Название пиццы
          </AppInput>

          <div class="content__constructor">
            <BuilderPizzaView
              :pizza="pizza"
              :fillings-list="fillings"
              @drop-filling="$emit('drop-filling', $event)"
            />
          </div>

          <BuilderPriceCounter
            :pizza="pizza"
            :fillings-list="fillings"
            class="content__result"
            @add-to-cart="$emit('add-to-cart', $event)"
          />
        </div>
      </div>
    </form>
    <router-view @login="$emit('login')" />
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import AppInput from "@/common/components/AppInput";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "IndexHome",

  components: {
    AppInput,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderPriceCounter,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    dough: {
      type: Array,
      required: true,
    },
    fillings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.content__result {
  ::v-deep button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
