-- Add Settings Table to Existing Database
-- Run this script in your MySQL database to add the settings functionality

USE `inventory-db`;

-- Create settings table for email configuration
CREATE TABLE IF NOT EXISTS settings (
  setting_id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  description VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings with your current email configuration
INSERT INTO settings (setting_key, setting_value, description) VALUES 
  ('email_service', 'gmail', 'Email service provider (gmail, outlook, yahoo)'),
  ('email_user', 'sonamane06@gmail.com', 'Email address for sending alerts'),
  ('email_password', 'pzml scbm quvw cqvu', 'Email app password'),
  ('alert_email', 'sonamane06@gmail.com', 'Email address to receive alerts'),
  ('low_stock_threshold', '5', 'Quantity threshold for low stock alerts'),
  ('email_enabled', 'true', 'Enable/disable email notifications')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- Verify the settings were inserted
SELECT * FROM settings;

