<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="display-1 primary--text">Available meal plans</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="activeTab">
          <v-tab v-for="(tab, i) in tabs" :key="i">{{tab}}</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="meal in meals" :key="meal.recipe.uri">
        <menu-item :meal="meal.recipe" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
import router from "@/router";
import { indexOf } from "lodash";
const TABS = ["Keto", "Paleo", "Vegan"];
export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      activeTab: indexOf(TABS, this.$route.query.plan),
      tabs: TABS,
    };
  },
  created() {
    this.$store.dispatch("getOrderedMeals");
    this.$store.dispatch("getMeals", TABS[this.activeTab]);
  },
  computed: {
    meals() {
      return this.$store.state.meals;
    },
  },
  watch: {
    activeTab(val) {
      const tabName = TABS[val];
      router
        .replace({
          query: { plan: tabName },
        })
        .catch(() => {});
      this.$store.dispatch("getMeals", tabName);
    },
  },
};
</script>