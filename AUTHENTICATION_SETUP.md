# Authentication System Setup Guide

This guide will help you set up the authentication system for your inventory management application.

## Overview

The authentication system includes:
- User registration and login
- JWT token-based authentication
- Protected routes (both frontend and backend)
- Role-based access control (admin/user)
- Secure password hashing with bcrypt

## Installation Steps

### 1. Database Setup

Run the SQL script to create the users table:

```bash
# Connect to your MySQL database and run:
mysql -u your_username -p your_database < backend/setup_auth.sql
```

Or manually execute the SQL in your database client:
- Open `backend/setup_auth.sql`
- Execute the SQL commands in your MySQL database

### 2. Create Admin User

Run the admin creation script:

```bash
cd backend
node create_admin.js
```

This will create a default admin user:
- **Username**: `admin`
- **Email**: `admin@example.com`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change this password after first login!

### 3. Backend Configuration

The backend is already configured with all necessary dependencies:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `express-validator` - Input validation

All routes are now protected with authentication middleware.

### 4. Frontend Configuration

The frontend has been updated with:
- Login and Register pages
- Authentication utilities
- Route guards
- Axios interceptor for automatic token handling

### 5. Environment Variables (Optional but Recommended)

Create a `.env` file in the backend directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
```

Update `backend/controllers/auth.js` and `backend/middleware/authMiddleware.js` to use:
```javascript
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
```

## How to Use

### 1. Start the Backend

```bash
cd backend
nodemon index.js
```

### 2. Start the Frontend

```bash
cd frontend
npm run serve
```

### 3. Access the Application

1. Open your browser to `http://localhost:8080` (or your Vue dev server port)
2. You'll be redirected to the login page
3. Use the admin credentials to login, or register a new account

## API Endpoints

### Public Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Protected Endpoints (Require Authentication Token)

All existing endpoints now require authentication:
- `/categories/*` - Category management
- `/products/*` - Product management
- `/orders/*` - Order management
- `/settings/*` - Settings management

### Authentication Endpoints

- `GET /auth/me` - Get current user info (requires token)
- `POST /auth/change-password` - Change password (requires token)

## Frontend Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Require Login)
- `/` - Home/Dashboard
- `/all-products` - Product list
- `/create` - Add product
- `/edit/:id` - Edit product
- `/add-category` - Add category
- `/category/:id/:name` - Category products
- `/place-order` - Place order
- `/order-history` - Order history
- `/settings` - Settings

## How Authentication Works

### Backend

1. User logs in with credentials
2. Server validates credentials and generates JWT token
3. Token is sent to client
4. Client includes token in `Authorization` header for all requests
5. Server validates token using middleware before processing requests

### Frontend

1. User logs in via `/login` page
2. Token is stored in localStorage
3. Axios interceptor automatically adds token to all requests
4. Route guards check authentication before navigating
5. If token is invalid/expired, user is redirected to login

## Token Structure

JWT tokens contain:
```json
{
  "user_id": 1,
  "email": "user@example.com",
  "username": "username",
  "role": "admin"
}
```

## Security Features

✓ Passwords are hashed with bcrypt (10 salt rounds)
✓ JWT tokens expire after 24 hours
✓ All API routes are protected with authentication middleware
✓ Frontend routes are protected with navigation guards
✓ Automatic logout on token expiration
✓ Role-based access control ready (admin/user)

## Customization

### Change Token Expiration

In `backend/controllers/auth.js`:
```javascript
const JWT_EXPIRES_IN = "24h"; // Change to "1h", "7d", etc.
```

### Add More User Roles

Update the users table enum:
```sql
ALTER TABLE users MODIFY role ENUM('admin', 'user', 'manager', 'viewer') DEFAULT 'user';
```

### Customize Password Requirements

In `backend/routes/routes.js`, update validation:
```javascript
body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
```

## Troubleshooting

### "Token is not valid" error
- Token may have expired (24h default)
- User needs to login again
- Check if JWT_SECRET matches between token creation and verification

### "Cannot find package 'bcryptjs'" error
- Run `npm install` in backend directory
- Ensure all dependencies are installed

### Frontend redirects to login immediately
- Check if token is stored in localStorage
- Verify backend is running and accessible
- Check browser console for errors

### CORS errors
- Ensure backend CORS is configured correctly
- Backend should allow requests from frontend origin

## Next Steps

1. **Change default admin password**
2. **Set up environment variables for production**
3. **Consider adding email verification**
4. **Implement password reset functionality**
5. **Add refresh tokens for better security**
6. **Implement rate limiting for login attempts**

## Support

If you encounter any issues:
1. Check backend console for errors
2. Check browser console for frontend errors
3. Verify database connection
4. Ensure all dependencies are installed
5. Check that ports 5000 (backend) and 8080 (frontend) are available

