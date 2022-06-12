<template>
  <v-app>
    <div class="no-content"></div>
    <h3 class="text-uppercase text-center mb-16 font-weight-bold title-sign">
      Sign In
    </h3>

    <div class="sign-content mb-4">
      <v-card class="card">
        <v-form v-model="valid" @submit.prevent="login" class="mt-16">
          <v-alert v-if="senderror" type="error">
            {{ senderror.message }}
          </v-alert>
          <v-card-text>
            <v-text-field
              class="mb-3"
              type="email"
              v-model="user.email"
              :rules="[allRules.required, allRules.validEmail]"
              outlined
              dense
              label="Email Address"
            ></v-text-field>
            <v-text-field
              type="password"
              class="mb-3"
              v-model="user.password"
              outlined
              dense
              label="password"
              :rules="[allRules.password, allRules.required]"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="login mb-4">
            <v-btn
              class="text-capitalize text-uppercase info white--text"
              type="submit"
              :disabled="!valid"
              x-large
              :loading="loading"
              >Login</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
      <v-card class="info-about-new-customer">
        <div class="info-content ma-3 pb-4 pt-2">
          <v-card-title>
            <h3>new customer?</h3>
          </v-card-title>
          <v-card-text>
            <p>Create an account with us and you'll be able to:</p>
            <ul class="list">
              <li>Check out faster</li>
              <li>Save multiple shipping addresses</li>
              <li>Access your order history</li>
              <li>Track new orders</li>
              <li>Save items to your Wish List</li>
            </ul>
          </v-card-text>
          <v-card-actions class="login">
            <v-btn class="black text-white" large to="/signup"
              >create account</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      feedback: null,
      valid: false,
    };
  },
  computed: {
    senderror() {
      return this.$store.getters.error;
    },
    currentuser() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.Loading;
    },
  },
  methods: {
    login() {
      console.log("login");
      this.$store
        .dispatch("login", {
          email: this.user.email,
          password: this.user.password,
        })
        .then(() => {
          if (this.currentuser) {
            this.$router.push({ path: "/" });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
}
.no-content {
  height: 110px;
}
.sign-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  width: 80%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.info-about-new-customer {
  width: 50%;
  @media (max-width: 768px) {
    width: 90%;
  }
}
.card {
  width: 50%;
  @media (max-width: 768px) {
    width: 90%;
  }
}
.list li {
  list-style-type: initial;
  font-size: 14px;
}
.list {
  margin: 0 auto;
}
.info-content {
  background: rgb(223, 223, 223);
}
</style>
