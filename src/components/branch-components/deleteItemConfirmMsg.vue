<template>
  <div>
    <v-card class="pa-4">
      <h2 class="text-center text-capitalize">are you sure to delete {{ content }}</h2>
      <v-card-actions class="d-flex justify-content-center">
        <v-btn class="success font-weight-bold" :loading="loading" @click="$emit('submit')"
          >Confirm</v-btn
        >
        <v-btn class="error font-weight-bold" @click="$emit('closeDeleteDilog')">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
    };
  },
  computed: {
    loading() {
      return this.$store.getters.Loading;
    },
  },
};
</script>

<style lang="scss" scoped></style>
