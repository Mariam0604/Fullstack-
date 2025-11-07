<template>
  <div class="home">
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title">
          Inventory Management System
        </p>
        <p class="subtitle">
          Organize your products by categories
        </p>
      </div>
    </section>

    <div class="container mt-5">
      <div class="buttons is-centered mb-5">
        <router-link :to="{ name: 'PlaceOrder' }" class="button is-success is-medium">
          <span class="icon">
            <i class="fas fa-shopping-cart"></i>
          </span>
          <span>Place Order</span>
        </router-link>
        <router-link :to="{ name: 'OrderHistory' }" class="button is-info is-medium">
          <span class="icon">
            <i class="fas fa-history"></i>
          </span>
          <span>Order History</span>
        </router-link>
        <router-link :to="{ name: 'Settings' }" class="button is-warning is-medium">
          <span class="icon">
            <i class="fas fa-envelope"></i>
          </span>
          <span>Email Services</span>
        </router-link>
      </div>

      <CategoryList />
      
      <div class="has-text-centered mt-5">
        <router-link :to="{ name: 'Index' }" class="button is-link is-light">
          View All Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'

export default {
  name: 'HomeView',
  components: {
    CategoryList
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.container {
  padding: 2rem;
}
</style>
