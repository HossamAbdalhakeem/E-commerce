<template>
  <div>
    <v-card class="pa-5">
      <div class="d-flex justify-content-end  mb-4 d-block">
        <v-btn icon @click="$emit('closeDialogInfo')">
          <v-icon class="black--text">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-form v-model="valid" @submit.prevent="saveChange(updateUser)">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.name"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="Name"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.lastname"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="Last Name"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.email"
              :rules="[allRules.required, allRules.validEmail]"
              dense
              outlined
              label="Email"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.phoneNum"
              :rules="[allRules.required, allRules.length(8)]"
              dense
              outlined
              label="Phone"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.address"
              :rules="[allRules.required, allRules.minNameLen(8)]"
              dense
              outlined
              label="Address"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.companyName"
              :rules="[allRules.required, allRules.minNameLen(8)]"
              dense
              outlined
              label="Company"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.postcode"
              :rules="[allRules.required, allRules.length(4)]"
              dense
              outlined
              label="Postcode"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.country"
              :rules="[allRules.required, allRules.minNameLen(5)]"
              dense
              outlined
              label="Country"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateUser.city"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="City"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn
              class="info font-weight-bold text-capitalize"
              type="submit"
              :loading="loading"
              :disabled="!valid"
              >confirm</v-btn
            >
            <v-btn
              class="error ml-3 font-weight-bold"
              @click="$emit('closeDialogInfo')"
              >close</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["updateUser"],
  data() {
    return {
      newInfo: null,
      valid: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.Loading;
    },
  },
  methods: {
    saveChange(user) {
      this.$store.dispatch("EditInfoUser", user).then(() => {
        this.$emit("closeDialogInfo");
        this.ToasteSuccessMsg(
          "The personal information has been modified successfully"
        );
      });
      this.newInfo = user;
      this.$emit("profileInfo", this.newInfo);
    },
  },
};
</script>

<style lang="scss" scoped></style>
