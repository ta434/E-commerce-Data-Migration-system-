# backup_mongodb.py
import pymongo
import json
import datetime
import os

print("💾 MONGODB BACKUP SYSTEM")
print("=" * 40)

def backup_mongodb():
    # Create backup directory
    backup_dir = "4_backup_system/mongodb_backups"
    os.makedirs(backup_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"{backup_dir}/mongodb_backup_{timestamp}.json"
    
    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["electronics_store"]
    
    backup_data = {}
    
    # Backup all collections
    collections = ['categories', 'users', 'products', 'orders', 'reviews']
    
    for collection_name in collections:
        print(f"📦 Backing up {collection_name}...")
        data = list(db[collection_name].find({}))
        
        # Convert ObjectId to string for JSON serialization
        for doc in data:
            if '_id' in doc:
                doc['_id'] = str(doc['_id'])
        
        backup_data[collection_name] = data
    
    # Save to file
    with open(backup_file, 'w') as f:
        json.dump(backup_data, f, indent=2, default=str)
    
    print(f"✅ Backup completed: {backup_file}")
    print(f"📊 Backup contains:")
    for collection, data in backup_data.items():
        print(f"   - {collection}: {len(data)} records")
    
    return backup_file

def list_backups():
    backup_dir = "4_backup_system/mongodb_backups"
    if os.path.exists(backup_dir):
        backups = os.listdir(backup_dir)
        print(f"📂 Available backups ({len(backups)}):")
        for backup in sorted(backups)[-5:]:  # Show last 5 backups
            print(f"   - {backup}")
    else:
        print("❌ No backups found")

if __name__ == "__main__":
    print("1. Create new backup")
    print("2. List existing backups")
    
    choice = input("Choose option (1 or 2): ")
    
    if choice == "1":
        backup_file = backup_mongodb()
        print(f"🎉 Backup saved: {backup_file}")  # ✅ FIXED: backup_file not backfile_file
    elif choice == "2":
        list_backups()
    else:
        print("❌ Invalid choice")