# migrate_categories.py
import pymongo
import psycopg2

print("🔄 STARTING CATEGORIES MIGRATION")

# Connect to databases
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")["electronics_store"]
pg_conn = psycopg2.connect(
    host="localhost", database="electronics_store",
    user="postgres", password="Tanvi", port="5433"
)
cursor = pg_conn.cursor()

# Get and migrate categories
categories = list(mongo_db.categories.find())
print(f"📦 Found {len(categories)} categories")

for cat in categories:
    cursor.execute("""
        INSERT INTO categories 
        (category_id, name, description, slug, parent_category_id, image_url, is_active, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        cat["_id"], cat["name"], cat.get("description", ""), cat.get("slug", ""),
        cat.get("parent_category"), cat.get("image", ""), cat.get("is_active", True), cat.get("created_at")
    ))

pg_conn.commit()
print(f"✅ Migrated {len(categories)} categories")

cursor.close()
pg_conn.close()