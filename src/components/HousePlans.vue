<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="display-2 my-5 primary--text">Available Meal Plans</v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="item in housePlans" :key="item.name">
        <v-card outlined :to="'menu?plan='+item.name">
          <v-img height="500px" :src="item.imageUrl" />
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-text class="text--primary">
            <p>{{item.description}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HousePlans",
  data() {
    return {
      housePlans: [
        {
          name: "Keto",
          imageUrl: "https://source.unsplash.com/hjCA3ecCXAQ/370x500",
          description:
            "The Keto diet is a high-fat, adequate-protein, low-carbohydrate diet. The diet forces the body to burn fats rather than carbohydrates by putting the body into ketosis.",
        },
        {
          name: "Paleo",
          imageUrl: "https://source.unsplash.com/6S27S6pZ6o0/370x500",
          description:
            "The Paleo diet requires the predominant consumption of foods presumed to have been the only foods available to or consumed by humans during the Paleolithic era.",
        },
        {
          name: "Vegan",
          imageUrl: "https://source.unsplash.com/1SPu0KT-Ejg/370x500",
          description:
            "The vegan diet abstains from the use of animal products. The vegan diet does not consume meat, diary products, eggs or any all other animal-derived ingredients.",
        },
      ],
    };
  },
};
</script>
