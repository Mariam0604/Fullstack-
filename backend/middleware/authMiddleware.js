// Import JWT
import jwt from "jsonwebtoken";

// JWT Secret (should match the one in auth controller)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user data to request
    req.user = decoded;
    
    // Continue to next middleware/route
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
};

// Middleware to check if user is active
export const isActive = (req, res, next) => {
  if (req.user && req.user.is_active !== false) {
    next();
  } else {
    res.status(403).json({ message: "Account is disabled" });
  }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    // Token invalid but we don't fail the request
    req.user = null;
  }

  next();
};

