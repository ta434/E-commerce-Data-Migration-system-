# business_analytics.py - TEXT ONLY VERSION
import psycopg2

print("📊 BUSINESS ANALYTICS DASHBOARD")
print("=" * 60)

def get_business_metrics():
    # Connect to PostgreSQL
    conn = psycopg2.connect(
        host="localhost", database="electronics_store",
        user="postgres", password="shravani", port="5432"
    )
    cursor = conn.cursor()
    
    print("\n💰 KEY BUSINESS METRICS:")
    print("─" * 40)
    
    # Total Sales
    cursor.execute("SELECT SUM(total_amount) FROM orders")
    total_sales = cursor.fetchone()[0] or 0
    print(f"💰 Total Sales: ${total_sales:,.2f}")
    
    # Total Customers
    cursor.execute("SELECT COUNT(*) FROM users")
    total_customers = cursor.fetchone()[0]
    print(f"👥 Total Customers: {total_customers}")
    
    # Total Products
    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]
    print(f"📱 Total Products: {total_products}")
    
    # Average Order Value
    cursor.execute("SELECT AVG(total_amount) FROM orders")
    avg_order_value = cursor.fetchone()[0] or 0
    print(f"📦 Average Order Value: ${avg_order_value:,.2f}")
    
    # Total Orders
    cursor.execute("SELECT COUNT(*) FROM orders")
    total_orders = cursor.fetchone()[0]
    print(f"🛒 Total Orders: {total_orders}")
    
    print("\n🎯 CUSTOMER SEGMENTATION:")
    print("─" * 40)
    cursor.execute("""
        SELECT membership_tier, COUNT(*) as customer_count,
               ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users), 2) as percentage
        FROM users 
        GROUP BY membership_tier 
        ORDER BY customer_count DESC
    """)
    for row in cursor.fetchall():
        print(f"   {row[0]}: {row[1]} customers ({row[2]}%)")
    
    print("\n🏆 TOP 5 PRODUCTS BY REVENUE:")
    print("─" * 40)
    cursor.execute("""
        SELECT p.name, p.brand, ROUND(COALESCE(SUM(oi.subtotal), 0), 2) as revenue
        FROM products p
        LEFT JOIN order_items oi ON p.product_id = oi.product_id
        GROUP BY p.product_id, p.name, p.brand
        ORDER BY revenue DESC
        LIMIT 5
    """)
    for i, row in enumerate(cursor.fetchall(), 1):
        print(f"   {i}. {row[0]} ({row[1]}) - ${row[2]:,.2f}")
    
    print("\n📈 SALES BY CATEGORY:")
    print("─" * 40)
    cursor.execute("""
        SELECT c.name as category, 
               ROUND(SUM(oi.subtotal), 2) as revenue,
               ROUND(SUM(oi.subtotal) * 100.0 / (SELECT SUM(total_amount) FROM orders), 2) as percentage
        FROM categories c
        JOIN products p ON c.category_id = p.category_id
        JOIN order_items oi ON p.product_id = oi.product_id
        GROUP BY c.category_id, c.name
        ORDER BY revenue DESC
    """)
    for row in cursor.fetchall():
        print(f"   {row[0]}: ${row[1]:,.2f} ({row[2]}%)")
    
    print("\n⭐ CUSTOMER REVIEW ANALYSIS:")
    print("─" * 40)
    cursor.execute("""
        SELECT 
            COUNT(*) as total_reviews,
            ROUND(AVG(rating), 2) as avg_rating,
            COUNT(CASE WHEN verified_purchase = true THEN 1 END) as verified_reviews,
            ROUND(COUNT(CASE WHEN verified_purchase = true THEN 1 END) * 100.0 / COUNT(*), 2) as verified_percentage
        FROM reviews
    """)
    review_stats = cursor.fetchone()
    print(f"   Total Reviews: {review_stats[0]}")
    print(f"   Average Rating: {review_stats[1]}/5")
    print(f"   Verified Purchases: {review_stats[2]} ({review_stats[3]}%)")
    
    print("\n🚚 ORDER STATUS DISTRIBUTION:")
    print("─" * 40)
    cursor.execute("""
        SELECT order_status, COUNT(*) as order_count,
               ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders), 2) as percentage
        FROM orders 
        GROUP BY order_status 
        ORDER BY order_count DESC
    """)
    for row in cursor.fetchall():
        print(f"   {row[0]}: {row[1]} orders ({row[2]}%)")
    
    print("\n📊 INVENTORY HEALTH:")
    print("─" * 40)
    cursor.execute("""
        SELECT 
            COUNT(*) as total_products,
            COUNT(CASE WHEN is_low_stock = true THEN 1 END) as low_stock,
            COUNT(CASE WHEN available_quantity = 0 THEN 1 END) as out_of_stock,
            ROUND(SUM(inventory_value), 2) as total_inventory_value
        FROM products
        WHERE is_active = true
    """)
    inventory_stats = cursor.fetchone()
    print(f"   Total Active Products: {inventory_stats[0]}")
    print(f"   Low Stock Items: {inventory_stats[1]}")
    print(f"   Out of Stock Items: {inventory_stats[2]}")
    print(f"   Total Inventory Value: ${inventory_stats[3]:,.2f}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "🎉" * 30)
    print("📊 ANALYTICS DASHBOARD COMPLETED!")
    print("🚀 Your e-commerce business is ready for data-driven decisions!")
    print("🎉" * 30)

if __name__ == "__main__":
    get_business_metrics()