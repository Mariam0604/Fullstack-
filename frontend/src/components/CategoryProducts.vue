<template>
  <div class="shop-container">
    <!-- Shop Header -->
    <div class="shop-header">
      <div class="header-content">
        <div class="header-left">
          <div class="shop-icon">🏪</div>
          <div class="header-text">
            <h1 class="shop-title">{{ categoryName }}</h1>
            <p class="shop-subtitle">Product Inventory</p>
          </div>
        </div>
        <div class="header-right">
          <router-link :to="{ name: 'Home' }" class="back-button">
            <span class="icon">🏠</span>
            Back to Categories
          </router-link>
        </div>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="action-bar">
      <router-link 
        :to="{ name: 'CreateProduct', params: { categoryId: categoryId } }" 
        class="add-product-btn"
      >
        <span class="icon">➕</span>
        Add New Product
      </router-link>
      <div class="stats-info">
        <span class="stat-item">
          <span class="stat-icon">📦</span>
          {{ items.length }} Products
        </span>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="items.length > 0" class="products-grid">
      <div 
        v-for="item in items" 
        :key="item.product_id" 
        class="product-card"
        :class="getCardClass(item.product_quantity)"
      >
        <div class="product-header">
          <div class="product-icon">🛍️</div>
          <div class="stock-badge" :class="getStockBadgeClass(item.product_quantity)">
            <span class="stock-icon">📊</span>
            {{ item.product_quantity }}
            <span v-if="item.product_quantity <= 5" class="low-stock-warning">⚠️</span>
          </div>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ item.product_name }}</h3>
          <div class="product-price">
            <span class="price-icon">💰</span>
            ${{ item.product_price }}
          </div>
          <div class="stock-status" :class="getStockStatusClass(item.product_quantity)">
            <span v-if="item.product_quantity === 0">❌ Out of Stock</span>
            <span v-else-if="item.product_quantity <= 5">⚠️ Low Stock</span>
            <span v-else>✅ In Stock</span>
          </div>
        </div>

        <div class="product-actions">
          <router-link
            :to="{ name: 'Edit', params: { id: item.product_id } }"
            class="edit-btn"
          >
            <span class="icon">✏️</span>
            Edit
          </router-link>
          <button
            class="delete-btn"
            @click="deleteProduct(item.product_id)"
          >
            <span class="icon">🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">🛒</div>
      <h2 class="empty-title">No Products Yet</h2>
      <p class="empty-message">Start building your inventory by adding your first product!</p>
      <router-link 
        :to="{ name: 'CreateProduct', params: { categoryId: categoryId } }" 
        class="empty-action-btn"
      >
        <span class="icon">🚀</span>
        Add Your First Product
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";

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
          `/products/category/${this.categoryId}`
        );
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await axios.delete(`/products/${id}`);
          this.getProducts();
        } catch (err) {
          console.log(err);
        }
      }
    },
    // Get card class based on stock quantity
    getCardClass(quantity) {
      if (quantity === 0) {
        return 'out-of-stock';
      } else if (quantity <= 5) {
        return 'low-stock';
      }
      return 'in-stock';
    },
    // Get stock badge class
    getStockBadgeClass(quantity) {
      if (quantity === 0) {
        return 'badge-critical';
      } else if (quantity <= 5) {
        return 'badge-warning';
      }
      return 'badge-success';
    },
    // Get stock status class
    getStockStatusClass(quantity) {
      if (quantity === 0) {
        return 'status-critical';
      } else if (quantity <= 5) {
        return 'status-warning';
      }
      return 'status-success';
    },
  },
};
</script>

<style scoped>
/* Shop Container */
.shop-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Shop Header */
.shop-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.shop-icon {
  font-size: 3rem;
  animation: shopBounce 2s infinite;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.shop-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4a5568;
  margin: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shop-subtitle {
  font-size: 1.1rem;
  color: #718096;
  margin: 5px 0 0 0;
  font-weight: 500;
}

.back-button {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.6);
  color: white;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.add-product-btn {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
}

.add-product-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.6);
  color: white;
}

.stats-info {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a5568;
  font-weight: 600;
  font-size: 1.1rem;
}

.stat-icon {
  font-size: 1.2rem;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

/* Product Cards */
.product-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.product-card.out-of-stock::before {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.product-card.low-stock::before {
  background: linear-gradient(135deg, #feca57 0%, #ff9ff3 100%);
}

.product-card.in-stock::before {
  background: linear-gradient(135deg, #48dbfb 0%, #0abde3 100%);
}

/* Product Header */
.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.product-icon {
  font-size: 2rem;
  animation: productFloat 3s ease-in-out infinite;
}

.stock-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
}

.badge-success {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  color: white;
}

.badge-warning {
  background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
  color: white;
  animation: warningPulse 2s infinite;
}

.badge-critical {
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  color: white;
  animation: criticalBlink 1.5s infinite;
}

.low-stock-warning {
  margin-left: 5px;
  animation: bounce 1s infinite;
}

/* Product Info */
.product-info {
  margin-bottom: 20px;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 10px 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #48bb78;
  margin-bottom: 10px;
}

.price-icon {
  font-size: 1.1rem;
}

.stock-status {
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 15px;
  display: inline-block;
  font-size: 0.9rem;
}

.status-success {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
}

.status-warning {
  background: rgba(237, 137, 54, 0.1);
  color: #dd6b20;
}

.status-critical {
  background: rgba(245, 101, 101, 0.1);
  color: #e53e3e;
}

/* Product Actions */
.product-actions {
  display: flex;
  gap: 12px;
}

.edit-btn, .delete-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  color: white;
}

.delete-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.empty-icon {
  font-size: 6rem;
  margin-bottom: 30px;
  animation: emptyFloat 3s ease-in-out infinite;
}

.empty-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4a5568;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.empty-message {
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.6;
}

.empty-action-btn {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 18px 35px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
  font-size: 1.1rem;
}

.empty-action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(79, 172, 254, 0.6);
  color: white;
}

/* Animations */
@keyframes shopBounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes productFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(5deg); }
}

@keyframes emptyFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

@keyframes warningPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes criticalBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.8; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .shop-container {
    padding: 15px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .action-bar {
    flex-direction: column;
    gap: 15px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .product-actions {
    flex-direction: column;
  }
  
  .shop-title {
    font-size: 2rem;
  }
  
  .empty-title {
    font-size: 2rem;
  }
  
  .empty-icon {
    font-size: 4rem;
  }
}

@media (max-width: 480px) {
  .shop-header {
    padding: 20px;
  }
  
  .action-bar {
    padding: 15px 20px;
  }
  
  .product-card {
    padding: 20px;
  }
  
  .shop-title {
    font-size: 1.8rem;
  }
}
</style>

