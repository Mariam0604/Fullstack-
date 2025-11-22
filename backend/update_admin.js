// Script to update admin user email and password
import bcrypt from "bcryptjs";
import db from "./Config/database.js";

const updateAdmin = async () => {
  // CHANGE THESE TO YOUR PREFERRED CREDENTIALS
  const newCredentials = {
    email: "sonamane06@gmail.com",        // Change this to your email
    password: "020406aA",          // Change this to your password
    username: "admin",                      // Keep as admin or change
    full_name: "Ouattara Mariam"                  // Change to your name
  };

  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newCredentials.password, salt);

    // Update the admin user
    db.query(
      "UPDATE users SET email = ?, password = ?, username = ?, full_name = ? WHERE role = 'admin'",
      [
        newCredentials.email,
        hashedPassword,
        newCredentials.username,
        newCredentials.full_name
      ],
      (err, result) => {
        if (err) {
          console.error("Failed to update admin user:", err);
          process.exit(1);
        }

        if (result.affectedRows === 0) {
          console.log("❌ No admin user found to update");
          process.exit(1);
        }

        console.log("✓ Admin user updated successfully!");
        console.log("  Email:", newCredentials.email);
        console.log("  Username:", newCredentials.username);
        console.log("  Password:", newCredentials.password);
        console.log("\nYou can now login with these new credentials!");
        process.exit(0);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

updateAdmin();
