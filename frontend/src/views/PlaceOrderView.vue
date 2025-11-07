<template>
  <div class="container mt-5">
    <PlaceOrder />
  </div>
</template>

<script>
import PlaceOrder from '@/components/PlaceOrder.vue'

export default {
  name: 'PlaceOrderView',
  components: {
    PlaceOrder
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>

