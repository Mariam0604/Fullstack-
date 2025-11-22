-- Complete Authentication Setup Script
-- Run this script to set up the authentication system

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
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_username ON users(username);

-- Insert default admin user
-- Username: admin
-- Password: admin123
-- IMPORTANT: Change this password after first login!
INSERT INTO users (username, email, password, full_name, role) VALUES 
  ('admin', 'admin@example.com', '$2a$10$YQN5qZ5qZ5qZ5qZ5qZ5qZOXxZ5qZ5qZ5qZ5qZ5qZ5qZ5qZ5qZ5qZu', 'System Administrator', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Note: The password hash above is a placeholder. 
-- You should create a real admin account using the registration endpoint
-- or update this with a proper bcrypt hash.

