<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="display-1 primary--text">Placed order</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="meal in meals" :key="meal.uri">
        <menu-item :meal="meal" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
import router from "@/router";
export default {
  components: {
    MenuItem,
  },
  async created() {
    const isAuthenticated = await this.$store.getters.isAuthenticated;
    if (!isAuthenticated) router.replace("/menu");
    this.$store.dispatch("getOrderedMeals");
  },
  computed: {
    meals() {
      return this.$store.state.orderedMeals;
    },
  },
};
</script>