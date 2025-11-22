-- Authentication Schema for User Management

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

-- Insert default admin user (password: admin123)
-- Note: This is a bcrypt hash of 'admin123' - CHANGE THIS IN PRODUCTION!
INSERT INTO users (username, email, password, full_name, role) VALUES 
  ('admin', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'System Administrator', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Create index for faster lookups
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_username ON users(username);

