<template>
  <v-app>
    <div class="no-content"></div>
    <h3 class="text-center text-uppercase font-weight-bold mb-0">
      new account
    </h3>
    <v-card width="750" class="card">
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="save">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-3"
                type="email"
                v-model="newUser.email"
                :rules="[allRules.required, allRules.validEmail]"
                outlined
                dense
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-3"
                type="text"
                v-model="newUser.companyName"
                :rules="[allRules.required, allRules.minNameLen(4)]"
                outlined
                dense
                label="Company Name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-3"
                v-model="newUser.name"
                :rules="[allRules.required, allRules.minNameLen(4)]"
                label="Name"
                type="text"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-3"
                type="text"
                v-model="newUser.lastname"
                :rules="[allRules.required, allRules.minNameLen(4)]"
                outlined
                dense
                label="Last Name"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-3"
                v-model="newUser.password"
                outlined
                dense
                label="password"
                :rules="[allRules.password, allRules.required]"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-3"
                v-model="newUser.confirmpassword"
                outlined
                :rules="[surepassword, allRules.required]"
                dense
                label="Confirm password"
                :append-icon="showConfirmpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmpassword ? 'text' : 'password'"
                @click:append="showConfirmpassword = !showConfirmpassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                type="text"
                class="mb-3"
                v-model="newUser.country"
                :rules="[allRules.required, allRules.minNameLen(4)]"
                outlined
                dense
                label="Country"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="text"
                class="mb-3"
                v-model="newUser.city"
                :rules="[allRules.required, allRules.minNameLen(4)]"
                outlined
                dense
                label="City"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                class="mb-3"
                v-model="newUser.phoneNum"
                :rules="[allRules.required, allRules.length(8)]"
                outlined
                dense
                label="Phone Number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                class="mb-3"
                v-model="newUser.postcode"
                :rules="[allRules.required, allRules.length(3)]"
                outlined
                dense
                label="PostCode"
                required
              ></v-text-field>
            </v-col>
            <v-card-actions class="mx-auto mb-4">
              <v-btn
                class="text-capitalize text-uppercase info white--text"
                large
                type="submit"
                :disabled="!valid"
                :loading="loading"
                >save</v-btn
              >
            </v-card-actions>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      newUser: {},
      showConfirmpassword: "",
      show: "",
    };
  },
  computed: {
    surepassword() {
      return (
        this.newUser.confirmpassword === this.newUser.password ||
        "Password does not match"
      );
    },
    loading() {
      return this.$store.getters.Loading;
    },
  },
  methods: {
    save() {
      console.log("save");
      this.$store.dispatch("signUp", this.newUser).then(() => {
        this.$router.push({ path: "/" });
      });
      // if (this.newUser.password == this.newUser.confirmpassword) {
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 40px auto;
}
.no-content {
  height: 110px;
}
</style>
