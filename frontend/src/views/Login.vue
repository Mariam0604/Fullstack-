<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop">
        <div class="box" style="margin-top: 5rem;">
          <h1 class="title has-text-centered">Login</h1>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="notification is-danger is-light">
            <button class="delete" @click="errorMessage = ''"></button>
            {{ errorMessage }}
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin">
            <div class="field">
              <label class="label">Email or Username</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  v-model="loginForm.login"
                  placeholder="Enter email or username"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  v-model="loginForm.password"
                  placeholder="Enter password"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary is-fullwidth"
                  type="submit"
                  :class="{ 'is-loading': isLoading }"
                  :disabled="isLoading"
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 1rem;">
            <p>
              Don't have an account?
              <router-link to="/register">Register here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        login: "",
        password: "",
      },
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      this.isLoading = true;

      try {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          this.loginForm
        );

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to home page
        this.$router.push("/");
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage =
            error.response.data.message || "Login failed. Please try again.";
        } else {
          this.errorMessage = "Network error. Please try again.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    // Redirect if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.box {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

