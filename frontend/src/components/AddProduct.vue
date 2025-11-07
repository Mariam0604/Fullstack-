<template>
  <div>
    <div class="field">
      <label class="label">Category</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="categoryId">
            <option value="">Select a category</option>
            <option 
              v-for="category in categories" 
              :key="category.category_id" 
              :value="category.category_id"
            >
              {{ category.category_name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Product Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Product Name"
          v-model="productName"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Price</label>
      <div class="control">
        <input
          class="input"
          type="number"
          step="0.01"
          placeholder="Price"
          v-model="productPrice"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Quantity</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="Quantity"
          v-model="productQuantity"
        />
      </div>
    </div>

    <div class="control">
      <button class="button is-success" @click="saveProduct">SAVE</button>
      <router-link :to="{ name: 'Home' }" class="button is-light ml-2">
        CANCEL
      </router-link>
    </div>
  </div>
</template>

<script>
//import axios
import axios from "axios";

export default {
  data() {
    return {
      productName: "",
      productPrice: "",
      productQuantity: 0,
      categoryId: "",
      categories: [],
    };
  },
  created() {
    this.getCategories();
    // If coming from category page, pre-select the category
    if (this.$route.params.categoryId) {
      this.categoryId = this.$route.params.categoryId;
    }
  },
  methods: {
    //get all categories
    async getCategories() {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        this.categories = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    //create new product
    async saveProduct() {
      if (!this.productName || !this.productPrice || !this.categoryId) {
        alert("Please fill in all required fields");
        return;
      }

      try {
        await axios.post("http://localhost:5000/products", {
          product_name: this.productName,
          product_price: this.productPrice,
          product_quantity: this.productQuantity,
          category_id: this.categoryId,
        });
        this.productName = "";
        this.productPrice = "";
        this.productQuantity = 0;
        this.categoryId = "";
        
        // If came from category page, go back to that category
        if (this.$route.params.categoryId) {
          this.$router.push({ 
            name: 'CategoryProducts', 
            params: { 
              categoryId: this.$route.params.categoryId,
              categoryName: this.$route.params.categoryName 
            } 
          });
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>