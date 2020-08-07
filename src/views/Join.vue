<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col xs="12" sm="8" md="4">
        <v-card flat>
          <v-form ref="form" v-model="valid" @submit="submit">
            <v-card-title>Register an account</v-card-title>
            <v-card-text class="pb-0">
              <v-text-field
                outlined
                prepend-inner-icon="email"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                data-cy="joinEmailField"
                required
              ></v-text-field>
              <v-text-field
                outlined
                prepend-inner-icon="lock"
                name="password"
                label="Password"
                type="password"
                required
                v-model="password"
                :rules="passwordRules"
                data-cy="joinPasswordField"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="px-4">
              <v-btn text to="sign-in">Already a member</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                :disabled="!valid"
                @click="submit"
                data-cy="joinSubmitBtn"
              >Join</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be greater than 6 characters",
      ],
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      if (this.$refs.form.validate()) {
        this.$store.dispatch("userJoin", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>