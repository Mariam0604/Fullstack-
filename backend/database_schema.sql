-- Database Schema for Category-based Inventory System

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop existing product table if you want to recreate it
-- DROP TABLE IF EXISTS product;

-- Create product table with category support
CREATE TABLE IF NOT EXISTS product (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(200) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  product_quantity INT NOT NULL DEFAULT 0,
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- If you already have a product table, use these ALTER statements instead:
-- ALTER TABLE product ADD COLUMN product_quantity INT NOT NULL DEFAULT 0;
-- ALTER TABLE product ADD COLUMN category_id INT;
-- ALTER TABLE product ADD FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL;

-- Insert some sample categories (optional)
INSERT INTO categories (category_name) VALUES 
  ('Clothes'),
  ('Accessories')
ON DUPLICATE KEY UPDATE category_name = category_name;

-- Create orders table for tracking sales
CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity_ordered INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  customer_name VARCHAR(200),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- Create settings table for email configuration
CREATE TABLE IF NOT EXISTS settings (
  setting_id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  description VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description) VALUES 
  ('email_service', 'gmail', 'Email service provider (gmail, outlook, yahoo)'),
  ('email_user', 'your-email@gmail.com', 'Email address for sending alerts'),
  ('email_password', 'your-app-password', 'Email app password'),
  ('alert_email', 'your-email@gmail.com', 'Email address to receive alerts'),
  ('low_stock_threshold', '5', 'Quantity threshold for low stock alerts'),
  ('email_enabled', 'true', 'Enable/disable email notifications')
ON DUPLICATE KEY UPDATE setting_key = setting_key;