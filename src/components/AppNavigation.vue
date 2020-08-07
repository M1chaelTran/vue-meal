<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="primary pt-8" dark disable-resize-watcher>
      <v-list shaped>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title class="white--text">{{appTitle}}</v-toolbar-title>
      </router-link>
      <v-btn text class="hidden-sm-and-down ml-2" to="menu">Menu</v-btn>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn text to="sign-in">Sign in</v-btn>
        <v-btn color="secondary" to="join" class="ml-2">Register</v-btn>
      </div>
      <div v-else>
        <v-btn text color="white" @click="logout">Logout</v-btn>
        <v-btn color="secondary" to="my-order" class="ml-2">My order</v-btn>
      </div>
    </v-app-bar>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Meal Prep",
      drawer: false,
      items: [
        { title: "Menu", to: "menu" },
        { title: "Sign In", to: "sign-in" },
        { title: "Join", to: "join" },
      ],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    },
  },
};
</script>

<style scoped>
</style>