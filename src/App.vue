<template>
  <v-app>
    <navbar class="mb-16"></navbar>
    <router-view></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import footer from "@/components/footer";
export default {
  components: { "app-footer": footer },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
