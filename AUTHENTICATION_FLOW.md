# Authentication Flow Diagram

## Visual Overview of How Authentication Works

### 1. User Registration Flow

```
User fills form → Frontend validates → POST /auth/register
                                              ↓
                                       Backend validates
                                              ↓
                                       Hash password (bcrypt)
                                              ↓
                                       Save to database
                                              ↓
                                       Generate JWT token
                                              ↓
Frontend receives token → Store in localStorage → Redirect to home
```

### 2. User Login Flow

```
User enters credentials → POST /auth/login
                                ↓
                         Backend validates
                                ↓
                         Compare password (bcrypt)
                                ↓
                         Generate JWT token
                                ↓
Frontend receives token → Store in localStorage → Redirect to home
```

### 3. Accessing Protected Routes (Frontend)

```
User clicks link → Router checks meta.requiresAuth
                            ↓
                   Token in localStorage?
                    ↓              ↓
                  YES             NO
                    ↓              ↓
              Allow access    Redirect to /login
```

### 4. Making API Requests

```
Component makes request → Axios interceptor adds token
                                    ↓
                          Authorization: Bearer <token>
                                    ↓
                          Backend receives request
                                    ↓
                          verifyToken middleware
                                    ↓
                          Valid token?
                    ↓                        ↓
                  YES                       NO
                    ↓                        ↓
            Process request           Return 401
                    ↓                        ↓
            Return data              Frontend intercepts
                    ↓                        ↓
            Component receives       Logout user
                                            ↓
                                    Redirect to /login
```

### 5. Logout Flow

```
User clicks logout → Clear localStorage (token + user)
                            ↓
                    Redirect to /login
```

### 6. Token Expiration Flow

```
Token expires (24h) → User makes request
                            ↓
                    Backend returns 401
                            ↓
                    Axios interceptor catches
                            ↓
                    Clear localStorage
                            ↓
                    Redirect to /login
```

## File Structure

```
backend/
├── Config/
│   ├── database.js              # Database connection
│   └── emailConfig.js           # Email configuration
├── controllers/
│   ├── auth.js                  # 🆕 Authentication logic
│   ├── category.js
│   ├── order.js
│   ├── product.js
│   └── settings.js
├── middleware/
│   └── authMiddleware.js        # 🆕 Token verification
├── Models/
│   ├── UserModels.js            # 🆕 User database operations
│   ├── CategoryModels.js
│   ├── OrderModels.js
│   ├── ProductModels.js
│   └── SettingsModels.js
├── routes/
│   └── routes.js                # ✏️ Updated with auth routes
├── services/
│   └── emailService.js
├── auth_schema.sql              # 🆕 Users table schema
├── setup_auth.sql               # 🆕 Complete setup script
├── create_admin.js              # 🆕 Admin creation script
├── database_schema.sql
├── index.js
└── package.json                 # ✏️ Updated with new packages

frontend/
├── src/
│   ├── components/
│   │   ├── AddCategory.vue
│   │   ├── AddProduct.vue
│   │   ├── CategoryList.vue
│   │   ├── CategoryProducts.vue
│   │   ├── EditProduct.vue
│   │   ├── OrderHistory.vue
│   │   ├── PlaceOrder.vue
│   │   ├── ProductList.vue
│   │   └── Settings.vue
│   ├── router/
│   │   └── Index.js             # ✏️ Updated with guards
│   ├── utils/
│   │   ├── auth.js              # 🆕 Auth utilities
│   │   └── axios.js             # 🆕 Authenticated axios
│   ├── views/
│   │   ├── Login.vue            # 🆕 Login page
│   │   ├── Register.vue         # 🆕 Register page
│   │   ├── Home.vue
│   │   ├── Index.vue
│   │   ├── Create.vue
│   │   ├── Edit.vue
│   │   └── ...
│   ├── App.vue                  # ✏️ Updated with navbar
│   └── main.js
└── package.json

Documentation/
├── README_AUTHENTICATION.md     # 🆕 Start here!
├── QUICK_START.md              # 🆕 Setup guide
├── AUTHENTICATION_SETUP.md     # 🆕 Technical docs
├── AUTHENTICATION_SUMMARY.md   # 🆕 Changes overview
├── AUTHENTICATION_FLOW.md      # 🆕 This file
└── COMPONENT_UPDATE_GUIDE.md   # 🆕 Component updates

Legend:
🆕 = New file
✏️ = Modified file
```

## Request/Response Examples

### Registration Request

```http
POST /auth/register HTTP/1.1
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

### Registration Response

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 2,
    "username": "john",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

### Login Request

```http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
  "login": "john@example.com",
  "password": "password123"
}
```

### Login Response

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 2,
    "username": "john",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

### Protected Request

```http
GET /products HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Unauthorized Response

```json
{
  "message": "No token, authorization denied"
}
```

or

```json
{
  "message": "Token is not valid"
}
```

## State Management

### localStorage Structure

```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": "{\"user_id\":1,\"username\":\"admin\",\"email\":\"admin@example.com\",\"role\":\"admin\"}"
}
```

### JWT Token Payload

```json
{
  "user_id": 1,
  "email": "admin@example.com",
  "username": "admin",
  "role": "admin",
  "iat": 1699564800,
  "exp": 1699651200
}
```

## Security Checklist

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens signed with secret
- ✅ Tokens expire after 24 hours
- ✅ All API routes protected
- ✅ Frontend routes protected
- ✅ Automatic logout on invalid token
- ✅ Input validation on all endpoints
- ✅ CORS enabled for frontend
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (Vue.js automatic escaping)

## Common Scenarios

### Scenario 1: New User Registration
1. User visits site → Redirected to /login
2. Clicks "Register here"
3. Fills form and submits
4. Account created, automatically logged in
5. Redirected to home page

### Scenario 2: Returning User
1. User visits site → Redirected to /login
2. Enters credentials
3. Logged in successfully
4. Redirected to home page
5. Can access all features

### Scenario 3: Token Expiration
1. User logged in and using app
2. 24 hours pass
3. User clicks on something
4. API returns 401
5. Automatically logged out
6. Redirected to login page
7. User logs in again

### Scenario 4: Manual Logout
1. User clicks "Logout" button
2. Token cleared from localStorage
3. Redirected to login page
4. Cannot access protected routes

### Scenario 5: Direct URL Access
1. User tries to access http://localhost:8080/products
2. Not logged in
3. Router guard checks authentication
4. Redirected to /login
5. After login, can access /products

## Troubleshooting Flow

```
Problem: Can't login
    ↓
Check: Is backend running?
    ↓
Check: Does users table exist?
    ↓
Check: Does user exist in database?
    ↓
Check: Is password correct?
    ↓
Check: Browser console for errors
    ↓
Check: Network tab for API response

Problem: Redirected to login immediately
    ↓
Check: Is token in localStorage?
    ↓
Check: Is token valid? (not expired)
    ↓
Check: Backend console for errors
    ↓
Try: Clear localStorage and login again

Problem: API returns 401
    ↓
Check: Token in Authorization header?
    ↓
Check: Token format: "Bearer <token>"
    ↓
Check: JWT_SECRET matches in auth.js and authMiddleware.js
    ↓
Try: Logout and login again
```

## Summary

This authentication system provides:
- 🔒 Secure user authentication
- 🎫 JWT token-based authorization
- 🛡️ Protected routes (frontend & backend)
- 🔄 Automatic token handling
- 👤 User registration and login
- 🚪 Logout functionality
- ⏰ Token expiration handling
- 📱 Mobile-responsive UI

All implemented and ready to use!

