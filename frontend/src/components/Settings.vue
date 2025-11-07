<template>
  <div>
    <h2 class="title is-4">Email Services</h2>

    <div class="box">
      <div class="field">
        <label class="label">Low Stock Threshold</label>
        <div class="control">
          <input
            class="input"
            type="number"
            min="1"
            v-model.number="threshold"
          />
        </div>
        <p class="help">Alert when quantity reaches this number</p>
      </div>

      <div class="field">
        <label class="checkbox">
          <input type="checkbox" v-model="emailEnabled" />
          Enable Email Notifications
        </label>
      </div>
    </div>

    <div class="buttons">
      <button 
        class="button is-info" 
        @click="testEmail"
        :class="{ 'is-loading': testing }"
      >
        Test Email
      </button>

      <button 
        class="button is-success" 
        @click="saveSettings"
        :class="{ 'is-loading': saving }"
      >
        Save
      </button>

      <router-link :to="{ name: 'Home' }" class="button is-light">
        Back
      </router-link>
    </div>

    <div v-if="message" class="notification" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      threshold: 5,
      emailEnabled: true,
      saving: false,
      testing: false,
      message: '',
      messageClass: ''
    };
  },
  created() {
    this.loadSettings();
  },
  methods: {
    async loadSettings() {
      try {
        const response = await axios.get("http://localhost:5000/settings/object");
        this.threshold = parseInt(response.data.low_stock_threshold) || 5;
        this.emailEnabled = response.data.email_enabled === 'true';
      } catch (err) {
        console.error(err);
      }
    },
    
    async saveSettings() {
      this.saving = true;
      this.message = '';
      
      try {
        await axios.post("http://localhost:5000/settings/bulk", {
          settings: [
            { key: 'low_stock_threshold', value: this.threshold.toString() },
            { key: 'email_enabled', value: this.emailEnabled ? 'true' : 'false' }
          ]
        });

        this.message = '✓ Settings saved successfully';
        this.messageClass = 'is-success';
        
      } catch (err) {
        console.error(err);
        this.message = '✗ Error saving settings';
        this.messageClass = 'is-danger';
      } finally {
        this.saving = false;
        setTimeout(() => this.message = '', 3000);
      }
    },

    async testEmail() {
      this.testing = true;
      this.message = '';

      try {
        // Just save settings and show message
        await axios.post("http://localhost:5000/settings/bulk", {
          settings: [
            { key: 'low_stock_threshold', value: this.threshold.toString() },
            { key: 'email_enabled', value: this.emailEnabled ? 'true' : 'false' }
          ]
        });

        this.message = '✓ Email configuration updated. Place an order with low stock to test.';
        this.messageClass = 'is-info';

      } catch (err) {
        console.error(err);
        this.message = '✗ Error testing email';
        this.messageClass = 'is-danger';
      } finally {
        this.testing = false;
        setTimeout(() => this.message = '', 5000);
      }
    }
  }
};
</script>

<style scoped>
.box {
  max-width: 500px;
}
</style>
