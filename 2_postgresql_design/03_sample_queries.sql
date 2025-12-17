-- ==========================================
-- 03_sample_queries.sql
-- Sample Queries for PostgreSQL Database
-- ==========================================

-- 1. Basic Count Queries
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews
ORDER BY table_name;

-- 2. Product Catalog with Categories
SELECT 
    p.product_id,
    p.name as product_name,
    p.brand,
    p.price,
    c.name as category_name,
    p.inventory_quantity as stock,
    p.available_quantity as available
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE p.is_active = true
ORDER BY p.price DESC
LIMIT 10;

-- 3. Customer Order Summary
SELECT 
    u.user_id,
    u.full_name,
    u.membership_tier,
    COUNT(o.order_id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    AVG(o.total_amount) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.full_name, u.membership_tier
ORDER BY total_spent DESC
LIMIT 10;

-- 4. Product Performance Analysis
SELECT 
    p.product_id,
    p.name as product_name,
    p.brand,
    p.price,
    COALESCE(SUM(oi.quantity), 0) as units_sold,
    COALESCE(SUM(oi.subtotal), 0) as revenue_generated,
    p.inventory_quantity as current_stock
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name, p.brand, p.price, p.inventory_quantity
ORDER BY revenue_generated DESC
LIMIT 10;

-- 5. Order Status Distribution
SELECT 
    order_status,
    COUNT(*) as order_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders), 2) as percentage
FROM orders
GROUP BY order_status
ORDER BY order_count DESC;

-- 6. Review Analysis by Product
SELECT 
    p.product_id,
    p.name as product_name,
    COUNT(r.review_id) as review_count,
    ROUND(AVG(r.rating), 2) as avg_rating,
    COUNT(CASE WHEN r.verified_purchase = true THEN 1 END) as verified_reviews
FROM products p
LEFT JOIN reviews r ON p.product_id = r.product_id
GROUP BY p.product_id, p.name
HAVING COUNT(r.review_id) > 0
ORDER BY avg_rating DESC, review_count DESC
LIMIT 10;

-- 7. Inventory Health Check
SELECT 
    name as product_name,
    brand,
    inventory_quantity as current_stock,
    low_stock_threshold,
    available_quantity as available,
    is_low_stock,
    inventory_value
FROM products
WHERE is_active = true
ORDER BY 
    is_low_stock DESC,
    inventory_quantity ASC
LIMIT 15;

-- 8. Sales Performance by Category
SELECT 
    c.name as category_name,
    COUNT(DISTINCT oi.product_id) as unique_products,
    SUM(oi.quantity) as total_units_sold,
    ROUND(SUM(oi.subtotal), 2) as total_revenue,
    ROUND(AVG(oi.unit_price), 2) as avg_product_price
FROM categories c
JOIN products p ON c.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY c.category_id, c.name
ORDER BY total_revenue DESC;

-- Display completion message
DO $$ 
BEGIN
    RAISE NOTICE '✅ Sample queries executed successfully!';
    RAISE NOTICE '📈 Database is ready for migration and analytics!';
END $$;