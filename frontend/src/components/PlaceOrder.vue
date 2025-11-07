<template>
  <div>
    <h2 class="title is-4">Place Order</h2>
    
    <div class="box">
      <div class="field">
        <label class="label">Select Product</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="selectedProductId" @change="onProductChange">
              <option value="">Choose a product</option>
              <option 
                v-for="product in products" 
                :key="product.product_id" 
                :value="product.product_id"
                :class="product.product_quantity <= 5 ? 'has-text-danger' : ''"
              >
                {{ product.product_name }} - ${{ product.product_price }} (Stock: {{ product.product_quantity }}){{ product.product_quantity <= 5 ? ' ⚠️ LOW' : '' }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="selectedProduct" :class="selectedProduct.product_quantity <= 5 ? 'notification is-warning' : 'notification is-info is-light'">
        <p><strong>Product:</strong> {{ selectedProduct.product_name }}</p>
        <p><strong>Price:</strong> ${{ selectedProduct.product_price }}</p>
        <p><strong>Available Stock:</strong> 
          <span :class="selectedProduct.product_quantity <= 5 ? 'has-text-danger has-text-weight-bold' : ''">
            {{ selectedProduct.product_quantity }}
          </span>
          <span v-if="selectedProduct.product_quantity <= 5" class="tag is-danger ml-2">⚠️ LOW STOCK</span>
        </p>
      </div>

      <div class="field">
        <label class="label">Customer Name (Optional)</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Enter customer name"
            v-model="customerName"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Quantity to Order</label>
        <div class="control">
          <input
            class="input"
            type="number"
            min="1"
            :max="selectedProduct ? selectedProduct.product_quantity : 0"
            placeholder="Enter quantity"
            v-model.number="quantityOrdered"
          />
        </div>
        <p v-if="selectedProduct && quantityOrdered" class="help">
          Total: ${{ (selectedProduct.product_price * quantityOrdered).toFixed(2) }}
        </p>
      </div>

      <div class="control">
        <button 
          class="button is-success" 
          @click="placeOrder"
          :disabled="!selectedProductId || !quantityOrdered || quantityOrdered < 1"
        >
          PLACE ORDER
        </button>
        <router-link :to="{ name: 'Home' }" class="button is-light ml-2">
          CANCEL
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      selectedProductId: "",
      selectedProduct: null,
      customerName: "",
      quantityOrdered: 1,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        this.products = response.data.filter(p => p.product_quantity > 0);
      } catch (err) {
        console.log(err);
      }
    },
    onProductChange() {
      this.selectedProduct = this.products.find(
        p => p.product_id == this.selectedProductId
      );
      this.quantityOrdered = 1;
    },
    async placeOrder() {
      if (!this.selectedProductId || !this.quantityOrdered) {
        alert("Please select a product and enter quantity");
        return;
      }

      if (this.quantityOrdered > this.selectedProduct.product_quantity) {
        alert("Insufficient stock available");
        return;
      }

      try {
        await axios.post("http://localhost:5000/orders", {
          product_id: this.selectedProductId,
          quantity_ordered: this.quantityOrdered,
          customer_name: this.customerName || "Walk-in Customer"
        });
        
        alert(`Order placed successfully! Stock updated.`);
        this.selectedProductId = "";
        this.selectedProduct = null;
        this.customerName = "";
        this.quantityOrdered = 1;
        this.getProducts();
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert("Error: " + err.response.data.error);
        } else {
          alert("Error placing order");
        }
      }
    },
  },
};
</script>

<style scoped>
.box {
  max-width: 600px;
}
</style>

