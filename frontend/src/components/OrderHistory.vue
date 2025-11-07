<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-3">Order History</h2>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-info" @click="getOrders">
            <span class="icon">
              <i class="fas fa-sync"></i>
            </span>
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="stats" class="columns">
      <div class="column">
        <div class="box has-background-info-light">
          <p class="heading">Total Orders</p>
          <p class="title">{{ stats.total_orders }}</p>
        </div>
      </div>
      <div class="column">
        <div class="box has-background-success-light">
          <p class="heading">Total Items Sold</p>
          <p class="title">{{ stats.total_items_sold }}</p>
        </div>
      </div>
    </div>

    <table class="table is-striped is-bordered is-fullwidth">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Customer</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Price</th>
          <th>Order Date</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id">
          <td>{{ order.order_id }}</td>
          <td>{{ order.product_name }}</td>
          <td>{{ order.category_name || 'N/A' }}</td>
          <td>{{ order.customer_name }}</td>
          <td>{{ order.quantity_ordered }}</td>
          <td>${{ parseFloat(order.product_price).toFixed(2) }}</td>
          <td>${{ parseFloat(order.total_price).toFixed(2) }}</td>
          <td>{{ formatDate(order.order_date) }}</td>
          <td class="has-text-centered">
            <button
              class="button is-danger is-small"
              @click="deleteOrder(order.order_id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="orders.length === 0" class="has-text-centered mt-5">
      <p class="subtitle">No orders yet. Start selling!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      stats: null,
    };
  },
  created() {
    this.getOrders();
    this.getStats();
  },
  methods: {
    async getOrders() {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        this.orders = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getStats() {
      try {
        const response = await axios.get("http://localhost:5000/orders/stats");
        this.stats = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteOrder(id) {
      if (confirm("Are you sure you want to delete this order? This will not restore the stock.")) {
        try {
          await axios.delete(`http://localhost:5000/orders/${id}`);
          this.getOrders();
          this.getStats();
        } catch (err) {
          console.log(err);
        }
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
  },
};
</script>

<style></style>

