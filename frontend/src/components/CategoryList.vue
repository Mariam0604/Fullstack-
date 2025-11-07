<template>
  <div>
    <div class="has-text-centered mb-5">
      <router-link :to="{ name: 'AddCategory' }" class="button is-primary is-medium">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span>Add New Category</span>
      </router-link>
    </div>

    <div class="columns is-multiline is-centered">
      <div 
        v-for="category in categories" 
        :key="category.category_id"
        class="column is-3"
      >
        <div class="box category-card has-text-centered">
          <h3 class="title is-4">{{ category.category_name }}</h3>
          <div class="buttons is-centered">
            <router-link
              :to="{ name: 'CategoryProducts', params: { categoryId: category.category_id, categoryName: category.category_name } }"
              class="button is-info"
            >
              View Products
            </router-link>
            <button
              class="button is-danger is-small"
              @click="deleteCategory(category.category_id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="categories.length === 0" class="has-text-centered">
      <p class="subtitle">No categories yet. Add your first category!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        this.categories = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCategory(id) {
      if (confirm("Are you sure you want to delete this category? All products in this category will remain but will be uncategorized.")) {
        try {
          await axios.delete(`http://localhost:5000/categories/${id}`);
          this.getCategories();
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.category-card {
  transition: transform 0.2s;
  cursor: pointer;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>

