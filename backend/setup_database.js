// Script to automatically create the users table
import db from "./Config/database.js";

console.log("Setting up authentication database...\n");

// SQL to create users table
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('admin', 'user') DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

// SQL to create indexes
const createEmailIndex = `CREATE INDEX IF NOT EXISTS idx_email ON users(email)`;
const createUsernameIndex = `CREATE INDEX IF NOT EXISTS idx_username ON users(username)`;

// Execute table creation
db.query(createUsersTable, (err) => {
  if (err) {
    console.error("❌ Error creating users table:", err.message);
    process.exit(1);
  }
  
  console.log("✓ Users table created successfully");
  
  // Create email index
  db.query(createEmailIndex, (err) => {
    if (err) {
      console.error("❌ Error creating email index:", err.message);
      process.exit(1);
    }
    
    console.log("✓ Email index created successfully");
    
    // Create username index
    db.query(createUsernameIndex, (err) => {
      if (err) {
        console.error("❌ Error creating username index:", err.message);
        process.exit(1);
      }
      
      console.log("✓ Username index created successfully");
      console.log("\n✅ Database setup complete!");
      console.log("\nNext step: Run 'node create_admin.js' to create admin user");
      
      process.exit(0);
    });
  });
});

