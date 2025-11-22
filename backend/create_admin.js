// Script to create an admin user with a hashed password
import bcrypt from "bcryptjs";
import db from "./Config/database.js";

const createAdminUser = async () => {
  const adminData = {
    username: "admin",
    email: "admin@example.com",
    password: "admin123", // Change this to your desired password
    full_name: "System Administrator",
    role: "admin",
  };

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Check if admin already exists
    db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [adminData.email, adminData.username],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
          process.exit(1);
        }

        if (results.length > 0) {
          console.log("Admin user already exists!");
          process.exit(0);
        }

        // Insert admin user
        db.query(
          "INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)",
          [
            adminData.username,
            adminData.email,
            hashedPassword,
            adminData.full_name,
            adminData.role,
          ],
          (err, result) => {
            if (err) {
              console.error("Failed to create admin user:", err);
              process.exit(1);
            }

            console.log("✓ Admin user created successfully!");
            console.log("  Username:", adminData.username);
            console.log("  Email:", adminData.email);
            console.log("  Password:", adminData.password);
            console.log("\nIMPORTANT: Change the password after first login!");
            process.exit(0);
          }
        );
      }
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

createAdminUser();

