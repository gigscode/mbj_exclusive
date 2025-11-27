-- Add is_featured column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Update existing products to be featured (optional, for demo purposes)
-- UPDATE products SET is_featured = true WHERE id IN (SELECT id FROM products LIMIT 4);
