// ==========================================
// 03_insert_users.js - ENTERPRISE SCALE (50+ users)
// ==========================================

db = db.getSiblingDB('electronics_store');

// Generate 50+ users with realistic data
const users = [];

for (let i = 1; i <= 50; i++) {
  const userId = `user_${String(i).padStart(3, '0')}`;
  const userType = i <= 10 ? 'premium' : (i <= 30 ? 'regular' : 'new');
  
  users.push({
    _id: userId,
    personal_info: {
      first_name: `User${i}`,
      last_name: `LastName${i}`,
      email: `user${i}@email.com`,
      phone: `+1${5550000000 + i}`,
      date_of_birth: new Date(1980 + (i % 20), (i % 12), (i % 28) + 1)
    },
    auth: {
      password_hash: `hashed_password_${i}`,
      last_login: new Date(2024, 0, (i % 30) + 1, (i % 24), (i % 60)),
      is_verified: i % 10 !== 0 // 90% verified
    },
    addresses: [
      {
        address_id: `addr_${userId}_1`,
        type: "home",
        street: `${i * 100} Main Street`,
        city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][i % 5],
        state: ["NY", "CA", "IL", "TX", "AZ"][i % 5],
        zip_code: `${10000 + i}`,
        country: "USA",
        is_primary: true
      },
      ...(i % 3 === 0 ? [{
        address_id: `addr_${userId}_2`,
        type: "work",
        street: `${i * 50} Business Ave`,
        city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][i % 5],
        state: ["NY", "CA", "IL", "TX", "AZ"][i % 5],
        zip_code: `${20000 + i}`,
        country: "USA",
        is_primary: false
      }] : [])
    ],
    preferences: {
      newsletter: i % 4 !== 0,
      sms_notifications: i % 3 === 0,
      currency: "USD",
      language: ["en", "es", "fr"][i % 3]
    },
    membership: {
      tier: userType,
      joined_date: new Date(2023, (i % 12), (i % 28) + 1),
      loyalty_points: i * 100
    },
    cart: i % 5 === 0 ? [{
      product_id: `prod_${String((i % 20) + 1).padStart(3, '0')}`,
      variant_id: `var_${String((i % 10) + 1).padStart(3, '0')}`,
      quantity: (i % 3) + 1,
      added_at: new Date(2024, 0, (i % 30) + 1)
    }] : [],
    created_at: new Date(2023, (i % 12), (i % 28) + 1),
    updated_at: new Date(2024, 0, (i % 30) + 1)
  });
}

// Add some VIP customers
users.push(
  {
    _id: "user_vip_001",
    personal_info: {
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.johnson@corporation.com",
      phone: "+1234567800",
      date_of_birth: new Date("1975-08-15")
    },
    auth: {
      password_hash: "hashed_vip_001",
      last_login: new Date("2024-01-25T14:30:00Z"),
      is_verified: true
    },
    addresses: [
      {
        address_id: "addr_vip_001_1",
        type: "home",
        street: "1 Executive Boulevard",
        city: "New York",
        state: "NY",
        zip_code: "10001",
        country: "USA",
        is_primary: true
      }
    ],
    preferences: {
      newsletter: true,
      sms_notifications: true,
      currency: "USD",
      language: "en"
    },
    membership: {
      tier: "vip",
      joined_date: new Date("2022-01-15"),
      loyalty_points: 15000
    },
    cart: [],
    created_at: new Date("2022-01-15"),
    updated_at: new Date("2024-01-25")
  }
);

db.users.insertMany(users);
print(`✅ ${users.length} Users inserted successfully!`);