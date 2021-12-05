<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <AppTitle mod-text-big>Конструктор пиццы</AppTitle>

        <div class="content__dough">
          <BuilderDoughSelector />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector />
        </div>

        <div class="content__pizza">
          <AppInput
            v-model="pizzaName"
            :is-visible-caption="false"
            name="pizza_name"
            placeholder="Введите название пиццы"
            data-test="pizza-name"
          >
            Название пиццы
          </AppInput>

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <BuilderPriceCounter class="content__result" />
        </div>
      </div>
    </form>
    <router-view @login="$emit('login')" />
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "IndexHome",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderPriceCounter,
  },

  computed: {
    pizzaName: {
      get() {
        return this.$store.state.Builder.pizza?.name;
      },
      set(val) {
        this.$store.dispatch("Builder/setName", val);
      },
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
