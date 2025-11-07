//import connection
import db from "../Config/database.js";
import { checkAndAlertLowStock } from "./ProductModels.js";

//get all orders
export const getOrders = (result) => {
  db.query(
    `SELECT o.*, c.category_name 
     FROM orders o 
     LEFT JOIN product p ON o.product_id = p.product_id
     LEFT JOIN categories c ON p.category_id = c.category_id
     ORDER BY o.order_date DESC`,
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

//create order and update stock
export const createOrder = (data, result) => {
  // Start transaction
  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return result(err, null);
    }

    // First, check if product has enough stock
    db.query(
      "SELECT product_quantity, product_name, product_price FROM product WHERE product_id = ?",
      [data.product_id],
      (err, products) => {
        if (err) {
          return db.rollback(() => {
            console.log(err);
            result(err, null);
          });
        }

        if (products.length === 0) {
          return db.rollback(() => {
            result(new Error("Product not found"), null);
          });
        }

        const product = products[0];
        
        if (product.product_quantity < data.quantity_ordered) {
          return db.rollback(() => {
            result(new Error("Insufficient stock"), null);
          });
        }

        // Calculate total price
        const totalPrice = product.product_price * data.quantity_ordered;

        // Insert order
        const orderData = {
          product_id: data.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          quantity_ordered: data.quantity_ordered,
          total_price: totalPrice,
          customer_name: data.customer_name || "Walk-in Customer"
        };

        db.query("INSERT INTO orders SET ?", [orderData], (err, orderResult) => {
          if (err) {
            return db.rollback(() => {
              console.log(err);
              result(err, null);
            });
          }

          // Update product quantity
          const newQuantity = product.product_quantity - data.quantity_ordered;
          db.query(
            "UPDATE product SET product_quantity = ? WHERE product_id = ?",
            [newQuantity, data.product_id],
            (err, updateResult) => {
              if (err) {
                return db.rollback(() => {
                  console.log(err);
                  result(err, null);
                });
              }

              // Commit transaction
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.log(err);
                    result(err, null);
                  });
                }
                
                // Check stock level and send alert if needed
                checkAndAlertLowStock(data.product_id, newQuantity);
                
                result(null, { orderId: orderResult.insertId, newQuantity: newQuantity });
              });
            }
          );
        });
      }
    );
  });
};

//get order statistics
export const getOrderStats = (result) => {
  db.query(
    `SELECT 
      COUNT(*) as total_orders,
      SUM(quantity_ordered) as total_items_sold,
      SUM(total_price) as total_revenue
     FROM orders`,
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

//delete order (admin only - does not restore stock)
export const deleteOrderById = (id, result) => {
  db.query("DELETE FROM orders WHERE order_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

