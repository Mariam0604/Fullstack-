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
        <button class="button is-success" @click="updateProduct">UPDATE</button>
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
    created: function () {
      this.getCategories();
      this.getProductById();
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
      //get product by id
      async getProductById() {
        try {
          const response = await axios.get(
            `http://localhost:5000/products/${this.$route.params.id}`
          );
          this.productName = response.data.product_name;
          this.productPrice = response.data.product_price;
          this.productQuantity = response.data.product_quantity;
          this.categoryId = response.data.category_id;
        } catch (err) {
          console.log(err);
        }
      },
  
      //update product
      async updateProduct() {
        if (!this.productName || !this.productPrice || !this.categoryId) {
          alert("Please fill in all required fields");
          return;
        }

        try {
          await axios.put(
            `http://localhost:5000/products/${this.$route.params.id}`,
            {
              product_name: this.productName,
              product_price: this.productPrice,
              product_quantity: this.productQuantity,
              category_id: this.categoryId,
            }
          );
          this.$router.push("/");
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
  </script>
  
  <style></style>