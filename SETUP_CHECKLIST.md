# Authentication Setup Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Setup Checklist

- [ ] MySQL database is running
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] You know your database name and credentials

## 🔧 Setup Steps

### Step 1: Database Setup
- [ ] Connected to MySQL database
- [ ] Ran `backend/setup_auth.sql` script
- [ ] Verified `users` table exists
- [ ] Checked table has correct columns (user_id, username, email, password, role, etc.)

**Command:**
```bash
mysql -u root -p your_database < backend/setup_auth.sql
```

### Step 2: Create Admin User
- [ ] Navigated to backend folder
- [ ] Ran `node create_admin.js`
- [ ] Saw success message with credentials
- [ ] Noted down the admin credentials

**Command:**
```bash
cd backend
node create_admin.js
```

**Expected Output:**
```
✓ Admin user created successfully!
  Username: admin
  Email: admin@example.com
  Password: admin123
```

### Step 3: Backend Verification
- [ ] Backend is running (nodemon index.js)
- [ ] No errors in console
- [ ] Server shows "Server running successfully"
- [ ] Port 5000 is accessible

**Check:**
```bash
# Backend should be running already
# If not:
cd backend
nodemon index.js
```

### Step 4: Frontend Verification
- [ ] Frontend is running (npm run serve)
- [ ] No errors in console
- [ ] Can access http://localhost:8080 (or your port)

**Command:**
```bash
cd frontend
npm run serve
```

## ✅ Testing Checklist

### Basic Authentication Tests

#### Test 1: Login Page Access
- [ ] Open browser to http://localhost:8080
- [ ] Automatically redirected to /login
- [ ] Login page displays correctly
- [ ] No console errors

#### Test 2: Admin Login
- [ ] Enter username: `admin`
- [ ] Enter password: `admin123`
- [ ] Click "Login" button
- [ ] Successfully redirected to home page
- [ ] Navigation bar appears at top
- [ ] Username "admin" shown in navbar
- [ ] No console errors

#### Test 3: Protected Routes
- [ ] Click on "All Products" in navbar
- [ ] Page loads successfully
- [ ] Click on "Add Product"
- [ ] Page loads successfully
- [ ] Click on "Settings"
- [ ] Page loads successfully
- [ ] Try other menu items
- [ ] All pages load without redirecting to login

#### Test 4: Logout
- [ ] Click "Logout" button in navbar
- [ ] Redirected to /login page
- [ ] Navigation bar disappears
- [ ] Try accessing http://localhost:8080/
- [ ] Redirected back to /login

#### Test 5: Registration
- [ ] On login page, click "Register here"
- [ ] Redirected to /register page
- [ ] Fill in registration form:
  - [ ] Username: `testuser`
  - [ ] Email: `test@example.com`
  - [ ] Full Name: `Test User`
  - [ ] Password: `test123`
  - [ ] Confirm Password: `test123`
- [ ] Click "Register" button
- [ ] Success message appears
- [ ] Automatically logged in
- [ ] Redirected to home page

#### Test 6: New User Login
- [ ] Logout
- [ ] Login with test user credentials
  - [ ] Email: `test@example.com`
  - [ ] Password: `test123`
- [ ] Successfully logged in
- [ ] Username "testuser" shown in navbar

### Advanced Tests

#### Test 7: Direct URL Access (Not Logged In)
- [ ] Logout if logged in
- [ ] Try to access: http://localhost:8080/products
- [ ] Redirected to /login
- [ ] Try to access: http://localhost:8080/settings
- [ ] Redirected to /login

#### Test 8: API Protection
- [ ] Open browser console (F12)
- [ ] Run this command (should fail):
```javascript
fetch('http://localhost:5000/products').then(r => r.json()).then(console.log)
```
- [ ] Should see 401 or authentication error
- [ ] Login to the app
- [ ] Run this command (should work):
```javascript
fetch('http://localhost:5000/products', {
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
}).then(r => r.json()).then(console.log)
```
- [ ] Should see products data

#### Test 9: Token in localStorage
- [ ] Login to app
- [ ] Open browser console (F12)
- [ ] Go to Application/Storage tab
- [ ] Check localStorage
- [ ] Should see `token` key with JWT value
- [ ] Should see `user` key with user data
- [ ] Logout
- [ ] Check localStorage again
- [ ] Both keys should be removed

#### Test 10: Invalid Credentials
- [ ] Try to login with wrong password
- [ ] Error message appears
- [ ] Not logged in
- [ ] Try to login with non-existent email
- [ ] Error message appears
- [ ] Not logged in

#### Test 11: Password Validation
- [ ] Go to register page
- [ ] Try password less than 6 characters
- [ ] Should show error or prevent registration
- [ ] Try passwords that don't match
- [ ] Should show error

#### Test 12: Mobile Responsiveness
- [ ] Login to app
- [ ] Resize browser to mobile size
- [ ] Navbar should show hamburger menu
- [ ] Click hamburger menu
- [ ] Menu items appear
- [ ] Click menu item
- [ ] Menu closes
- [ ] Page navigates correctly

## 🔍 Verification Checklist

### Database Verification
- [ ] Users table exists
- [ ] Admin user exists in users table
- [ ] Test user exists in users table (after registration)
- [ ] Passwords are hashed (not plain text)

**SQL Check:**
```sql
SELECT user_id, username, email, role, is_active FROM users;
```

### Backend Verification
- [ ] All auth routes respond correctly:
  - [ ] POST /auth/register
  - [ ] POST /auth/login
  - [ ] GET /auth/me (with token)
- [ ] Protected routes require token:
  - [ ] GET /products (401 without token)
  - [ ] GET /categories (401 without token)
  - [ ] GET /orders (401 without token)

### Frontend Verification
- [ ] Login page exists at /login
- [ ] Register page exists at /register
- [ ] All routes redirect to /login when not authenticated
- [ ] Navbar shows when logged in
- [ ] Navbar hides when logged out
- [ ] Logout button works

### File Verification
- [ ] backend/Models/UserModels.js exists
- [ ] backend/controllers/auth.js exists
- [ ] backend/middleware/authMiddleware.js exists
- [ ] backend/routes/routes.js updated
- [ ] frontend/src/views/Login.vue exists
- [ ] frontend/src/views/Register.vue exists
- [ ] frontend/src/utils/auth.js exists
- [ ] frontend/src/utils/axios.js exists
- [ ] frontend/src/App.vue updated
- [ ] frontend/src/router/Index.js updated

## 🚨 Common Issues Checklist

If something doesn't work, check:

### Issue: Can't create users table
- [ ] Database exists
- [ ] Have correct permissions
- [ ] SQL syntax is correct
- [ ] No typos in table name

### Issue: Can't create admin user
- [ ] Users table exists
- [ ] Backend can connect to database
- [ ] No existing admin user
- [ ] bcryptjs is installed

### Issue: Can't login
- [ ] Backend is running
- [ ] Users table has data
- [ ] Credentials are correct
- [ ] No typos in username/password
- [ ] Check backend console for errors

### Issue: Redirected to login immediately after login
- [ ] Check browser console for errors
- [ ] Check if token is saved in localStorage
- [ ] Check backend console for errors
- [ ] Try clearing localStorage and login again

### Issue: API returns 401
- [ ] Token exists in localStorage
- [ ] Token is valid (not expired)
- [ ] Authorization header is set
- [ ] Backend middleware is working

### Issue: CORS errors
- [ ] Backend has cors() middleware
- [ ] Backend is running on port 5000
- [ ] Frontend is making requests to correct URL

## ✨ Success Criteria

You've successfully set up authentication when:

- ✅ Can register new users
- ✅ Can login with credentials
- ✅ Redirected to login when not authenticated
- ✅ Can access all routes when authenticated
- ✅ Navbar shows username when logged in
- ✅ Can logout successfully
- ✅ API requests include authentication token
- ✅ Protected routes return 401 without token
- ✅ Token stored in localStorage
- ✅ No console errors

## 📝 Post-Setup Tasks

After everything works:

- [ ] Change admin password
- [ ] Delete test user (optional)
- [ ] Set up environment variables for production
- [ ] Update JWT secret
- [ ] Review security settings
- [ ] Update components to use authenticated axios (optional)
- [ ] Customize login/register pages (optional)

## 🎉 Completion

- [ ] All setup steps completed
- [ ] All basic tests passed
- [ ] All advanced tests passed
- [ ] All verifications passed
- [ ] No issues remaining
- [ ] Post-setup tasks completed

**Congratulations! Your authentication system is fully set up and working!** 🎊

## 📚 Next Steps

1. Read `README_AUTHENTICATION.md` for overview
2. Check `AUTHENTICATION_SETUP.md` for detailed docs
3. See `COMPONENT_UPDATE_GUIDE.md` to update existing components
4. Review `AUTHENTICATION_FLOW.md` to understand how it works

## 💡 Need Help?

If you encounter any issues:
1. Check this checklist again
2. Review the troubleshooting section in `AUTHENTICATION_SETUP.md`
3. Check browser console for errors
4. Check backend console for errors
5. Verify database connection and data

