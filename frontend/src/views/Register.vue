<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop">
        <div class="box" style="margin-top: 5rem;">
          <h1 class="title has-text-centered">Register</h1>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="notification is-danger is-light">
            <button class="delete" @click="errorMessage = ''"></button>
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="notification is-success is-light">
            <button class="delete" @click="successMessage = ''"></button>
            {{ successMessage }}
          </div>

          <!-- Register Form -->
          <form @submit.prevent="handleRegister">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="registerForm.username"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  v-model="registerForm.email"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Full Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="registerForm.full_name"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="registerForm.password"
                  placeholder="Enter password (min 6 characters)"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="registerForm.confirmPassword"
                  placeholder="Confirm password"
                  required
                />
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
                  Register
                </button>
              </div>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 1rem;">
            <p>
              Already have an account?
              <router-link to="/login">Login here</router-link>
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
  name: "Register",
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        full_name: "",
      },
      errorMessage: "",
      successMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async handleRegister() {
      this.errorMessage = "";
      this.successMessage = "";

      // Validate passwords match
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      // Validate password length
      if (this.registerForm.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters";
        return;
      }

      this.isLoading = true;

      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          {
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password,
            full_name: this.registerForm.full_name,
          }
        );

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        this.successMessage = "Registration successful! Redirecting...";

        // Redirect to home page after 1 second
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            this.errorMessage = error.response.data.errors
              .map((err) => err.msg)
              .join(", ");
          } else {
            this.errorMessage =
              error.response.data.message ||
              "Registration failed. Please try again.";
          }
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

