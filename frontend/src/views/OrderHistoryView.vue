<template>
  <div class="container mt-5">
    <OrderHistory />
  </div>
</template>

<script>
import OrderHistory from '@/components/OrderHistory.vue'

export default {
  name: 'OrderHistoryView',
  components: {
    OrderHistory
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>

