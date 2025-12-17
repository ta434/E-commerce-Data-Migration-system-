# migrate_products.py
import pymongo
import psycopg2
import json

print("🔄 STARTING PRODUCTS MIGRATION")

# Connect to databases
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")["electronics_store"]
pg_conn = psycopg2.connect(
    host="localhost", database="electronics_store",
    user="postgres", password="Tanvi", port="5433"
)
cursor = pg_conn.cursor()

# First, get category mapping from PostgreSQL
cursor.execute("SELECT category_id, name FROM categories")
category_mapping = {row[1]: row[0] for row in cursor.fetchall()}  # {name: id}
print(f"📊 Category mapping: {category_mapping}")

# Get and migrate products
products = list(mongo_db.products.find())
print(f"📱 Found {len(products)} products")

products_count = 0
variants_count = 0
skipped_count = 0

for product in products:
    # Get category ID from mapping
    category_name = product.get("category")
    category_id = category_mapping.get(category_name)
    
    if not category_id:
        print(f"❌ Category '{category_name}' not found for product {product['_id']}")
        skipped_count += 1
        continue
    
    # Check if SKU exists, if not generate one
    sku = product.get("sku")
    if not sku:
        sku = f"SKU_{product['_id']}"
    
    try:
        # Insert product
        cursor.execute("""
            INSERT INTO products 
            (product_id, name, description, price, category_id, brand, sku,
             attributes, inventory_quantity, low_stock_threshold, reserved_quantity,
             images, tags, is_active, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            product["_id"],
            product["name"],
            product.get("description", ""),
            product["price"],
            category_id,  # Use category ID instead of name
            product.get("brand"), 
            sku,
            json.dumps(product.get("attributes", {})),
            product.get("inventory", {}).get("in_stock", 0),
            product.get("inventory", {}).get("low_stock_threshold", 10),
            product.get("inventory", {}).get("reserved", 0),
            product.get("images", []),
            product.get("tags", []),
            product.get("is_active", True),
            product.get("created_at"),
            product.get("updated_at")
        ))
        products_count += 1

        # Insert variants
        for variant in product.get("variants", []):
            color = variant.get("colors", [""])[0] if variant.get("colors") else variant.get("color")
            cursor.execute("""
                INSERT INTO product_variants 
                (variant_id, product_id, storage, color, price, created_at)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                variant.get("variant_id"),
                product["_id"],
                variant.get("storage"),
                color,
                variant.get("price"),
                product.get("created_at")
            ))
            variants_count += 1
            
    except Exception as e:
        print(f"❌ Error migrating product {product['_id']}: {e}")
        skipped_count += 1
        continue

pg_conn.commit()
print(f"✅ Migrated {products_count} products and {variants_count} variants")
print(f"⚠️  Skipped {skipped_count} products due to errors")

cursor.close()
pg_conn.close()