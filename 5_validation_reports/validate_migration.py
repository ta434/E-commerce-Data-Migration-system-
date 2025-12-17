# validate_migration.py
import pymongo
import psycopg2

print("📊 MIGRATION VALIDATION REPORT")
print("=" * 50)

# Connect to both databases
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")["electronics_store"]
pg_conn = psycopg2.connect(
    host="localhost", database="electronics_store",
    user="postgres", password="shravani", port="5432"
)
pg_cursor = pg_conn.cursor()

# Count comparison
tables = {
    'categories': 'categories',
    'users': 'users', 
    'products': 'products',
    'orders': 'orders',
    'reviews': 'reviews'
}

print("\n📦 DATA COUNT COMPARISON:")
print("Collection/Tables".ljust(20) + "MongoDB".ljust(10) + "PostgreSQL".ljust(12) + "Status")
print("-" * 50)

all_match = True
for mongo_col, pg_table in tables.items():
    mongo_count = mongo_db[mongo_col].count_documents({})
    pg_cursor.execute(f"SELECT COUNT(*) FROM {pg_table}")
    pg_count = pg_cursor.fetchone()[0]
    
    status = "✅ MATCH" if mongo_count == pg_count else "❌ MISMATCH"
    if mongo_count != pg_count:
        all_match = False
        
    print(f"{mongo_col.ljust(20)}{str(mongo_count).ljust(10)}{str(pg_count).ljust(12)}{status}")

# Business metrics comparison
print("\n💰 BUSINESS METRICS COMPARISON:")

# Total Sales
mongo_sales = mongo_db.orders.aggregate([
    {"$group": {"_id": None, "total": {"$sum": "$pricing.total"}}}
]).next()["total"]

pg_cursor.execute("SELECT SUM(total_amount) FROM orders")
pg_sales = pg_cursor.fetchone()[0] or 0

print(f"Total Sales: MongoDB=${mongo_sales:,.2f} | PostgreSQL=${pg_sales:,.2f}")

# Customer Count
mongo_customers = mongo_db.users.count_documents({})
pg_cursor.execute("SELECT COUNT(*) FROM users")
pg_customers = pg_cursor.fetchone()[0]

print(f"Total Customers: MongoDB={mongo_customers} | PostgreSQL={pg_customers}")

# Product Count
mongo_products = mongo_db.products.count_documents({})
pg_cursor.execute("SELECT COUNT(*) FROM products")
pg_products = pg_cursor.fetchone()[0]

print(f"Total Products: MongoDB={mongo_products} | PostgreSQL={pg_products}")

# Final validation
print("\n🎯 MIGRATION VALIDATION:")
if all_match:
    print("✅ ALL DATA MIGRATED SUCCESSFULLY!")
    print("🎉 MIGRATION VALIDATION PASSED!")
else:
    print("⚠️  SOME DATA COUNTS DON'T MATCH")

pg_cursor.close()
pg_conn.close()

print("\n🚀 READY FOR BUSINESS INTELLIGENCE QUERIES!")