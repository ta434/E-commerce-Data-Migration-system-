// ==========================================
// 06_insert_reviews.js - ENTERPRISE SCALE (80+ reviews)
// ==========================================

db = db.getSiblingDB('electronics_store');

const reviews = [];

// Generate 80+ realistic reviews
for (let i = 1; i <= 85; i++) {
    const reviewId = `rev_${String(i).padStart(3, '0')}`;
    const userId = `user_${String((i % 50) + 1).padStart(3, '0')}`;
    const productNum = ((i % 29) + 1);
    const productId = `prod_${String(productNum).padStart(3, '0')}`;
    
    // More likely to review if they actually purchased
    const verifiedPurchase = i % 4 !== 0; // 75% verified
    
    const rating = [5, 4, 5, 4, 3, 5, 4, 5, 2, 5][i % 10]; // Mostly positive with some negatives
    
    const reviewTitles = [
        "Amazing product!",
        "Great value for money",
        "Good but could be better",
        "Best purchase ever!",
        "Disappointed with quality",
        "Exceeded expectations",
        "Solid performance",
        "Not what I expected",
        "Highly recommended!",
        "Average product"
    ];
    
    const reviewComments = [
        "This product has completely changed how I work. The performance is outstanding and the build quality is premium.",
        "Good product for the price. Does everything I need it to do without any issues.",
        "I was expecting more based on the reviews. It's okay but not great.",
        "Absolutely love this! The design is beautiful and it works flawlessly.",
        "Had some issues with delivery but the product itself is good.",
        "Better than I expected. The features are well thought out and user-friendly.",
        "Not the best quality. Had to return it after a week of use.",
        "Perfect for my needs. Fast shipping and great customer service.",
        "The battery life could be better but overall it's a decent product.",
        "Worth every penny! I use it every day and it never disappoints."
    ];
    
    reviews.push({
        _id: reviewId,
        product_id: productId,
        user_id: userId,
        user_name: `User${(i % 50) + 1} LastName${(i % 50) + 1}`,
        rating: rating,
        title: reviewTitles[i % 10],
        comment: reviewComments[i % 10],
        verified_purchase: verifiedPurchase,
        order_id: verifiedPurchase ? `order_${String(((i % 120) + 1)).padStart(3, '0')}` : null,
        helpful_votes: Math.floor(Math.random() * 50),
        reported: i % 20 === 0, // 5% reported
        created_at: new Date(2024, 0, (i % 30) + 1),
        updated_at: new Date(2024, 0, (i % 30) + 1)
    });
}

db.reviews.insertMany(reviews);
print(`✅ ${reviews.length} Reviews inserted successfully!`);