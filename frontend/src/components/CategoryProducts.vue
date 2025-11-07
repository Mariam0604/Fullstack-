<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-3">{{ categoryName }} - Products</h2>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'Home' }" class="button is-light">
            Back to Categories
          </router-link>
        </div>
      </div>
    </div>

    <router-link 
      :to="{ name: 'CreateProduct', params: { categoryId: categoryId } }" 
      class="button is-success mt-3 mb-3"
    >
      Add New Product
    </router-link>

    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.product_id" :class="getRowClass(item.product_quantity)">
          <td>{{ item.product_name }}</td>
          <td>${{ item.product_price }}</td>
          <td>
            <span :class="getStockClass(item.product_quantity)">
              {{ item.product_quantity }}
              <span v-if="item.product_quantity <= 5" class="tag is-danger is-light ml-2">Low Stock</span>
            </span>
          </td>
          <td class="has-text-centered">
            <router-link
              :to="{ name: 'Edit', params: { id: item.product_id } }"
              class="button is-info is-small"
            >
              Edit
            </router-link>
            <a
              class="button is-danger is-small ml-2"
              @click="deleteProduct(item.product_id)"
            >
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="items.length === 0" class="has-text-centered mt-5">
      <p class="subtitle">No products in this category yet. Add your first product!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      categoryId: this.$route.params.categoryId,
      categoryName: this.$route.params.categoryName,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/category/${this.categoryId}`
        );
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await axios.delete(`http://localhost:5000/products/${id}`);
          this.getProducts();
        } catch (err) {
          console.log(err);
        }
      }
    },
    //get row class based on stock quantity
    getRowClass(quantity) {
      if (quantity === 0) {
        return 'has-background-danger-light';
      } else if (quantity <= 5) {
        return 'has-background-warning-light';
      }
      return '';
    },
    //get stock class for quantity display
    getStockClass(quantity) {
      if (quantity === 0) {
        return 'has-text-danger has-text-weight-bold';
      } else if (quantity <= 5) {
        return 'has-text-danger has-text-weight-semibold';
      }
      return '';
    },
  },
};
</script>

<style scoped>
/* Low stock row animations */
.has-background-warning-light {
  background-color: #fff3cd !important;
  border-left: 4px solid #ffc107;
}

.has-background-danger-light {
  background-color: #f8d7da !important;
  border-left: 4px solid #dc3545;
}

/* Smooth transitions */
tr {
  transition: background-color 0.3s ease;
}

/* Low stock tag styling */
.tag.is-danger.is-light {
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

