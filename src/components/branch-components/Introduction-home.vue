<template>
  <div>
    <section class="mt-16">
      <div class="header d-flex">
        <h2 class="mx-auto mt-16 mb-16 titleProject">KOOVS</h2>
        <p class="black-text mx-auto titleProject font-weight-bold mb-16">
          It's the electronics trap, see now
        </p>
        <v-btn
          class="black white--text text-uppercase mx-auto mb-4 header-btn"
          width="200"
          x-large
          to="/shopingMain"
          >shop now</v-btn
        >
        <div class="img-container mx-auto">
          <img src="../../assets/shopingTwo.jpg" width="700" class="mx-auto" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  flex-direction: column;
}
.header .header-btn {
  text-decoration: none;
}
.titleProject {
  letter-spacing: 3px;
}
.img-container {
  @media (max-width: 768px) {
    width: 30rem;
  }
   @media (max-width: 500px) {
    width: 20rem;
  }
  width: 43.75rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
