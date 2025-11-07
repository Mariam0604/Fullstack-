import { transporter, ALERT_EMAIL, EMAIL_ENABLED } from '../Config/emailConfig.js';

/**
 * Send low stock alert email
 * @param {Object} product - Product information
 * @param {string} product.product_name - Name of the product
 * @param {number} product.product_quantity - Current quantity
 * @param {string} product.category_name - Category name
 */
export const sendLowStockAlert = async (product) => {
  // Check if email notifications are enabled
  if (!EMAIL_ENABLED) {
    console.log('Email notifications are disabled. Skipping low stock alert.');
    return { success: false, message: 'Email notifications disabled' };
  }

  const mailOptions = {
    from: transporter.options.auth.user,
    to: ALERT_EMAIL,
    subject: `⚠️ Low Stock Alert: ${product.product_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">Low Stock Alert</h2>
        <p>The following product has reached low stock levels:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #e74c3c; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">${product.product_name}</h3>
          <p style="margin: 5px 0;"><strong>Category:</strong> ${product.category_name || 'Uncategorized'}</p>
          <p style="margin: 5px 0;"><strong>Current Quantity:</strong> <span style="color: #e74c3c; font-weight: bold;">${product.product_quantity}</span></p>
          <p style="margin: 5px 0;"><strong>Price:</strong> $${product.product_price}</p>
        </div>
        
        <p style="color: #e74c3c; font-weight: bold;">⚠️ Action Required: Please contact your supplier to reorder this product.</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated alert from your Inventory Management System.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Low stock alert email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending low stock alert:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send out of stock alert email
 * @param {Object} product - Product information
 */
export const sendOutOfStockAlert = async (product) => {
  // Check if email notifications are enabled
  if (!EMAIL_ENABLED) {
    console.log('Email notifications are disabled. Skipping out of stock alert.');
    return { success: false, message: 'Email notifications disabled' };
  }

  const mailOptions = {
    from: transporter.options.auth.user,
    to: ALERT_EMAIL,
    subject: `🚨 OUT OF STOCK: ${product.product_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c0392b;">OUT OF STOCK ALERT</h2>
        <p>The following product is now out of stock:</p>
        
        <div style="background-color: #fee; padding: 20px; border-left: 4px solid #c0392b; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">${product.product_name}</h3>
          <p style="margin: 5px 0;"><strong>Category:</strong> ${product.category_name || 'Uncategorized'}</p>
          <p style="margin: 5px 0;"><strong>Current Quantity:</strong> <span style="color: #c0392b; font-weight: bold;">0</span></p>
          <p style="margin: 5px 0;"><strong>Price:</strong> $${product.product_price}</p>
        </div>
        
        <p style="color: #c0392b; font-weight: bold;">🚨 URGENT: This product is out of stock. Immediate reorder required!</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated alert from your Inventory Management System.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Out of stock alert email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending out of stock alert:', error);
    return { success: false, error: error.message };
  }
};

