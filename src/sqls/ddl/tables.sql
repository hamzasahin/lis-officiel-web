-- Enable UUID extension for Supabase
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (aligned with Supabase auth.users)
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT chk_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    UNIQUE (email)
);

-- Addresses Table
CREATE TABLE Addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Categories Table
CREATE TABLE Categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    parent_category_id UUID REFERENCES Categories(id) ON DELETE SET NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE (slug)
);

-- Products Table
CREATE TABLE Products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES Categories(id) ON DELETE SET NULL,
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    sale_price NUMERIC(10, 2) CHECK (sale_price >= 0),
    sku TEXT NOT NULL,
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE (sku)
);

-- ProductImages Table
CREATE TABLE ProductImages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (product_id, image_url)
);

-- ProductVariants Table
CREATE TABLE ProductVariants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    variant_name TEXT NOT NULL,
    variant_value TEXT NOT NULL,
    additional_price NUMERIC(10, 2) DEFAULT 0 CHECK (additional_price >= 0),
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (product_id, variant_name, variant_value)
);

-- Orders Table
CREATE TABLE Orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(id) ON DELETE SET NULL,
    shipping_address_id UUID REFERENCES Addresses(id),
    billing_address_id UUID REFERENCES Addresses(id),
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OrderItems Table
CREATE TABLE OrderItems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Products(id),
    variant_id UUID REFERENCES ProductVariants(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlist Table
CREATE TABLE Wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id)
);

-- WishlistItems Table
CREATE TABLE WishlistItems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wishlist_id UUID NOT NULL REFERENCES Wishlist(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Products(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (wishlist_id, product_id)
);

-- Reviews Table
CREATE TABLE Reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Products(id),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- Coupons Table
CREATE TABLE Coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value >= 0),
    expiration_date TIMESTAMPTZ,
    min_order_value NUMERIC(10, 2) CHECK (min_order_value >= 0),
    max_discount_value NUMERIC(10, 2) CHECK (max_discount_value >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (code)
);

-- AppliedCoupons Table
CREATE TABLE AppliedCoupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    coupon_id UUID NOT NULL REFERENCES Coupons(id),
    discount_amount NUMERIC(10, 2) NOT NULL CHECK (discount_amount >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (order_id, coupon_id)
);

-- ProductTags Table
CREATE TABLE ProductTags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tag_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (tag_name)
);

-- ProductTagAssignments Table
CREATE TABLE ProductTagAssignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES ProductTags(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (product_id, tag_id)
);

-- SalePromotions Table
CREATE TABLE SalePromotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (end_date > start_date)
);

-- SalePromotionProducts Table
CREATE TABLE SalePromotionProducts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    promotion_id UUID NOT NULL REFERENCES SalePromotions(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Products(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (promotion_id, product_id)
);

-- UserRoles Table
CREATE TABLE UserRoles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (role_name)
);

-- UserRoleAssignments Table
CREATE TABLE UserRoleAssignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES UserRoles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, role_id)
);

-- ShippingMethods Table
CREATE TABLE ShippingMethods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (name)
);

-- FAQCategories Table
CREATE TABLE FAQCategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (slug)
);

-- FAQs Table
CREATE TABLE FAQs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES FAQCategories(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE Users ENABLE ROW LEVEL SECURITY;
ALTER TABLE Addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE Categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE Products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ProductImages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ProductVariants ENABLE ROW LEVEL SECURITY;
ALTER TABLE Orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE OrderItems ENABLE ROW LEVEL SECURITY;
ALTER TABLE Wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE WishlistItems ENABLE ROW LEVEL SECURITY;
ALTER TABLE Reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE Coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE AppliedCoupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE ProductTags ENABLE ROW LEVEL SECURITY;
ALTER TABLE ProductTagAssignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE SalePromotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE SalePromotionProducts ENABLE ROW LEVEL SECURITY;
ALTER TABLE UserRoles ENABLE ROW LEVEL SECURITY;
ALTER TABLE UserRoleAssignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ShippingMethods ENABLE ROW LEVEL SECURITY;
ALTER TABLE FAQCategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE FAQs ENABLE ROW LEVEL SECURITY;