-- Drop existing tables if they exist
DROP TABLE IF EXISTS applied_coupons CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;

-- Coupons table
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'product_specific')),
    discount_value DECIMAL(10,2) NOT NULL CHECK (discount_value > 0),
    minimum_order DECIMAL(10,2),
    maximum_discount DECIMAL(10,2),
    usage_limit INTEGER,
    usage_limit_per_user INTEGER,
    eligible_product_ids UUID[] DEFAULT NULL,
    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Applied coupons table (tracks coupon usage)
CREATE TABLE applied_coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id),
    user_id UUID NOT NULL REFERENCES auth.users,
    coupon_code VARCHAR(50) NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL CHECK (discount_amount >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    FOREIGN KEY (coupon_code) REFERENCES coupons(code)
);

-- Enable RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE applied_coupons ENABLE ROW LEVEL SECURITY;

-- Policies for coupons
CREATE POLICY "Public can view active coupons"
    ON coupons FOR SELECT
    USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Only admins can manage coupons"
    ON coupons
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = auth.users.id
            AND auth.users.role = 'admin'
        )
    );

-- Policies for applied coupons
CREATE POLICY "Users can view their applied coupons"
    ON applied_coupons FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their applied coupons"
    ON applied_coupons FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Triggers for updating timestamps
CREATE TRIGGER update_coupons_updated_at
    BEFORE UPDATE ON coupons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applied_coupons_updated_at
    BEFORE UPDATE ON applied_coupons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active_expired ON coupons(is_active, expires_at);
CREATE INDEX idx_applied_coupons_user ON applied_coupons(user_id);
CREATE INDEX idx_applied_coupons_order ON applied_coupons(order_id);
CREATE INDEX idx_applied_coupons_code ON applied_coupons(coupon_code);

-- Function to check coupon validity
CREATE OR REPLACE FUNCTION check_coupon_validity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if coupon exists and is active
    IF NOT EXISTS (
        SELECT 1 FROM coupons
        WHERE code = NEW.coupon_code
        AND is_active = true
        AND (expires_at IS NULL OR expires_at > NOW())
    ) THEN
        RAISE EXCEPTION 'Invalid or expired coupon code';
    END IF;

    -- Check usage limit
    IF EXISTS (
        SELECT 1 FROM coupons
        WHERE code = NEW.coupon_code
        AND usage_limit IS NOT NULL
        AND (
            SELECT COUNT(*)
            FROM applied_coupons
            WHERE coupon_code = NEW.coupon_code
        ) >= usage_limit
    ) THEN
        RAISE EXCEPTION 'Coupon usage limit exceeded';
    END IF;

    -- Check per-user usage limit
    IF EXISTS (
        SELECT 1 FROM coupons
        WHERE code = NEW.coupon_code
        AND usage_limit_per_user IS NOT NULL
        AND (
            SELECT COUNT(*)
            FROM applied_coupons
            WHERE coupon_code = NEW.coupon_code
            AND user_id = NEW.user_id
        ) >= usage_limit_per_user
    ) THEN
        RAISE EXCEPTION 'User coupon usage limit exceeded';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check coupon validity before insert
CREATE TRIGGER check_coupon_before_apply
    BEFORE INSERT ON applied_coupons
    FOR EACH ROW
    EXECUTE FUNCTION check_coupon_validity(); 