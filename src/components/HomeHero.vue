<template>
  <v-container fluid fill-height style="max-height:100vh" class="home-hero">
    <v-row align="center" justify="center">
      <v-col cols="12" class="display-4 white--text text-sm-center">HEALTHY MEALS</v-col>
      <v-col cols="12" class="display-4 white--text text-sm-center">FOR YOUR TABLE</v-col>
      <v-col
        cols="12"
        class="display-1 font-weight-medium white--text text-sm-center"
      >Finally be a foodie at home with fresh, chef-prepared meals delivered daily to your door.</v-col>
      <v-col cols="12" class="text-center">
        <v-btn fab dark class="mt-5 accent" @click="scroll">
          <v-icon large color="white">expand_more</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeHero",
  methods: {
    scroll() {
      this.$vuetify.goTo(window.innerHeight + 64, { duration: 1000 });
    },
  },
};
</script>

<style scoped>
.home-hero {
  background: url("https://source.unsplash.com/0BhSKStVtdM");
  background-size: cover;
}
</style>