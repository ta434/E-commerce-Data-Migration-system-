// ==========================================
// 07_verify_data.js - FIXED VERSION
// Data Verification Queries
// ==========================================

db = db.getSiblingDB('electronics_store');

print("📊 ENTERPRISE DATA VERIFICATION REPORT");
print("======================================");

// Collection counts
print("\n📦 COLLECTION COUNTS:");
print("- Categories: " + db.categories.countDocuments());
print("- Users: " + db.users.countDocuments());
print("- Products: " + db.products.countDocuments());
print("- Orders: " + db.orders.countDocuments());
print("- Reviews: " + db.reviews.countDocuments());

// Business metrics - FIXED: Handle cases where no data exists
print("\n💰 BUSINESS METRICS:");
const totalSalesResult = db.orders.aggregate([
    { $group: { _id: null, total: { $sum: "$pricing.total" } } }
]).toArray();
const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;
print("- Total Sales: $" + totalSales.toFixed(2));

const totalCustomers = db.users.countDocuments();
print("- Total Customers: " + totalCustomers);

const avgOrderResult = db.orders.aggregate([
    { $group: { _id: null, avg: { $avg: "$pricing.total" } } }
]).toArray();
const avgOrderValue = avgOrderResult.length > 0 ? avgOrderResult[0].avg : 0;
print("- Average Order Value: $" + avgOrderValue.toFixed(2));

// Product analysis
print("\n📱 PRODUCT ANALYSIS:");
print("- Products by Category:");
const productsByCategory = db.products.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]).toArray();
productsByCategory.forEach(cat => {
    print(`  • ${cat._id}: ${cat.count} products`);
});

// Inventory value calculation - FIXED
print("- Top Products by Inventory Value:");
const inventoryValue = db.products.aggregate([
    { 
        $project: { 
            name: 1, 
            price: 1,
            in_stock: "$inventory.in_stock",
            inventory_value: { $multiply: ["$price", "$inventory.in_stock"] } 
        } 
    },
    { $sort: { inventory_value: -1 } },
    { $limit: 5 }
]).toArray();
inventoryValue.forEach(product => {
    print(`  • ${product.name}: $${product.inventory_value.toFixed(2)} (${product.in_stock} in stock)`);
});

// Customer segmentation - FIXED
print("\n👥 CUSTOMER SEGMENTATION:");
const customerTiers = db.users.aggregate([
    { $group: { _id: "$membership.tier", count: { $sum: 1 } } }
]).toArray();
customerTiers.forEach(tier => {
    print(`  • ${tier._id}: ${tier.count} customers`);
});

// Order status distribution
print("\n🚚 ORDER STATUS:");
const orderStatus = db.orders.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]).toArray();
orderStatus.forEach(status => {
    print(`  • ${status._id}: ${status.count} orders`);
});

// Product brands analysis
print("\n🏷️ PRODUCT BRANDS:");
const productBrands = db.products.aggregate([
    { $group: { _id: "$brand", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 }
]).toArray();
productBrands.forEach(brand => {
    print(`  • ${brand._id}: ${brand.count} products`);
});

// Reviews analysis
print("\n⭐ REVIEWS ANALYSIS:");
const reviewStats = db.reviews.aggregate([
    { 
        $group: { 
            _id: null,
            total: { $sum: 1 },
            avgRating: { $avg: "$rating" },
            verified: { $sum: { $cond: ["$verified_purchase", 1, 0] } }
        } 
    }
]).toArray();
if (reviewStats.length > 0) {
    const stats = reviewStats[0];
    print(`  • Total Reviews: ${stats.total}`);
    print(`  • Average Rating: ${stats.avgRating.toFixed(1)}/5`);
    print(`  • Verified Purchases: ${stats.verified} (${((stats.verified/stats.total)*100).toFixed(1)}%)`);
}

// Final summary
print("\n🎯 DATA QUALITY SUMMARY:");
const expectedCounts = {
    categories: 10,
    users: 51,
    products: 34,
    orders: 121,
    reviews: 85
};

const actualCounts = {
    categories: db.categories.countDocuments(),
    users: db.users.countDocuments(),
    products: db.products.countDocuments(),
    orders: db.orders.countDocuments(),
    reviews: db.reviews.countDocuments()
};

let allGood = true;
for (const [collection, expected] of Object.entries(expectedCounts)) {
    const actual = actualCounts[collection];
    const status = actual === expected ? "✅" : "❌";
    if (actual !== expected) allGood = false;
    print(`${status} ${collection}: ${actual}/${expected} records`);
}

if (allGood) {
    print("\n🎉 ALL DATA VERIFIED SUCCESSFULLY! READY FOR MIGRATION! 🎉");
} else {
    print("\n⚠️  SOME DATA COUNTS DON'T MATCH EXPECTED VALUES");
}

print("\n✅ ENTERPRISE DATA VERIFICATION COMPLETED!");