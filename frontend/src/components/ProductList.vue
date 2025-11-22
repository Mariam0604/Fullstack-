<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success mt-5"
      >Add New</router-link
    >
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.product_id" :class="getRowClass(item.product_quantity)">
          <td>{{ item.product_name }}</td>
          <td>{{ item.category_name || 'Uncategorized' }}</td>
          <td>${{ item.product_price }}</td>
          <td>
            <span :class="getStockClass(item.product_quantity)">
              <strong class="quantity-number">{{ item.product_quantity }}</strong>
              <span v-if="item.product_quantity <= 5" class="tag is-danger is-light ml-2">⚠️ Low Stock</span>
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
  </div>
</template>

<script>
//import axios
import axios from "../utils/axios";

export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    //get all products
    async getProducts() {
      try {
        const response = await axios.get("/products");
        this.items = response.data;
        console.log(this.items);
      } catch (err) {
        console.log(err);
      }
    },
    //delete product
    async deleteProduct(id) {
      try {
        await axios.delete(`/products/${id}`);
        this.getProducts();
      } catch (err) {
        console.log(err);
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
        return 'has-text-danger has-text-weight-bold stock-critical';
      } else if (quantity <= 5) {
        return 'has-text-danger has-text-weight-bold stock-low';
      }
      return 'stock-normal';
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

/* Enhanced quantity number styling */
.quantity-number {
  font-size: 1.2em;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  min-width: 30px;
  text-align: center;
}

/* Stock level specific styling */
.stock-critical .quantity-number {
  background-color: #dc3545;
  color: white;
  animation: criticalBlink 1.5s infinite;
  box-shadow: 0 0 10px rgba(220, 53, 69, 0.5);
}

.stock-low .quantity-number {
  background-color: #dc3545;
  color: white;
  animation: lowStockPulse 2s infinite;
  box-shadow: 0 0 8px rgba(220, 53, 69, 0.4);
}

.stock-normal .quantity-number {
  background-color: #28a745;
  color: white;
}

/* Low stock tag styling */
.tag.is-danger.is-light {
  font-weight: 600;
  animation: pulse 2s infinite;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes criticalBlink {
  0%, 50% {
    background-color: #dc3545;
  }
  51%, 100% {
    background-color: #ff1744;
  }
}

@keyframes lowStockPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 8px rgba(220, 53, 69, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(220, 53, 69, 0.7);
  }
}
</style>