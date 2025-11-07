<template>
  <div class="container mt-5">
    <AddCategory />
  </div>
</template>

<script>
import AddCategory from '@/components/AddCategory.vue'

export default {
  name: 'AddCategoryView',
  components: {
    AddCategory
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

