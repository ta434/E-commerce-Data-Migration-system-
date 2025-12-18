# performance_comparison.py - TEXT ONLY VERSION
import pymongo
import psycopg2
import time

print("⚡ PERFORMANCE COMPARISON: MONGODB vs POSTGRESQL")
print("=" * 60)

def test_mongodb_query():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["electronics_store"]
    
    start_time = time.time()
    
    # Query 1: Find products by category
    result1 = list(db.products.find({"category": "Smartphones"}))
    
    # Query 2: Customer orders
    result2 = list(db.orders.find({"user_id": "user_001"}))
    
    # Query 3: Product reviews
    result3 = list(db.reviews.find({"product_id": "prod_001"}))
    
    end_time = time.time()
    return end_time - start_time, len(result1), len(result2), len(result3)

def test_postgresql_query():
    conn = psycopg2.connect(
        host="localhost", database="electronics_store",
        user="postgres", password="shravani", port="5432"
    )
    cursor = conn.cursor()
    
    start_time = time.time()
    
    # Query 1: Find products by category
    cursor.execute("""
        SELECT p.* FROM products p 
        JOIN categories c ON p.category_id = c.category_id 
        WHERE c.name = 'Smartphones'
    """)
    result1 = cursor.fetchall()
    
    # Query 2: Customer orders
    cursor.execute("SELECT * FROM orders WHERE user_id = 'user_001'")
    result2 = cursor.fetchall()
    
    # Query 3: Product reviews
    cursor.execute("SELECT * FROM reviews WHERE product_id = 'prod_001'")
    result3 = cursor.fetchall()
    
    end_time = time.time()
    cursor.close()
    conn.close()
    
    return end_time - start_time, len(result1), len(result2), len(result3)

def run_performance_test():
    print("\n🧪 RUNNING PERFORMANCE TESTS...")
    print("⏳ This may take a few seconds...")
    
    # Test MongoDB
    mongo_time, mongo1, mongo2, mongo3 = test_mongodb_query()
    
    # Test PostgreSQL
    pg_time, pg1, pg2, pg3 = test_postgresql_query()
    
    print("\n📊 PERFORMANCE RESULTS:")
    print("─" * 60)
    print(f"🏎️  MongoDB Execution Time:   {mongo_time:.4f} seconds")
    print(f"🐘 PostgreSQL Execution Time: {pg_time:.4f} seconds")
    
    if pg_time < mongo_time:
        improvement = ((mongo_time - pg_time) / mongo_time) * 100
        print(f"🚀 PostgreSQL is {improvement:.1f}% FASTER!")
        faster_db = "PostgreSQL"
    else:
        improvement = ((pg_time - mongo_time) / pg_time) * 100
        print(f"🚀 MongoDB is {improvement:.1f}% FASTER!")
        faster_db = "MongoDB"
    
    print("\n📈 QUERY RESULTS COMPARISON:")
    print("─" * 60)
    print(f"📱 Smartphones: MongoDB={mongo1} | PostgreSQL={pg1}")
    print(f"👤 User Orders: MongoDB={mongo2} | PostgreSQL={pg2}") 
    print(f"⭐ Product Reviews: MongoDB={mongo3} | PostgreSQL={pg3}")
    
    print("\n🎯 BUSINESS RECOMMENDATIONS:")
    print("─" * 60)
    print("✅ PostgreSQL Advantages:")
    print("   • Better for complex analytics and reporting")
    print("   • Strong data integrity with foreign keys")
    print("   • Optimized for JOIN operations")
    print("   • Standard SQL for business intelligence")
    
    print("\n✅ MongoDB Advantages:")
    print("   • Flexible schema for evolving data")
    print("   • Fast read operations for simple queries")
    print("   • Horizontal scalability")
    print("   • JSON document storage")
    
    print(f"\n💡 RECOMMENDATION: Use {faster_db} for query-intensive operations")
    print("💡 HYBRID APPROACH: MongoDB for operational data + PostgreSQL for analytics")

if __name__ == "__main__":
    run_performance_test()