<template>
  <div class="container mt-5">
    <CategoryProducts />
  </div>
</template>

<script>
import CategoryProducts from '@/components/CategoryProducts.vue'

export default {
  name: 'CategoryProductsView',
  components: {
    CategoryProducts
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>

