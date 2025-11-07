<template>
  <div>
    <h2 class="title is-3">Add New Category</h2>
    <div class="field">
      <label class="label">Category Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Enter category name (e.g., Clothes, Accessories)"
          v-model="categoryName"
        />
      </div>
    </div>

    <div class="control">
      <button class="button is-success" @click="saveCategory">SAVE</button>
      <router-link :to="{ name: 'Home' }" class="button is-light ml-2">
        CANCEL
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categoryName: "",
    };
  },
  methods: {
    async saveCategory() {
      if (!this.categoryName.trim()) {
        alert("Please enter a category name");
        return;
      }
      
      try {
        await axios.post("http://localhost:5000/categories", {
          category_name: this.categoryName,
        });
        this.categoryName = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          alert("Error: Category name might already exist");
        }
      }
    },
  },
};
</script>

<style></style>

