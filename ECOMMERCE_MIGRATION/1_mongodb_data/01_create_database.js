// ==========================================
// 01_create_database.js
// Create MongoDB Database and Collections
// ==========================================

// Switch to electronics_store database
db = db.getSiblingDB('electronics_store');

// Create collections
db.createCollection("users");
db.createCollection("products"); 
db.createCollection("orders");
db.createCollection("reviews");
db.createCollection("categories");

print("✅ Database and collections created successfully!");