<template>
  <span>
    <home-hero></home-hero>
    <home-details></home-details>
    <house-plans></house-plans>
  </span>
</template>

<script>
import HomeHero from "@/components/HomeHero";
import HomeDetails from "@/components/HomeDetails";
import HousePlans from "@/components/HousePlans";

export default {
  name: "home",
  components: {
    HomeHero,
    HomeDetails,
    HousePlans,
  },
};
</script>