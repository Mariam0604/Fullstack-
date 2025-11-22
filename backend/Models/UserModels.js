// Import database connection
import db from "../Config/database.js";

// Get all users
export const getAllUsers = (callback) => {
  const sql = "SELECT user_id, username, email, full_name, role, is_active, created_at FROM users";
  db.query(sql, callback);
};

// Get user by ID
export const getUserById = (id, callback) => {
  const sql = "SELECT user_id, username, email, full_name, role, is_active, created_at FROM users WHERE user_id = ?";
  db.query(sql, [id], callback);
};

// Get user by email (for login)
export const getUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

// Get user by username (for login)
export const getUserByUsername = (username, callback) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], callback);
};

// Create new user
export const createUser = (data, callback) => {
  const sql = "INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [data.username, data.email, data.password, data.full_name, data.role || 'user'], callback);
};

// Update user
export const updateUser = (id, data, callback) => {
  const sql = "UPDATE users SET username = ?, email = ?, full_name = ?, role = ? WHERE user_id = ?";
  db.query(sql, [data.username, data.email, data.full_name, data.role, id], callback);
};

// Update user password
export const updateUserPassword = (id, hashedPassword, callback) => {
  const sql = "UPDATE users SET password = ? WHERE user_id = ?";
  db.query(sql, [hashedPassword, id], callback);
};

// Delete user
export const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [id], callback);
};

// Toggle user active status
export const toggleUserStatus = (id, callback) => {
  const sql = "UPDATE users SET is_active = NOT is_active WHERE user_id = ?";
  db.query(sql, [id], callback);
};

// Check if email exists
export const checkEmailExists = (email, callback) => {
  const sql = "SELECT COUNT(*) as count FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

// Check if username exists
export const checkUsernameExists = (username, callback) => {
  const sql = "SELECT COUNT(*) as count FROM users WHERE username = ?";
  db.query(sql, [username], callback);
};

