// ==========================================
// 04_insert_products.js - ENTERPRISE SCALE (30+ products)
// ==========================================

db = db.getSiblingDB('electronics_store');

db.products.insertMany([
  // SMARTPHONES (12 products)
  {
    _id: "prod_001", name: "iPhone 15 Pro Max", price: 1199.99, category: "Smartphones", brand: "Apple",
    attributes: { storage: "256GB", color: "Natural Titanium", screen: "6.7 inch", camera: "48MP", battery: "4422 mAh" },
    variants: [
      { variant_id: "var_001", storage: "256GB", colors: ["Natural Titanium"], price: 1199.99 },
      { variant_id: "var_002", storage: "512GB", colors: ["Blue Titanium"], price: 1399.99 }
    ],
    inventory: { in_stock: 45, reserved: 8, low_stock_threshold: 10 },
    images: ["iphone15_pro_max_1.jpg"], tags: ["apple", "iphone", "flagship"],
    is_active: true, created_at: new Date("2024-01-15")
  },
  {
    _id: "prod_002", name: "Samsung Galaxy S24 Ultra", price: 1299.99, category: "Smartphones", brand: "Samsung",
    attributes: { storage: "512GB", color: "Titanium Black", screen: "6.8 inch", camera: "200MP", battery: "5000 mAh" },
    variants: [
      { variant_id: "var_003", storage: "256GB", colors: ["Titanium Black"], price: 1199.99 },
      { variant_id: "var_004", storage: "512GB", colors: ["Titanium Violet"], price: 1299.99 }
    ],
    inventory: { in_stock: 38, reserved: 12, low_stock_threshold: 8 },
    images: ["galaxy_s24_ultra_1.jpg"], tags: ["samsung", "galaxy", "ai"],
    is_active: true, created_at: new Date("2024-01-10")
  },
  {
    _id: "prod_003", name: "Google Pixel 8 Pro", price: 999.99, category: "Smartphones", brand: "Google",
    attributes: { storage: "128GB", color: "Obsidian", screen: "6.7 inch", camera: "50MP", battery: "5050 mAh" },
    variants: [
      { variant_id: "var_005", storage: "128GB", colors: ["Obsidian"], price: 999.99 },
      { variant_id: "var_006", storage: "256GB", colors: ["Bay"], price: 1059.99 }
    ],
    inventory: { in_stock: 52, reserved: 5, low_stock_threshold: 12 },
    images: ["pixel_8_pro_1.jpg"], tags: ["google", "pixel", "ai"],
    is_active: true, created_at: new Date("2024-01-08")
  },
  {
    _id: "prod_004", name: "OnePlus 12", price: 799.99, category: "Smartphones", brand: "OnePlus",
    attributes: { storage: "256GB", color: "Silky Black", screen: "6.82 inch", camera: "50MP", battery: "5400 mAh" },
    variants: [
      { variant_id: "var_007", storage: "256GB", colors: ["Silky Black"], price: 799.99 },
      { variant_id: "var_008", storage: "512GB", colors: ["Emerald Green"], price: 899.99 }
    ],
    inventory: { in_stock: 67, reserved: 9, low_stock_threshold: 15 },
    images: ["oneplus_12_1.jpg"], tags: ["oneplus", "flagship"],
    is_active: true, created_at: new Date("2024-01-12")
  },
  {
    _id: "prod_005", name: "Xiaomi 14 Ultra", price: 899.99, category: "Smartphones", brand: "Xiaomi",
    attributes: { storage: "512GB", color: "Black", screen: "6.73 inch", camera: "50MP", battery: "5300 mAh" },
    variants: [
      { variant_id: "var_009", storage: "512GB", colors: ["Black"], price: 899.99 }
    ],
    inventory: { in_stock: 42, reserved: 6, low_stock_threshold: 10 },
    images: ["xiaomi_14_ultra_1.jpg"], tags: ["xiaomi", "camera"],
    is_active: true, created_at: new Date("2024-01-14")
  },
  {
    _id: "prod_006", name: "iPhone 14", price: 699.99, category: "Smartphones", brand: "Apple",
    attributes: { storage: "128GB", color: "Blue", screen: "6.1 inch", camera: "12MP", battery: "3279 mAh" },
    variants: [
      { variant_id: "var_010", storage: "128GB", colors: ["Blue"], price: 699.99 },
      { variant_id: "var_011", storage: "256GB", colors: ["Purple"], price: 799.99 }
    ],
    inventory: { in_stock: 89, reserved: 15, low_stock_threshold: 20 },
    images: ["iphone_14_1.jpg"], tags: ["apple", "iphone"],
    is_active: true, created_at: new Date("2024-01-05")
  },
  {
    _id: "prod_007", name: "Samsung Galaxy Z Flip5", price: 999.99, category: "Smartphones", brand: "Samsung",
    attributes: { storage: "256GB", color: "Mint", screen: "6.7 inch", camera: "12MP", battery: "3700 mAh" },
    variants: [
      { variant_id: "var_012", storage: "256GB", colors: ["Mint"], price: 999.99 },
      { variant_id: "var_013", storage: "512GB", colors: ["Graphite"], price: 1099.99 }
    ],
    inventory: { in_stock: 28, reserved: 4, low_stock_threshold: 8 },
    images: ["galaxy_z_flip_1.jpg"], tags: ["samsung", "foldable"],
    is_active: true, created_at: new Date("2024-01-18")
  },
  {
    _id: "prod_008", name: "Google Pixel 7a", price: 499.99, category: "Smartphones", brand: "Google",
    attributes: { storage: "128GB", color: "Charcoal", screen: "6.1 inch", camera: "64MP", battery: "4385 mAh" },
    variants: [
      { variant_id: "var_014", storage: "128GB", colors: ["Charcoal"], price: 499.99 }
    ],
    inventory: { in_stock: 75, reserved: 12, low_stock_threshold: 15 },
    images: ["pixel_7a_1.jpg"], tags: ["google", "pixel", "budget"],
    is_active: true, created_at: new Date("2024-01-20")
  },
  {
    _id: "prod_009", name: "Nothing Phone 2", price: 599.99, category: "Smartphones", brand: "Nothing",
    attributes: { storage: "256GB", color: "White", screen: "6.7 inch", camera: "50MP", battery: "4700 mAh" },
    variants: [
      { variant_id: "var_015", storage: "256GB", colors: ["White"], price: 599.99 }
    ],
    inventory: { in_stock: 34, reserved: 7, low_stock_threshold: 10 },
    images: ["nothing_phone_2_1.jpg"], tags: ["nothing", "transparent"],
    is_active: true, created_at: new Date("2024-01-16")
  },
  {
    _id: "prod_010", name: "Motorola Edge 40", price: 549.99, category: "Smartphones", brand: "Motorola",
    attributes: { storage: "256GB", color: "Nebula Green", screen: "6.55 inch", camera: "50MP", battery: "4400 mAh" },
    variants: [
      { variant_id: "var_016", storage: "256GB", colors: ["Nebula Green"], price: 549.99 }
    ],
    inventory: { in_stock: 48, reserved: 5, low_stock_threshold: 12 },
    images: ["motorola_edge_40_1.jpg"], tags: ["motorola", "edge"],
    is_active: true, created_at: new Date("2024-01-22")
  },
  {
    _id: "prod_011", name: "Oppo Find X6 Pro", price: 899.99, category: "Smartphones", brand: "Oppo",
    attributes: { storage: "256GB", color: "Black", screen: "6.82 inch", camera: "50MP", battery: "5000 mAh" },
    variants: [
      { variant_id: "var_017", storage: "256GB", colors: ["Black"], price: 899.99 }
    ],
    inventory: { in_stock: 31, reserved: 3, low_stock_threshold: 8 },
    images: ["oppo_find_x6_1.jpg"], tags: ["oppo", "camera"],
    is_active: true, created_at: new Date("2024-01-25")
  },
  {
    _id: "prod_012", name: "Vivo X100 Pro", price: 849.99, category: "Smartphones", brand: "Vivo",
    attributes: { storage: "512GB", color: "Blue", screen: "6.78 inch", camera: "50MP", battery: "5400 mAh" },
    variants: [
      { variant_id: "var_018", storage: "512GB", colors: ["Blue"], price: 849.99 }
    ],
    inventory: { in_stock: 29, reserved: 4, low_stock_threshold: 8 },
    images: ["vivo_x100_1.jpg"], tags: ["vivo", "camera"],
    is_active: true, created_at: new Date("2024-01-28")
  },

  // LAPTOPS (8 products)
  {
    _id: "prod_013", name: "MacBook Pro 16-inch", price: 2499.99, category: "Laptops", brand: "Apple",
    attributes: { storage: "1TB SSD", color: "Space Gray", screen: "16.2 inch", memory: "36GB", processor: "M3 Max" },
    variants: [
      { variant_id: "var_019", storage: "1TB", colors: ["Space Gray"], price: 2499.99 },
      { variant_id: "var_020", storage: "2TB", colors: ["Silver"], price: 2899.99 }
    ],
    inventory: { in_stock: 25, reserved: 3, low_stock_threshold: 5 },
    images: ["macbook_pro_16_1.jpg"], tags: ["apple", "macbook", "professional"],
    is_active: true, created_at: new Date("2024-01-05")
  },
  {
    _id: "prod_014", name: "Dell XPS 15", price: 1699.99, category: "Laptops", brand: "Dell",
    attributes: { storage: "1TB SSD", color: "Platinum Silver", screen: "15.6 inch", memory: "32GB", processor: "Intel i7" },
    variants: [
      { variant_id: "var_021", storage: "1TB", colors: ["Platinum Silver"], price: 1699.99 }
    ],
    inventory: { in_stock: 38, reserved: 8, low_stock_threshold: 10 },
    images: ["dell_xps_15_1.jpg"], tags: ["dell", "xps", "premium"],
    is_active: true, created_at: new Date("2024-01-08")
  },
  {
    _id: "prod_015", name: "HP Spectre x360", price: 1399.99, category: "Laptops", brand: "HP",
    attributes: { storage: "512GB SSD", color: "Nightfall Black", screen: "13.5 inch", memory: "16GB", processor: "Intel i7" },
    variants: [
      { variant_id: "var_022", storage: "512GB", colors: ["Nightfall Black"], price: 1399.99 }
    ],
    inventory: { in_stock: 42, reserved: 6, low_stock_threshold: 12 },
    images: ["hp_spectre_1.jpg"], tags: ["hp", "spectre", "2-in-1"],
    is_active: true, created_at: new Date("2024-01-12")
  },
  {
    _id: "prod_016", name: "Lenovo ThinkPad X1", price: 1899.99, category: "Laptops", brand: "Lenovo",
    attributes: { storage: "1TB SSD", color: "Black", screen: "14 inch", memory: "32GB", processor: "Intel i7" },
    variants: [
      { variant_id: "var_023", storage: "1TB", colors: ["Black"], price: 1899.99 }
    ],
    inventory: { in_stock: 31, reserved: 4, low_stock_threshold: 8 },
    images: ["thinkpad_x1_1.jpg"], tags: ["lenovo", "thinkpad", "business"],
    is_active: true, created_at: new Date("2024-01-15")
  },
  {
    _id: "prod_017", name: "Asus ROG Zephyrus", price: 2199.99, category: "Laptops", brand: "Asus",
    attributes: { storage: "1TB SSD", color: "Black", screen: "16 inch", memory: "32GB", processor: "AMD Ryzen 9" },
    variants: [
      { variant_id: "var_024", storage: "1TB", colors: ["Black"], price: 2199.99 }
    ],
    inventory: { in_stock: 18, reserved: 5, low_stock_threshold: 6 },
    images: ["asus_rog_1.jpg"], tags: ["asus", "gaming", "rog"],
    is_active: true, created_at: new Date("2024-01-18")
  },
  {
    _id: "prod_018", name: "Microsoft Surface Laptop 5", price: 1299.99, category: "Laptops", brand: "Microsoft",
    attributes: { storage: "512GB SSD", color: "Platinum", screen: "13.5 inch", memory: "16GB", processor: "Intel i5" },
    variants: [
      { variant_id: "var_025", storage: "512GB", colors: ["Platinum"], price: 1299.99 }
    ],
    inventory: { in_stock: 47, reserved: 7, low_stock_threshold: 12 },
    images: ["surface_laptop_1.jpg"], tags: ["microsoft", "surface"],
    is_active: true, created_at: new Date("2024-01-20")
  },
  {
    _id: "prod_019", name: "Acer Swift 3", price: 799.99, category: "Laptops", brand: "Acer",
    attributes: { storage: "512GB SSD", color: "Silver", screen: "14 inch", memory: "8GB", processor: "AMD Ryzen 5" },
    variants: [
      { variant_id: "var_026", storage: "512GB", colors: ["Silver"], price: 799.99 }
    ],
    inventory: { in_stock: 65, reserved: 12, low_stock_threshold: 15 },
    images: ["acer_swift_1.jpg"], tags: ["acer", "swift", "budget"],
    is_active: true, created_at: new Date("2024-01-22")
  },
  {
    _id: "prod_020", name: "Razer Blade 15", price: 2499.99, category: "Laptops", brand: "Razer",
    attributes: { storage: "1TB SSD", color: "Black", screen: "15.6 inch", memory: "32GB", processor: "Intel i9" },
    variants: [
      { variant_id: "var_027", storage: "1TB", colors: ["Black"], price: 2499.99 }
    ],
    inventory: { in_stock: 14, reserved: 3, low_stock_threshold: 5 },
    images: ["razer_blade_1.jpg"], tags: ["razer", "gaming", "premium"],
    is_active: true, created_at: new Date("2024-01-25")
  },

  // TABLETS (4 products)
  {
    _id: "prod_021", name: "iPad Pro 12.9", price: 1099.99, category: "Tablets", brand: "Apple",
    attributes: { storage: "256GB", color: "Space Gray", screen: "12.9 inch", cellular: "WiFi + Cellular" },
    variants: [
      { variant_id: "var_028", storage: "256GB", colors: ["Space Gray"], price: 1099.99 },
      { variant_id: "var_029", storage: "512GB", colors: ["Silver"], price: 1299.99 }
    ],
    inventory: { in_stock: 36, reserved: 8, low_stock_threshold: 10 },
    images: ["ipad_pro_1.jpg"], tags: ["apple", "ipad", "pro"],
    is_active: true, created_at: new Date("2024-01-10")
  },
  {
    _id: "prod_022", name: "Samsung Galaxy Tab S9", price: 849.99, category: "Tablets", brand: "Samsung",
    attributes: { storage: "256GB", color: "Graphite", screen: "11 inch", cellular: "WiFi" },
    variants: [
      { variant_id: "var_030", storage: "256GB", colors: ["Graphite"], price: 849.99 }
    ],
    inventory: { in_stock: 41, reserved: 6, low_stock_threshold: 12 },
    images: ["galaxy_tab_1.jpg"], tags: ["samsung", "tablet"],
    is_active: true, created_at: new Date("2024-01-14")
  },
  {
    _id: "prod_023", name: "Microsoft Surface Pro 9", price: 1199.99, category: "Tablets", brand: "Microsoft",
    attributes: { storage: "256GB", color: "Platinum", screen: "13 inch", cellular: "WiFi" },
    variants: [
      { variant_id: "var_031", storage: "256GB", colors: ["Platinum"], price: 1199.99 }
    ],
    inventory: { in_stock: 28, reserved: 4, low_stock_threshold: 8 },
    images: ["surface_pro_1.jpg"], tags: ["microsoft", "surface"],
    is_active: true, created_at: new Date("2024-01-18")
  },
  {
    _id: "prod_024", name: "Lenovo Tab P12", price: 599.99, category: "Tablets", brand: "Lenovo",
    attributes: { storage: "128GB", color: "Storm Grey", screen: "12.7 inch", cellular: "WiFi" },
    variants: [
      { variant_id: "var_032", storage: "128GB", colors: ["Storm Grey"], price: 599.99 }
    ],
    inventory: { in_stock: 52, reserved: 9, low_stock_threshold: 15 },
    images: ["lenovo_tab_1.jpg"], tags: ["lenovo", "tablet", "budget"],
    is_active: true, created_at: new Date("2024-01-22")
  },

  // AUDIO (4 products)
  {
    _id: "prod_025", name: "Sony WH-1000XM5", price: 399.99, category: "Audio", brand: "Sony",
    attributes: { color: "Black", battery_life: "30 hours", noise_cancellation: "Yes", wireless: true },
    variants: [
      { variant_id: "var_033", storage: "Standard", colors: ["Black"], price: 399.99 }
    ],
    inventory: { in_stock: 78, reserved: 15, low_stock_threshold: 20 },
    images: ["sony_xm5_1.jpg"], tags: ["sony", "headphones", "noise-cancelling"],
    is_active: true, created_at: new Date("2024-01-12")
  },
  {
    _id: "prod_026", name: "Apple AirPods Pro", price: 249.99, category: "Audio", brand: "Apple",
    attributes: { color: "White", battery_life: "6 hours", noise_cancellation: "Yes", wireless: true },
    variants: [
      { variant_id: "var_034", storage: "Standard", colors: ["White"], price: 249.99 }
    ],
    inventory: { in_stock: 95, reserved: 22, low_stock_threshold: 25 },
    images: ["airpods_pro_1.jpg"], tags: ["apple", "airpods", "wireless"],
    is_active: true, created_at: new Date("2024-01-08")
  },
  {
    _id: "prod_027", name: "Bose QuietComfort Ultra", price: 429.99, category: "Audio", brand: "Bose",
    attributes: { color: "Black", battery_life: "24 hours", noise_cancellation: "Yes", wireless: true },
    variants: [
      { variant_id: "var_035", storage: "Standard", colors: ["Black"], price: 429.99 }
    ],
    inventory: { in_stock: 45, reserved: 8, low_stock_threshold: 12 },
    images: ["bose_qc_1.jpg"], tags: ["bose", "headphones", "premium"],
    is_active: true, created_at: new Date("2024-01-16")
  },
  {
    _id: "prod_028", name: "JBL Flip 6", price: 129.99, category: "Audio", brand: "JBL",
    attributes: { color: "Blue", battery_life: "12 hours", waterproof: "IP67", wireless: true },
    variants: [
      { variant_id: "var_036", storage: "Standard", colors: ["Blue"], price: 129.99 }
    ],
    inventory: { in_stock: 112, reserved: 18, low_stock_threshold: 30 },
    images: ["jbl_flip_1.jpg"], tags: ["jbl", "speaker", "portable"],
    is_active: true, created_at: new Date("2024-01-20")
  },

  // WEARABLES (3 products)
  {
    _id: "prod_029", name: "Apple Watch Series 9", price: 399.99, category: "Wearables", brand: "Apple",
    attributes: { size: "45mm", color: "Midnight", cellular: "GPS", battery_life: "18 hours" },
    variants: [
      { variant_id: "var_037", storage: "Standard", colors: ["Midnight"], price: 399.99 }
    ],
    inventory: { in_stock: 68, reserved: 14, low_stock_threshold: 15 },
    images: ["apple_watch_1.jpg"], tags: ["apple", "watch", "smartwatch"],
    is_active: true, created_at: new Date("2024-01-10")
  },
  {
    _id: "prod_030", name: "Samsung Galaxy Watch 6", price: 299.99, category: "Wearables", brand: "Samsung",
    attributes: { size: "44mm", color: "Graphite", cellular: "LTE", battery_life: "40 hours" },
    variants: [
      { variant_id: "var_038", storage: "Standard", colors: ["Graphite"], price: 299.99 }
    ],
    inventory: { in_stock: 54, reserved: 9, low_stock_threshold: 12 },
    images: ["galaxy_watch_1.jpg"], tags: ["samsung", "watch", "android"],
    is_active: true, created_at: new Date("2024-01-15")
  },
  {
    _id: "prod_031", name: "Fitbit Charge 6", price: 159.99, category: "Wearables", brand: "Fitbit",
    attributes: { size: "Standard", color: "Black", features: "Heart Rate, GPS", battery_life: "7 days" },
    variants: [
      { variant_id: "var_039", storage: "Standard", colors: ["Black"], price: 159.99 }
    ],
    inventory: { in_stock: 87, reserved: 16, low_stock_threshold: 20 },
    images: ["fitbit_charge_1.jpg"], tags: ["fitbit", "fitness", "tracker"],
    is_active: true, created_at: new Date("2024-01-18")
  },

  // GAMING (3 products)
  {
    _id: "prod_032", name: "PlayStation 5", price: 499.99, category: "Gaming", brand: "Sony",
    attributes: { storage: "825GB SSD", color: "White", resolution: "4K 120Hz", ray_tracing: "Yes" },
    variants: [
      { variant_id: "var_040", storage: "Standard", colors: ["White"], price: 499.99 },
      { variant_id: "var_041", storage: "Digital", colors: ["White"], price: 399.99 }
    ],
    inventory: { in_stock: 15, reserved: 22, low_stock_threshold: 8 },
    images: ["ps5_1.jpg"], tags: ["sony", "playstation", "gaming"],
    is_active: true, created_at: new Date("2024-01-03")
  },
  {
    _id: "prod_033", name: "Xbox Series X", price: 499.99, category: "Gaming", brand: "Microsoft",
    attributes: { storage: "1TB SSD", color: "Black", resolution: "4K 120Hz", ray_tracing: "Yes" },
    variants: [
      { variant_id: "var_042", storage: "Standard", colors: ["Black"], price: 499.99 }
    ],
    inventory: { in_stock: 22, reserved: 18, low_stock_threshold: 8 },
    images: ["xbox_series_x_1.jpg"], tags: ["microsoft", "xbox", "gaming"],
    is_active: true, created_at: new Date("2024-01-07")
  },
  {
    _id: "prod_034", name: "Nintendo Switch OLED", price: 349.99, category: "Gaming", brand: "Nintendo",
    attributes: { storage: "64GB", color: "White", screen: "7 inch OLED", handheld: "Yes" },
    variants: [
      { variant_id: "var_043", storage: "Standard", colors: ["White"], price: 349.99 }
    ],
    inventory: { in_stock: 38, reserved: 12, low_stock_threshold: 10 },
    images: ["switch_oled_1.jpg"], tags: ["nintendo", "switch", "portable"],
    is_active: true, created_at: new Date("2024-01-12")
  }
]);

print("✅ 34 Products inserted successfully!");