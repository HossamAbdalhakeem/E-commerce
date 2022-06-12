<template>
  <div>
    <h2 class="text-capitalize text-center">
      you orders
    </h2>
    <h2 class="text-center mb-5">{{ order.length }}</h2>
    <v-card v-for="(item, index) in order" :key="index" class="mb-4 pa-4">
      <div class="items justify-content-around d-flex w-100">
        <div class="item">
          <h2>title</h2>
          <p>{{ item.ProductTitle }}</p>
        </div>
        <div class="item">
          <h2>Price</h2>
          <p>{{ item.priceAftereDiscount }}</p>
        </div>
        <div class="item">
          <h2>address</h2>
          <p>{{ item.address }}</p>
        </div>
        <div class="item">
          <h2>quantity</h2>
          <p>{{ item.quantity }}</p>
        </div>
        <div class="item">
          <h2>Image</h2>
          <img class="img-item" :src="item.ProductImage" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    order() {
      return this.$store.getters.myorder;
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-item {
      width: 60px;
      height: 60px;
    }
    h2 {
      font-size: 1rem;
    }
  }
}
</style>
