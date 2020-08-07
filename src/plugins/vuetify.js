import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.brown.darken2, // #E53935
        secondary: colors.green.darken2, // #FFCDD2
        accent: colors.orange.darken2, // #3F51B5
      },
    },
  },
});
