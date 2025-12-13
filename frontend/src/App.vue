<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav v-if="isLoggedIn" class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <strong>Inventory System</strong>
          </router-link>
          <a
            role="button"
            class="navbar-burger"
            :class="{ 'is-active': showMobileMenu }"
            @click="showMobileMenu = !showMobileMenu"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': showMobileMenu }">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/all-products" class="navbar-item">All Products</router-link>
            <router-link to="/create" class="navbar-item">Add Product</router-link>
            <router-link to="/add-category" class="navbar-item">Add Category</router-link>
            <router-link to="/place-order" class="navbar-item">Take order</router-link>
            <router-link to="/order-history" class="navbar-item">Order History</router-link>
            <router-link to="/settings" class="navbar-item">Settings</router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <span class="button is-light is-static" v-if="currentUser">
                  {{ currentUser.username }}
                </span>
                <button class="button is-light" @click="handleLogout">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container is-max-desktop" style="margin-top: 2rem;">
      <router-view />
    </div>
  </div>
</template>

<script>
import { isAuthenticated, getUser, logout } from "./utils/auth";

export default {
  name: "App",
  data() {
    return {
      showMobileMenu: false,
    };
  },
  computed: {
    isLoggedIn() {
      return isAuthenticated();
    },
    currentUser() {
      return getUser();
    },
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push("/login");
    },
  },
  watch: {
    $route() {
      // Close mobile menu when route changes
      this.showMobileMenu = false;
    },
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";

#app {
  min-height: 100vh;
}

.navbar-item {
  font-weight: 500;
}

.navbar-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
