# Quick Start Guide - Authentication System

Follow these steps to get your authenticated inventory system running.

## Prerequisites

- MySQL database running
- Node.js installed
- Backend and frontend dependencies installed

## Step-by-Step Setup

### 1. Set Up Database (5 minutes)

```bash
# Connect to MySQL
mysql -u root -p

# Create or use your existing database
USE your_database_name;

# Run the authentication setup script
SOURCE backend/setup_auth.sql;
```

Or copy and paste the SQL from `backend/setup_auth.sql` into your MySQL client.

### 2. Create Admin User (1 minute)

```bash
cd backend
node create_admin.js
```

You should see:
```
✓ Admin user created successfully!
  Username: admin
  Email: admin@example.com
  Password: admin123
```

### 3. Start Backend (1 minute)

The backend is already running with nodemon. If not:

```bash
cd backend
nodemon index.js
```

You should see:
```
✓ Email settings loaded from database
Server running successfully
✓ Email server is ready to send messages
```

### 4. Start Frontend (1 minute)

```bash
cd frontend
npm run serve
```

### 5. Test the System (2 minutes)

1. Open browser to `http://localhost:8080` (or your Vue dev server port)
2. You should be redirected to `/login`
3. Login with:
   - **Username or Email**: `admin` or `admin@example.com`
   - **Password**: `admin123`
4. You should be redirected to the home page
5. You should see a navigation bar with your username and a Logout button

## Verify Everything Works

### Test Authentication Flow

1. ✓ Try accessing `http://localhost:8080/` without logging in → Should redirect to `/login`
2. ✓ Login with admin credentials → Should redirect to home page
3. ✓ Click on any menu item → Should work normally
4. ✓ Click Logout → Should redirect to login page
5. ✓ Try to access `http://localhost:8080/` again → Should redirect to `/login`

### Test Registration

1. Click "Register here" on login page
2. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Full Name: `Test User`
   - Password: `test123`
   - Confirm Password: `test123`
3. Click Register
4. Should automatically login and redirect to home

### Test API Protection

Open browser console and try:

```javascript
// This should fail (no token)
fetch('http://localhost:5000/products')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// This should work (with token from localStorage)
fetch('http://localhost:5000/products', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
  .then(r => r.json())
  .then(console.log);
```

## Common Issues

### Issue: "Cannot find package 'bcryptjs'"
**Solution**: 
```bash
cd backend
npm install
```

### Issue: "Table 'users' doesn't exist"
**Solution**: Run the SQL setup script again (Step 1)

### Issue: Frontend shows blank page
**Solution**: 
1. Check browser console for errors
2. Make sure backend is running on port 5000
3. Clear localStorage: `localStorage.clear()`
4. Refresh the page

### Issue: "Token is not valid"
**Solution**: 
1. Logout and login again
2. Token may have expired (24h default)
3. Clear localStorage and login again

### Issue: CORS errors
**Solution**: Backend already has CORS enabled. If still having issues:
```javascript
// In backend/index.js, the cors() middleware is already configured
app.use(cors());
```

## Next Steps

1. **Change Admin Password**
   - Login as admin
   - Go to Settings or create a change password page
   - Use the `/auth/change-password` endpoint

2. **Update Existing Components** (Optional)
   - See `COMPONENT_UPDATE_GUIDE.md`
   - Replace `axios` imports with the authenticated instance
   - This ensures all requests automatically include auth tokens

3. **Customize**
   - Update JWT secret in production
   - Adjust token expiration time
   - Add more user roles
   - Customize the login/register pages

## Testing Checklist

- [ ] Database table created
- [ ] Admin user created
- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] Can access login page
- [ ] Can login with admin credentials
- [ ] Redirected to home after login
- [ ] Navigation bar shows username
- [ ] Can access all protected routes
- [ ] Can logout successfully
- [ ] Can register new user
- [ ] Protected routes redirect to login when not authenticated

## You're All Set! 🎉

Your inventory management system now has:
- ✓ User authentication
- ✓ Protected routes
- ✓ JWT token-based security
- ✓ Login/Register pages
- ✓ Automatic token handling
- ✓ Role-based access control ready

For detailed information, see `AUTHENTICATION_SETUP.md`

