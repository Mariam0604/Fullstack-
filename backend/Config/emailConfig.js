import nodemailer from 'nodemailer';
import db from './database.js';

// Default configuration (fallback if database is not available)
let EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'sonamane06@gmail.com',
    pass: 'pzml scbm quvw cqvu'
  }
};

let ALERT_EMAIL = 'sonamane06@gmail.com';
let LOW_STOCK_THRESHOLD = 5;
let EMAIL_ENABLED = true;

// Load settings from database
const loadSettingsFromDB = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT setting_key, setting_value FROM settings", (err, results) => {
      if (err) {
        console.log('Could not load settings from database, using defaults:', err.message);
        resolve(false);
      } else {
        results.forEach((row) => {
          switch (row.setting_key) {
            case 'email_service':
              EMAIL_CONFIG.service = row.setting_value;
              break;
            case 'email_user':
              EMAIL_CONFIG.auth.user = row.setting_value;
              break;
            case 'email_password':
              EMAIL_CONFIG.auth.pass = row.setting_value;
              break;
            case 'alert_email':
              ALERT_EMAIL = row.setting_value;
              break;
            case 'low_stock_threshold':
              LOW_STOCK_THRESHOLD = parseInt(row.setting_value) || 5;
              break;
            case 'email_enabled':
              EMAIL_ENABLED = row.setting_value === 'true';
              break;
          }
        });
        console.log('✓ Email settings loaded from database');
        resolve(true);
      }
    });
  });
};

// Initialize settings
await loadSettingsFromDB();

// Export configuration
export { ALERT_EMAIL, LOW_STOCK_THRESHOLD, EMAIL_ENABLED };

// Function to get current settings (for dynamic updates)
export const getCurrentSettings = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT setting_key, setting_value FROM settings", (err, results) => {
      if (err) {
        reject(err);
      } else {
        const settings = {};
        results.forEach((row) => {
          settings[row.setting_key] = row.setting_value;
        });
        resolve(settings);
      }
    });
  });
};

// Create transporter with current config
export const createTransporter = () => {
  return nodemailer.createTransport({
    service: EMAIL_CONFIG.service,
    auth: EMAIL_CONFIG.auth
  });
};

// Initial transporter
export let transporter = createTransporter();

// Function to reload email configuration (call this after settings update)
export const reloadEmailConfig = async () => {
  await loadSettingsFromDB();
  transporter = createTransporter();
  
  // Verify new configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log('Email configuration error:', error);
    } else {
      console.log('✓ Email configuration reloaded and verified');
    }
  });
};

// Verify initial configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠ Email configuration error:', error.message);
    console.log('Please update email settings in the Settings page');
  } else {
    console.log('✓ Email server is ready to send messages');
  }
});
