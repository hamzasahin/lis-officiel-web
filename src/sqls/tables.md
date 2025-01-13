LIS OFFICIEL

ALL TABLES IN DB: 

Users: This table stores information about registered users of your application, including their names, email addresses, passwords, and phone numbers.

Addresses: This table holds addresses associated with users for billing and shipping purposes.

Categories: This table contains jewelry product categories, such as necklaces, bracelets, or rings. It supports hierarchical categorization through a parent_category_id.

Products: This table stores information about individual jewelry products, including their names, descriptions, categories, and prices.

ProductImages: This table holds image URLs for each product, along with an "is_primary" field to indicate the main product image.

ProductVariants: This table contains information about different variations of a product, such as size and color, and their available quantities.

Orders: This table stores details about customer orders, including user_id, shipping and billing address IDs, order status, and total amount.

OrderStatus: This table holds the various order statuses, such as "processing", "shipped", or "completed".

OrderItems: This table contains information about individual items within an order, including their associated product, quantity, and price.

Wishlist: This table stores information about each user's wishlist.

WishlistItems: This table holds the association between wishlists and the products users have added to their wishlists.

Reviews: This table stores customer reviews for products, including ratings, titles, and content.

Coupons: This table contains information about discount coupons, including the discount type (percentage or fixed), discount value, expiration date, and any minimum order value or maximum discount value restrictions.

AppliedCoupons: This table keeps track of the coupons that have been applied to orders.

ProductTags: This table stores tags that can be assigned to products, such as "gold" or "handmade".

ProductTagAssignments: This table holds the association between products and their assigned tags.

SalePromotions: This table contains information about sale promotions, including their names, start and end dates, discount types, and discount values.

SalePromotionProducts: This table holds the association between sale promotions and the products included in the promotions.

UserRoles: This table stores user roles for access control and permissions, such as "customer", "admin", or "editor".

UserRoleAssignments: This table contains the association between users and their assigned roles.

ShippingMethods: This table stores information about available shipping methods, including their names, descriptions, and prices.

FAQCategories: This table holds categories for frequently asked questions (FAQs), such as "shipping" or "returns".

FAQs: This table contains the actual FAQs, including their questions, answers, and associated FAQ category.
