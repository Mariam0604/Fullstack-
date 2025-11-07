//import connection
import db from "../Config/database.js";
import { sendLowStockAlert, sendOutOfStockAlert } from "../services/emailService.js";
import { LOW_STOCK_THRESHOLD } from "../Config/emailConfig.js";

//get all products
export const getProducts = (result) => {
  db.query(
    `SELECT p.*, c.category_name 
     FROM product p 
     LEFT JOIN categories c ON p.category_id = c.category_id 
     ORDER BY p.product_id DESC`,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

//get products by category
export const getProductsByCategory = (categoryId, result) => {
  db.query(
    `SELECT p.*, c.category_name 
     FROM product p 
     LEFT JOIN categories c ON p.category_id = c.category_id 
     WHERE p.category_id = ?
     ORDER BY p.product_id DESC`,
    [categoryId],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

//get single product
export const getProductById = (id, result) => {
  db.query(
    `SELECT p.*, c.category_name 
     FROM product p 
     LEFT JOIN categories c ON p.category_id = c.category_id 
     WHERE p.product_id = ?`,
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

//insert product to databased
export const insertProduct = (data, result) => {
  db.query("INSERT INTO product SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update Product to Database
export const updateProductById = (data, id, result) => {
  db.query(
    "UPDATE product SET product_name = ?, product_price = ?, product_quantity = ?, category_id = ? WHERE product_id = ?",
    [data.product_name, data.product_price, data.product_quantity, data.category_id, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// Delete Product to Database
export const deleteProductById = (id, result) => {
  db.query("DELETE FROM product WHERE product_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

/**
 * Check stock level and send email alert if needed
 * @param {number} productId - Product ID to check
 * @param {number} newQuantity - New quantity after update
 */
export const checkAndAlertLowStock = (productId, newQuantity) => {
  // Get product details
  db.query(
    `SELECT p.*, c.category_name 
     FROM product p 
     LEFT JOIN categories c ON p.category_id = c.category_id 
     WHERE p.product_id = ?`,
    [productId],
    async (err, results) => {
      if (err) {
        console.error('Error checking stock level:', err);
        return;
      }

      if (results.length === 0) {
        return;
      }

      const product = results[0];
      
      // Send alert if stock is at or below threshold
      if (newQuantity === 0) {
        console.log(`Product "${product.product_name}" is OUT OF STOCK!`);
        await sendOutOfStockAlert(product);
      } else if (newQuantity <= LOW_STOCK_THRESHOLD) {
        console.log(`Product "${product.product_name}" has low stock: ${newQuantity} units`);
        await sendLowStockAlert(product);
      }
    }
  );
};

/**
 * Get products with low stock
 */
export const getLowStockProducts = (result) => {
  db.query(
    `SELECT p.*, c.category_name 
     FROM product p 
     LEFT JOIN categories c ON p.category_id = c.category_id 
     WHERE p.product_quantity <= ?
     ORDER BY p.product_quantity ASC`,
    [LOW_STOCK_THRESHOLD],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};