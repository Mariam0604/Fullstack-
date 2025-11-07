//import express
import express from "express";

//import functions from product controller
import {
  showProducts,
  showProductById,
  showProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  showLowStockProducts,
} from "../controllers/product.js";

//import functions from category controller
import {
  showCategories,
  showCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

//import functions from order controller
import {
  showOrders,
  placeOrder,
  showOrderStats,
  deleteOrder,
} from "../controllers/order.js";

//import functions from settings controller
import {
  showSettings,
  showSettingsObject,
  showSettingByKey,
  updateSettingByKey,
  updateSettings,
} from "../controllers/settings.js";

//init express router
const router = express.Router();

// ===== CATEGORY ROUTES =====
//get all categories
router.get("/categories", showCategories);

//get single category
router.get("/categories/:id", showCategoryById);

// Create New Category
router.post("/categories", createCategory);

// Update Category
router.put("/categories/:id", updateCategory);

// Delete Category
router.delete("/categories/:id", deleteCategory);

// ===== PRODUCT ROUTES =====
//get all product
router.get("/products", showProducts);

//get low stock products
router.get("/products/low-stock/alert", showLowStockProducts);

//get products by category
router.get("/products/category/:categoryId", showProductsByCategory);

//get single product
router.get("/products/:id", showProductById);

// Create New Product
router.post("/products", createProduct);

// Update Product
router.put("/products/:id", updateProduct);

// Delete Product
router.delete("/products/:id", deleteProduct);

// ===== ORDER ROUTES =====
//get all orders
router.get("/orders", showOrders);

//get order statistics
router.get("/orders/stats", showOrderStats);

//place new order
router.post("/orders", placeOrder);

//delete order
router.delete("/orders/:id", deleteOrder);

// ===== SETTINGS ROUTES =====
//get all settings
router.get("/settings", showSettings);

//get settings as object
router.get("/settings/object", showSettingsObject);

//get single setting
router.get("/settings/:key", showSettingByKey);

//update single setting
router.put("/settings/:key", updateSettingByKey);

//update multiple settings
router.post("/settings/bulk", updateSettings);

//export default router
export default router;