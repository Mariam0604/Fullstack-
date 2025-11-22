# Database Setup Instructions

Since you're getting errors with the command line, here are **3 easy methods** to set up the database:

## Method 1: Using MySQL Workbench (Recommended)

1. Open **MySQL Workbench**
2. Connect to your database
3. Click on your `inventory-db` database in the left sidebar
4. Open the SQL file:
   - Click **File** → **Open SQL Script**
   - Navigate to `backend/setup_auth.sql`
   - Click **Open**
5. Click the **Execute** button (lightning bolt icon) or press `Ctrl+Shift+Enter`
6. Done! ✓

## Method 2: Using phpMyAdmin

1. Open **phpMyAdmin** in your browser (usually `http://localhost/phpmyadmin`)
2. Click on `inventory-db` database in the left sidebar
3. Click the **SQL** tab at the top
4. Copy the SQL below and paste it into the text area
5. Click **Go** button
6. Done! ✓

## Method 3: Copy and Paste SQL

Copy this SQL and paste it into any MySQL client you're using:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('admin', 'user') DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_username ON users(username);
```

## Verify It Worked

After running the SQL, verify the table was created:

```sql
SHOW TABLES;
```

You should see `users` in the list.

Check the table structure:

```sql
DESCRIBE users;
```

You should see columns: user_id, username, email, password, full_name, role, is_active, created_at, updated_at

## Next Step

After the database is set up, create the admin user:

```bash
cd backend
node create_admin.js
```

## Troubleshooting

### Error: "Table 'users' already exists"
- **Solution**: Table is already created! You're good to go. Skip to creating admin user.

### Error: "Access denied"
- **Solution**: Make sure you're connected to MySQL with proper credentials

### Error: "Unknown database 'inventory-db'"
- **Solution**: Make sure the `inventory-db` database exists. Create it first:
```sql
CREATE DATABASE IF NOT EXISTS `inventory-db`;
USE `inventory-db`;
```

## Alternative: Run SQL Directly in Node.js

If you prefer, I can create a Node.js script that creates the table automatically. Let me know!

