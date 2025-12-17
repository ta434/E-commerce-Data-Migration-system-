# restore_mongodb.py
import pymongo
import json
import os

print("🔄 MONGODB RESTORE SYSTEM")
print("=" * 40)

def restore_mongodb(backup_file):
    if not os.path.exists(backup_file):
        print(f"❌ Backup file not found: {backup_file}")
        return
    
    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["electronics_store"]
    
    # Load backup data
    with open(backup_file, 'r') as f:
        backup_data = json.load(f)
    
    # Clear existing data
    for collection_name in backup_data.keys():
        db[collection_name].delete_many({})
    
    # Restore data
    total_restored = 0
    for collection_name, documents in backup_data.items():
        print(f"🔄 Restoring {collection_name}...")
        if documents:
            db[collection_name].insert_many(documents)
            print(f"✅ Restored {len(documents)} {collection_name}")
            total_restored += len(documents)
    
    print(f"🎉 Restore completed! {total_restored} total records restored")

def list_backups():
    backup_dir = "4_backup_system/mongodb_backups"
    if os.path.exists(backup_dir):
        backups = os.listdir(backup_dir)
        print("📂 Available backups:")
        for i, backup in enumerate(sorted(backups), 1):
            print(f"   {i}. {backup}")
        return backups
    else:
        print("❌ No backups found")
        return []

if __name__ == "__main__":
    backups = list_backups()
    
    if backups:
        try:
            choice = int(input("Enter backup number to restore: ")) - 1
            if 0 <= choice < len(backups):
                backup_file = f"4_backup_system/mongodb_backups/{backups[choice]}"
                confirm = input(f"Restore from {backups[choice]}? (y/n): ")
                if confirm.lower() == 'y':
                    restore_mongodb(backup_file)
                else:
                    print("❌ Restore cancelled")
            else:
                print("❌ Invalid backup number")
        except ValueError:
            print("❌ Please enter a valid number")