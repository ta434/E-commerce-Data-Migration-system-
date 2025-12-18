-- ==========================================
-- 02_schema_design.sql
-- Enterprise PostgreSQL Schema Design
-- ==========================================

-- Switch to the database (run this after creating database)
-- \c electronics_store

-- 1. Categories Table (from categories collection)
CREATE TABLE categories (
    category_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_category_id VARCHAR(50) REFERENCES categories(category_id),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    CONSTRAINT unique_slug UNIQUE (slug)
);

CREATE INDEX idx_categories_parent ON categories(parent_category_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = true;

-- 2. Users Table (from users collection)
CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(200) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    password_hash VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT false,
    
    -- Membership information
    membership_tier VARCHAR(20) DEFAULT 'regular',
    loyalty_points INTEGER DEFAULT 0,
    joined_date DATE,
    
    -- Preferences as JSONB for flexibility
    preferences JSONB,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_membership_tier CHECK (membership_tier IN ('new', 'regular', 'premium', 'vip')),
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_membership ON users(membership_tier);
CREATE INDEX idx_users_verified ON users(is_verified) WHERE is_verified = true;
CREATE INDEX idx_users_preferences ON users USING GIN (preferences);

-- 3. Addresses Table (from users.addresses array)
CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    address_type VARCHAR(50) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'USA',
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_address_type CHECK (address_type IN ('home', 'work', 'billing', 'shipping'))
);

CREATE INDEX idx_addresses_user ON addresses(user_id);
CREATE INDEX idx_addresses_primary ON addresses(is_primary) WHERE is_primary = true;
CREATE INDEX idx_addresses_city ON addresses(city);
CREATE INDEX idx_addresses_state ON addresses(state);

-- 4. Products Table (from products collection)
CREATE TABLE products (
    product_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category_id VARCHAR(50) NOT NULL REFERENCES categories(category_id),
    brand VARCHAR(100) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    
    -- Attributes as JSONB for flexibility
    attributes JSONB,
    
    -- Inventory management
    inventory_quantity INTEGER DEFAULT 0 CHECK (inventory_quantity >= 0),
    low_stock_threshold INTEGER DEFAULT 10,
    reserved_quantity INTEGER DEFAULT 0 CHECK (reserved_quantity >= 0),
    
    -- Media and classification
    images TEXT[],
    tags TEXT[],
    
    -- Status and timestamps
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Computed columns
    available_quantity INTEGER GENERATED ALWAYS AS (inventory_quantity - reserved_quantity) STORED,
    is_low_stock BOOLEAN GENERATED ALWAYS AS (inventory_quantity <= low_stock_threshold) STORED,
    inventory_value DECIMAL(12,2) GENERATED ALWAYS AS (price * inventory_quantity) STORED
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_tags ON products USING GIN (tags);
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);
CREATE INDEX idx_products_low_stock ON products(is_low_stock) WHERE is_low_stock = true;

-- 5. Product Variants Table (from products.variants array)
CREATE TABLE product_variants (
    variant_id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    storage VARCHAR(50),
    color VARCHAR(50),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Composite unique constraint
    CONSTRAINT unique_variant UNIQUE (product_id, storage, color)
);

CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_storage ON product_variants(storage);
CREATE INDEX idx_variants_color ON product_variants(color);

-- 6. Orders Table (from orders collection)
CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    user_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    order_status VARCHAR(50) DEFAULT 'pending',
    
    -- Pricing information
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    tax DECIMAL(10,2) NOT NULL CHECK (tax >= 0),
    shipping_cost DECIMAL(10,2) NOT NULL CHECK (shipping_cost >= 0),
    discount DECIMAL(10,2) NOT NULL CHECK (discount >= 0),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    
    -- Shipping information
    shipping_address_id INTEGER REFERENCES addresses(address_id),
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(100),
    carrier VARCHAR(100),
    estimated_delivery DATE,
    actual_delivery TIMESTAMP WITH TIME ZONE,
    
    -- Payment information
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_id VARCHAR(100),
    
    -- Additional fields
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_order_status CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded'))
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_tracking ON orders(tracking_number) WHERE tracking_number IS NOT NULL;

-- 7. Order Items Table (from orders.items array)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL REFERENCES products(product_id),
    variant_id VARCHAR(50) REFERENCES product_variants(variant_id),
    product_name VARCHAR(255) NOT NULL,
    variant_info VARCHAR(255),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_variant ON order_items(variant_id);

-- 8. Reviews Table (from reviews collection)
CREATE TABLE reviews (
    review_id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL REFERENCES products(product_id),
    user_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    order_id VARCHAR(50) REFERENCES orders(order_id),
    helpful_votes INTEGER DEFAULT 0 CHECK (helpful_votes >= 0),
    reported BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure one review per product per user
    CONSTRAINT one_review_per_product_user UNIQUE (product_id, user_id)
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_verified ON reviews(verified_purchase) WHERE verified_purchase = true;
CREATE INDEX idx_reviews_helpful ON reviews(helpful_votes);

-- 9. Shopping Cart Table (from users.cart array)
CREATE TABLE shopping_cart (
    cart_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL REFERENCES products(product_id),
    variant_id VARCHAR(50) REFERENCES product_variants(variant_id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure unique product-variant combination per user
    CONSTRAINT unique_cart_item UNIQUE (user_id, product_id, variant_id)
);

CREATE INDEX idx_cart_user ON shopping_cart(user_id);
CREATE INDEX idx_cart_product ON shopping_cart(product_id);

-- 10. Analytics and Summary Tables (For Business Intelligence)
CREATE TABLE customer_summary (
    user_id VARCHAR(50) PRIMARY KEY REFERENCES users(user_id),
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    first_order_date TIMESTAMP WITH TIME ZONE,
    last_order_date TIMESTAMP WITH TIME ZONE,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    favorite_category VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customer_summary_spent ON customer_summary(total_spent);
CREATE INDEX idx_customer_summary_orders ON customer_summary(total_orders);

CREATE TABLE product_performance (
    product_id VARCHAR(50) PRIMARY KEY REFERENCES products(product_id),
    total_units_sold INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    stock_turnover_rate DECIMAL(8,2) DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_performance_sold ON product_performance(total_units_sold);
CREATE INDEX idx_product_performance_revenue ON product_performance(total_revenue);

-- Display completion message
DO $$ 
BEGIN
    RAISE NOTICE '✅ PostgreSQL schema created successfully with 10 optimized tables!';
    RAISE NOTICE '📊 Tables created: categories, users, addresses, products, product_variants, orders, order_items, reviews, shopping_cart, customer_summary, product_performance';
END $$;