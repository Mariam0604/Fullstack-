# Component Update Guide for Authentication

This guide shows how to update your existing components to use the authenticated axios instance.

## Quick Update

Replace all instances of:
```javascript
import axios from "axios";
```

With:
```javascript
import axios from "../utils/axios";
```

This will automatically add authentication tokens to all requests.

## Example Updates

### Before (ProductList.vue)

```javascript
import axios from "axios";

export default {
  methods: {
    async getProducts() {
      const response = await axios.get("http://localhost:5000/products");
      this.items = response.data;
    }
  }
}
```

### After (ProductList.vue)

```javascript
import axios from "../utils/axios";

export default {
  methods: {
    async getProducts() {
      try {
        const response = await axios.get("/products");
        this.items = response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          // User will be automatically redirected to login
          console.log("Authentication required");
        }
      }
    }
  }
}
```

## Components to Update

Update the axios import in these files:

### Components
- ✓ `frontend/src/components/ProductList.vue`
- ✓ `frontend/src/components/AddProduct.vue`
- ✓ `frontend/src/components/EditProduct.vue`
- ✓ `frontend/src/components/CategoryList.vue`
- ✓ `frontend/src/components/AddCategory.vue`
- ✓ `frontend/src/components/PlaceOrder.vue`
- ✓ `frontend/src/components/OrderHistory.vue`
- ✓ `frontend/src/components/Settings.vue`
- ✓ `frontend/src/components/CategoryProducts.vue`

### Views
- ✓ `frontend/src/views/Home.vue`
- ✓ `frontend/src/views/Index.vue`
- ✓ `frontend/src/views/Create.vue`
- ✓ `frontend/src/views/Edit.vue`

## Benefits of Using Authenticated Axios Instance

1. **Automatic Token Injection**: No need to manually add Authorization headers
2. **Automatic Logout**: Expired tokens trigger automatic logout and redirect
3. **Centralized Configuration**: Base URL and headers configured in one place
4. **Error Handling**: Consistent error handling across all requests

## Alternative: Manual Token Handling

If you prefer to keep using the standard axios, you can manually add tokens:

```javascript
import axios from "axios";
import { getAuthHeader } from "../utils/auth";

// In your method:
const response = await axios.get("http://localhost:5000/products", {
  headers: getAuthHeader()
});
```

But using the axios instance is recommended for consistency and less code.

