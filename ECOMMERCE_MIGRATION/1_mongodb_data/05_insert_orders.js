// ==========================================
// 05_insert_orders.js - ENTERPRISE SCALE (100+ orders)
// ==========================================

db = db.getSiblingDB('electronics_store');

const orders = [];
const orderStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const paymentMethods = ["credit_card", "debit_card", "paypal", "apple_pay", "google_pay"];
const shippingCarriers = ["UPS", "FedEx", "DHL", "USPS"];

// Generate 100+ realistic orders
for (let i = 1; i <= 120; i++) {
    const orderId = `order_${String(i).padStart(3, '0')}`;
    const userId = `user_${String((i % 50) + 1).padStart(3, '0')}`;
    const orderDate = new Date(2024, 0, (i % 30) + 1, (i % 24), (i % 60));
    
    // Create 1-3 items per order
    const items = [];
    const itemCount = (i % 3) + 1;
    let subtotal = 0;
    
    for (let j = 0; j < itemCount; j++) {
        const productNum = ((i + j) % 29) + 1;
        const productId = `prod_${String(productNum).padStart(3, '0')}`;
        const variantNum = ((i + j) % 10) + 1;
        const variantId = `var_${String(variantNum).padStart(3, '0')}`;
        const quantity = (j % 2) + 1;
        const unitPrice = [299.99, 499.99, 799.99, 1099.99, 1299.99, 199.99, 399.99][productNum % 7];
        const itemSubtotal = unitPrice * quantity;
        
        items.push({
            product_id: productId,
            variant_id: variantId,
            product_name: `Product ${productNum}`,
            variant_info: `${['128GB', '256GB', '512GB', '1TB'][variantNum % 4]} ${['Black', 'White', 'Blue', 'Silver'][variantNum % 4]}`,
            quantity: quantity,
            unit_price: unitPrice,
            subtotal: itemSubtotal
        });
        
        subtotal += itemSubtotal;
    }
    
    const tax = subtotal * 0.08;
    const shipping = subtotal > 500 ? 0 : 15.99;
    const discount = i % 5 === 0 ? subtotal * 0.1 : 0; // 20% of orders get 10% discount
    const total = subtotal + tax + shipping - discount;
    
    const statusIndex = Math.min(Math.floor(i / 20), 5); // Distribute statuses
    const status = orderStatuses[statusIndex];
    
    const isDelivered = status === "delivered";
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + (i % 7) + 3);
    
    const actualDelivery = isDelivered ? new Date(estimatedDelivery) : null;
    if (actualDelivery) {
        actualDelivery.setDate(actualDelivery.getDate() - (i % 3));
    }
    
    orders.push({
        _id: orderId,
        order_number: `ORD-2024-${String(i).padStart(4, '0')}`,
        user_id: userId,
        customer_info: {
            email: `user${(i % 50) + 1}@email.com`,
            shipping_address: {
                street: `${((i % 50) + 1) * 100} Main Street`,
                city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][i % 5],
                state: ["NY", "CA", "IL", "TX", "AZ"][i % 5],
                zip_code: `${10000 + (i % 50) + 1}`,
                country: "USA"
            },
            billing_address: {
                street: `${((i % 50) + 1) * 100} Main Street`,
                city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][i % 5],
                state: ["NY", "CA", "IL", "TX", "AZ"][i % 5],
                zip_code: `${10000 + (i % 50) + 1}`,
                country: "USA"
            }
        },
        items: items,
        pricing: {
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            shipping: parseFloat(shipping.toFixed(2)),
            discount: parseFloat(discount.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        },
        payment_info: {
            payment_id: `pay_${String(i).padStart(3, '0')}`,
            method: paymentMethods[i % 5],
            status: "completed",
            amount_charged: parseFloat(total.toFixed(2)),
            transaction_date: new Date(orderDate.getTime() + 600000) // 10 minutes after order
        },
        shipping: {
            method: ["standard", "express", "overnight"][i % 3],
            tracking_number: `TRK${1000000000 + i}`,
            carrier: shippingCarriers[i % 4],
            status: status,
            estimated_delivery: estimatedDelivery,
            actual_delivery: actualDelivery
        },
        status: status,
        notes: i % 8 === 0 ? "Leave at front door if no answer" : "",
        created_at: orderDate,
        updated_at: isDelivered ? actualDelivery : new Date(orderDate.getTime() + 3600000) // 1 hour later
    });
}

// Add some high-value orders
orders.push(
    {
        _id: "order_vip_001",
        order_number: "ORD-2024-VIP01",
        user_id: "user_vip_001",
        customer_info: {
            email: "michael.johnson@corporation.com",
            shipping_address: {
                street: "1 Executive Boulevard",
                city: "New York",
                state: "NY",
                zip_code: "10001",
                country: "USA"
            },
            billing_address: {
                street: "1 Executive Boulevard",
                city: "New York",
                state: "NY",
                zip_code: "10001",
                country: "USA"
            }
        },
        items: [
            {
                product_id: "prod_016",
                variant_id: "var_032",
                product_name: "MacBook Pro 16-inch",
                variant_info: "4TB Space Gray",
                quantity: 5,
                unit_price: 3499.99,
                subtotal: 17499.95
            },
            {
                product_id: "prod_001",
                variant_id: "var_003",
                product_name: "iPhone 15 Pro Max",
                variant_info: "1TB Natural Titanium",
                quantity: 10,
                unit_price: 1599.99,
                subtotal: 15999.90
            }
        ],
        pricing: {
            subtotal: 33499.85,
            tax: 2680.00,
            shipping: 0.00,
            discount: 2000.00,
            total: 34179.85
        },
        payment_info: {
            payment_id: "pay_vip_001",
            method: "credit_card",
            status: "completed",
            amount_charged: 34179.85,
            transaction_date: new Date("2024-01-20T10:15:00Z")
        },
        shipping: {
            method: "overnight",
            tracking_number: "TRKVIP001001",
            carrier: "FedEx",
            status: "delivered",
            estimated_delivery: new Date("2024-01-21"),
            actual_delivery: new Date("2024-01-21T09:30:00Z")
        },
        status: "delivered",
        notes: "Corporate order - deliver to reception",
        created_at: new Date("2024-01-20T10:00:00Z"),
        updated_at: new Date("2024-01-21T09:30:00Z")
    }
);

db.orders.insertMany(orders);
print(`✅ ${orders.length} Orders inserted successfully!`);