# migrate_reviews.py
import pymongo
import psycopg2

print("🔄 STARTING REVIEWS MIGRATION")

# Connect to databases
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")["electronics_store"]
pg_conn = psycopg2.connect(
    host="localhost", database="electronics_store",
    user="postgres", password="Tanvi", port="5433"
)
cursor = pg_conn.cursor()

# Get and migrate reviews
reviews = list(mongo_db.reviews.find())
print(f"⭐ Found {len(reviews)} reviews")

reviews_count = 0

for review in reviews:
    cursor.execute("""
        INSERT INTO reviews 
        (review_id, product_id, user_id, rating, title, comment,
         verified_purchase, order_id, helpful_votes, reported, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        review["_id"],
        review["product_id"],
        review["user_id"],
        review.get("rating", 5),
        review.get("title", ""),
        review.get("comment", ""),
        review.get("verified_purchase", False),
        review.get("order_id"),
        review.get("helpful_votes", 0),
        review.get("reported", False),
        review.get("created_at"),
        review.get("updated_at")
    ))
    reviews_count += 1

pg_conn.commit()
print(f"✅ Migrated {reviews_count} reviews")

cursor.close()
pg_conn.close()