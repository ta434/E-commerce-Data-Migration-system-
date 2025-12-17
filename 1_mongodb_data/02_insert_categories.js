// ==========================================
// 02_insert_categories.js - ENTERPRISE SCALE
// ==========================================

db = db.getSiblingDB('electronics_store');

db.categories.insertMany([
  {
    _id: "cat_001",
    name: "Smartphones",
    description: "Mobile phones and smartphones from all brands",
    slug: "smartphones",
    parent_category: null,
    image: "smartphones_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_002", 
    name: "Laptops",
    description: "Laptops, notebooks and computing devices",
    slug: "laptops",
    parent_category: null,
    image: "laptops_category.jpg", 
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_003",
    name: "Tablets",
    description: "Tablets and iPads",
    slug: "tablets",
    parent_category: null,
    image: "tablets_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_004",
    name: "Audio",
    description: "Headphones, earphones, speakers",
    slug: "audio",
    parent_category: null,
    image: "audio_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_005",
    name: "Wearables",
    description: "Smartwatches, fitness trackers",
    slug: "wearables",
    parent_category: null,
    image: "wearables_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_006",
    name: "Gaming",
    description: "Gaming consoles and accessories",
    slug: "gaming",
    parent_category: null,
    image: "gaming_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_007",
    name: "Apple",
    description: "Apple products and accessories",
    slug: "apple",
    parent_category: "cat_001",
    image: "apple_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_008",
    name: "Samsung",
    description: "Samsung mobile devices",
    slug: "samsung",
    parent_category: "cat_001",
    image: "samsung_category.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_009",
    name: "Gaming Laptops",
    description: "High-performance gaming laptops",
    slug: "gaming-laptops",
    parent_category: "cat_002",
    image: "gaming_laptops.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  },
  {
    _id: "cat_010",
    name: "Business Laptops",
    description: "Laptops for business professionals",
    slug: "business-laptops",
    parent_category: "cat_002",
    image: "business_laptops.jpg",
    is_active: true,
    created_at: new Date("2024-01-01")
  }
]);

print("✅ 10 Categories inserted successfully!");