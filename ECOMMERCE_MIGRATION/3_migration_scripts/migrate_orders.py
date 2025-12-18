# migrate_orders.py
import pymongo
import psycopg2

print("🔄 STARTING ORDERS MIGRATION")

# Connect to databases
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")["electronics_store"]
pg_conn = psycopg2.connect(
    host="localhost", database="electronics_store",
    user="postgres", password="shravani", port="5432"
)
cursor = pg_conn.cursor()

# Get and migrate orders
orders = list(mongo_db.orders.find())
print(f"📦 Found {len(orders)} orders")

orders_count = 0
items_count = 0

for order in orders:
    # Insert order
    cursor.execute("""
        INSERT INTO orders 
        (order_id, order_number, user_id, order_status,
         subtotal, tax, shipping_cost, discount, total_amount,
         shipping_method, tracking_number, carrier,
         estimated_delivery, actual_delivery, notes,
         payment_method, payment_status, payment_id,
         created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        order["_id"],
        order["order_number"],
        order["user_id"],
        order.get("status", "pending"),
        order.get("pricing", {}).get("subtotal", 0),
        order.get("pricing", {}).get("tax", 0),
        order.get("pricing", {}).get("shipping", 0),
        order.get("pricing", {}).get("discount", 0),
        order.get("pricing", {}).get("total", 0),
        order.get("shipping", {}).get("method"),
        order.get("shipping", {}).get("tracking_number"),
        order.get("shipping", {}).get("carrier"),
        order.get("shipping", {}).get("estimated_delivery"),
        order.get("shipping", {}).get("actual_delivery"),
        order.get("notes", ""),
        order.get("payment_info", {}).get("method"),
        order.get("payment_info", {}).get("status", "pending"),
        order.get("payment_info", {}).get("payment_id"),
        order.get("created_at"),
        order.get("updated_at")
    ))
    orders_count += 1

    # Insert order items
    for item in order.get("items", []):
        cursor.execute("""
            INSERT INTO order_items 
            (order_id, product_id, variant_id, product_name, variant_info, quantity, unit_price, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            order["_id"],
            item.get("product_id"),
            item.get("variant_id"),
            item.get("product_name"),
            item.get("variant_info"),
            item.get("quantity", 1),
            item.get("unit_price", 0),
            order.get("created_at")
        ))
        items_count += 1

pg_conn.commit()
print(f"✅ Migrated {orders_count} orders and {items_count} order items")

cursor.close()
pg_conn.close()