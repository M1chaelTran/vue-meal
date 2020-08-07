<template>
  <v-card outlined max-width="370">
    <v-img :src="meal.image" />
    <v-card-title
      class="d-inline-block text-truncate"
      style="max-width: 360px"
    >{{meal.label.replace(/recipes?/ig, '')}}</v-card-title>
    <v-card-actions class="px-4 pb-4">
      <v-btn
        depressed
        :color="mealPlaced?'disabled':'secondary'"
        @click="placeOrder"
      >{{mealPlaced?'Order placed':'Place order'}}</v-btn>
      <v-spacer />
      <v-btn text @click="showDetails = !showDetails">{{showDetails?'Hide details':'Show details'}}</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showDetails">
        <v-divider></v-divider>

        <v-card-text>
          <v-subheader>Ingredients</v-subheader>
          <v-list-item v-for="(item, index) in meal.ingredientLines" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{item}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";
export default {
  props: ["meal"],
  data() {
    return {
      showDetails: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    mealPlaced() {
      return this.$store.getters.getOrderedMeal(this.meal.uri);
    },
  },
  methods: {
    placeOrder() {
      if (!this.isAuthenticated) {
        router.push("sign-in");
      } else if (this.mealPlaced) {
        this.$store.dispatch("removeMeal", this.mealPlaced);
      } else {
        this.$store.dispatch("orderMeal", this.meal);
      }
    },
  },
};
</script>