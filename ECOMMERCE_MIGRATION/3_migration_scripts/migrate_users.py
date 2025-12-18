# migrate_users.py
import pymongo
import psycopg2
import json

print("🔄 STARTING USERS MIGRATION")

# Connect to databases
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")["electronics_store"]
pg_conn = psycopg2.connect(
    host="localhost", database="electronics_store",
    user="postgres", password="shravani", port="5432"
)
cursor = pg_conn.cursor()

# Get and migrate users
users = list(mongo_db.users.find())
print(f"👥 Found {len(users)} users")

users_count = 0
addresses_count = 0

for user in users:
    # Insert user
    cursor.execute("""
        INSERT INTO users 
        (user_id, first_name, last_name, email, phone, date_of_birth,
         password_hash, last_login, is_verified, preferences,
         membership_tier, loyalty_points, joined_date, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        user["_id"],
        user["personal_info"]["first_name"],
        user["personal_info"]["last_name"], 
        user["personal_info"]["email"],
        user["personal_info"].get("phone"),
        user["personal_info"].get("date_of_birth"),
        user["auth"]["password_hash"],
        user["auth"].get("last_login"),
        user["auth"].get("is_verified", False),
        json.dumps(user.get("preferences", {})),
        user.get("membership", {}).get("tier", "regular"),
        user.get("membership", {}).get("loyalty_points", 0),
        user.get("membership", {}).get("joined_date"),
        user.get("created_at"),
        user.get("updated_at")
    ))
    users_count += 1

    # Insert addresses
    for addr in user.get("addresses", []):
        cursor.execute("""
            INSERT INTO addresses 
            (user_id, address_type, street, city, state, zip_code, country, is_primary, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            user["_id"],
            addr.get("type"),
            addr.get("street"),
            addr.get("city"), 
            addr.get("state"),
            addr.get("zip_code"),
            addr.get("country", "USA"),
            addr.get("is_primary", False),
            user.get("created_at")
        ))
        addresses_count += 1

pg_conn.commit()
print(f"✅ Migrated {users_count} users and {addresses_count} addresses")

cursor.close()
pg_conn.close()