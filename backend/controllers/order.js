//import functions from Order model
import {
  getOrders,
  createOrder,
  getOrderStats,
  deleteOrderById,
} from "../Models/OrderModels.js";

//get all orders
export const showOrders = (req, res) => {
  getOrders((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

//create new order
export const placeOrder = (req, res) => {
  const data = req.body;
  createOrder(data, (err, results) => {
    if (err) {
      if (err.message === "Insufficient stock") {
        res.status(400).json({ error: "Insufficient stock available" });
      } else if (err.message === "Product not found") {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.json(results);
    }
  });
};

//get order statistics
export const showOrderStats = (req, res) => {
  getOrderStats((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

//delete order
export const deleteOrder = (req, res) => {
  const id = req.params.id;
  deleteOrderById(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

