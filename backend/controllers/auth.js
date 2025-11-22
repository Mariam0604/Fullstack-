// Import required modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Import user model functions
import {
  getUserByEmail,
  getUserByUsername,
  createUser,
  checkEmailExists,
  checkUsernameExists,
  getUserById,
} from "../Models/UserModels.js";

// JWT Secret (In production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_EXPIRES_IN = "24h";

// Register new user
export const register = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, full_name, role } = req.body;

  try {
    // Check if email already exists
    checkEmailExists(email, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results[0].count > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Check if username already exists
      checkUsernameExists(username, async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error", error: err });
        }

        if (results[0].count > 0) {
          return res.status(400).json({ message: "Username already taken" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user data
        const userData = {
          username,
          email,
          password: hashedPassword,
          full_name: full_name || username,
          role: role || "user",
        };

        // Insert user into database
        createUser(userData, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Failed to create user", error: err });
          }

          // Generate JWT token
          const token = jwt.sign(
            { user_id: result.insertId, email, username, role: userData.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
          );

          res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
              user_id: result.insertId,
              username,
              email,
              full_name: userData.full_name,
              role: userData.role,
            },
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { login, password } = req.body; // login can be email or username

  try {
    // Check if login is email or username
    const isEmail = login.includes("@");
    const getUserFunction = isEmail ? getUserByEmail : getUserByUsername;

    getUserFunction(login, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];

      // Check if user is active
      if (!user.is_active) {
        return res.status(403).json({ message: "Account is disabled" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify token and get current user
export const getCurrentUser = (req, res) => {
  // User data is attached to req by auth middleware
  getUserById(req.user.user_id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    res.json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        is_active: user.is_active,
      },
    });
  });
};

// Change password
export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;
  const userId = req.user.user_id;

  try {
    getUserById(userId, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      const { updateUserPassword } = await import("../Models/UserModels.js");
      updateUserPassword(userId, hashedPassword, (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to update password", error: err });
        }

        res.json({ message: "Password changed successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

