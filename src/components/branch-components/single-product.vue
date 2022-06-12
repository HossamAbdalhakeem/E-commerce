<template>
  <div>
    <v-card v-if="SingleOneProduct" class="pa-5">
      <closeDialog @closeDialog="$emit('close')"></closeDialog>

      <div class="d-flex singleProduct">
        <div class="ProductImg">
          <img :src="SingleOneProduct.ProductImage" class="rounded-lg" />
        </div>
        <div class="text-center infromation">
          <v-card-title class="p-0">
            <h5 class="mx-auto">{{ SingleOneProduct.ProductTitle }}</h5>
          </v-card-title>
          <h6 class="text-decoration-line-through">
            $ {{ SingleOneProduct.priceBeforeDiscount }}
          </h6>
          <h6>$ {{ SingleOneProduct.priceAftereDiscount }}</h6>
          {{ SingleOneProduct.discription }}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            doloremque suscipit repellat alias, natus cumque. Modi ipsa numquam,
            minus eius veritatis eaque, dolorem delectus voluptatem itaque
            similique ullam doloribus reprehenderit?
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["SingleOneProduct"],
};
</script>

<style lang="scss" scoped>
.singleProduct {
  gap: 2rem;
  align-items: center;
  .ProductImg {
    width: 40%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .infromation {
    width: 60%;
  }
}
</style>
