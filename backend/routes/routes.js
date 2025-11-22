//import express
import express from "express";
import { body } from "express-validator";

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

//import functions from auth controller
import {
  register,
  login,
  getCurrentUser,
  changePassword,
} from "../controllers/auth.js";

//import auth middleware
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

//init express router
const router = express.Router();

// ===== AUTHENTICATION ROUTES (PUBLIC) =====
// Register new user
router.post(
  "/auth/register",
  [
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);

// Login user
router.post(
  "/auth/login",
  [
    body("login").notEmpty().withMessage("Email or username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// Get current user (protected)
router.get("/auth/me", verifyToken, getCurrentUser);

// Change password (protected)
router.post(
  "/auth/change-password",
  verifyToken,
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  ],
  changePassword
);

// ===== CATEGORY ROUTES (PROTECTED) =====
//get all categories
router.get("/categories", verifyToken, showCategories);

//get single category
router.get("/categories/:id", verifyToken, showCategoryById);

// Create New Category
router.post("/categories", verifyToken, createCategory);

// Update Category
router.put("/categories/:id", verifyToken, updateCategory);

// Delete Category
router.delete("/categories/:id", verifyToken, deleteCategory);

// ===== PRODUCT ROUTES (PROTECTED) =====
//get all product
router.get("/products", verifyToken, showProducts);

//get low stock products
router.get("/products/low-stock/alert", verifyToken, showLowStockProducts);

//get products by category
router.get("/products/category/:categoryId", verifyToken, showProductsByCategory);

//get single product
router.get("/products/:id", verifyToken, showProductById);

// Create New Product
router.post("/products", verifyToken, createProduct);

// Update Product
router.put("/products/:id", verifyToken, updateProduct);

// Delete Product
router.delete("/products/:id", verifyToken, deleteProduct);

// ===== ORDER ROUTES (PROTECTED) =====
//get all orders
router.get("/orders", verifyToken, showOrders);

//get order statistics
router.get("/orders/stats", verifyToken, showOrderStats);

//place new order
router.post("/orders", verifyToken, placeOrder);

//delete order
router.delete("/orders/:id", verifyToken, deleteOrder);

// ===== SETTINGS ROUTES (PROTECTED) =====
//get all settings
router.get("/settings", verifyToken, showSettings);

//get settings as object
router.get("/settings/object", verifyToken, showSettingsObject);

//get single setting
router.get("/settings/:key", verifyToken, showSettingByKey);

//update single setting
router.put("/settings/:key", verifyToken, updateSettingByKey);

//update multiple settings
router.post("/settings/bulk", verifyToken, updateSettings);

//export default router
export default router;