-- ==========================================
-- 01_create_database.sql
-- Create PostgreSQL Database and Extensions
-- ==========================================

-- Create database
CREATE DATABASE electronics_store;

-- Connect to the database
\c electronics_store;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schema if needed
CREATE SCHEMA IF NOT EXISTS ecommerce;

-- Set timezone
SET timezone = 'UTC';

-- Create dedicated user for the application (optional)
-- CREATE USER ecommerce_user WITH PASSWORD 'secure_password';
-- GRANT ALL PRIVILEGES ON DATABASE electronics_store TO ecommerce_user;

-- Display creation message
DO $$ 
BEGIN
    RAISE NOTICE '✅ PostgreSQL database electronics_store created successfully!';
END $$;