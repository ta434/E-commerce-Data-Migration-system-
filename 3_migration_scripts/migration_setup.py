# migration_setup.py
import pymongo
import psycopg2

print("🔌 DATABASE SETUP LOADED")

def get_mongodb():
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["electronics_store"]
        print("✅ MongoDB Connected")
        return db
    except Exception as e:
        print(f"❌ MongoDB Error: {e}")
        return None

def get_postgresql():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="electronics_store", 
            user="postgres",
            password="Tanvi",
            port="5433"
        )
        print("✅ PostgreSQL Connected")
        return conn
    except Exception as e:
        print(f"❌ PostgreSQL Error: {e}")
        return None

# Test
if __name__ == "__main__":
    print("Testing connections...")
    get_mongodb()
    get_postgresql()