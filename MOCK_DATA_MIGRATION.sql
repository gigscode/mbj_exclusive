-- SQL Script to migrate mock products to Supabase
-- Run this in the Supabase SQL Editor

INSERT INTO products (name, description, price, category, images, sizes, colors, in_stock)
VALUES 
  (
    'Beaded Cocktail Dress', 
    'Stunning beaded cocktail dress with intricate African-inspired embellishments. Perfect for evening events and special occasions.', 
    185000, 
    'dresses', 
    ARRAY['/beaded-cocktail-dress-african-glamour.jpg'], 
    ARRAY['XS', 'S', 'M', 'L', 'XL'], 
    ARRAY['Gold', 'Black'], 
    true
  ),
  (
    'Luxurious Gold Wedding Gown', 
    'Breathtaking gold wedding gown with exquisite detailing. A statement piece for your special day.', 
    450000, 
    'bridal', 
    ARRAY['/beautiful-african-bride-in-luxurious-gold-wedding-.jpg'], 
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
    ARRAY['Gold', 'Champagne'], 
    true
  ),
  (
    'Chiffon Boubou', 
    'Elegant chiffon boubou showcasing contemporary African fashion. Flowing and comfortable for any occasion.', 
    95000, 
    'separates', 
    ARRAY['/chiffon-boubou-elegant-african-fashion.jpg'], 
    ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
    ARRAY['Blue', 'Purple', 'Green'], 
    true
  ),
  (
    'Luxurious Gold Evening Dress', 
    'Sophisticated gold evening dress with modern silhouette. Perfect for galas and upscale events.', 
    220000, 
    'gowns', 
    ARRAY['/elegant-african-woman-in-luxurious-gold-dress-fash.jpg'], 
    ARRAY['XS', 'S', 'M', 'L', 'XL'], 
    ARRAY['Gold', 'Silver'], 
    true
  ),
  (
    'Red Couture Gown', 
    'Show-stopping red couture gown with dramatic design. Runway-ready elegance for the modern woman.', 
    275000, 
    'gowns', 
    ARRAY['/elegant-african-woman-in-red-couture-gown-runway-f.jpg'], 
    ARRAY['XS', 'S', 'M', 'L', 'XL'], 
    ARRAY['Red', 'Burgundy'], 
    true
  ),
  (
    'Red Velvet Evening Gown', 
    'Timeless red velvet evening gown with luxurious fabric and impeccable tailoring.', 
    195000, 
    'gowns', 
    ARRAY['/elegant-red-velvet-evening-gown-african-fashion.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Red', 'Wine'], 
    true
  ),
  (
    'Gold Embroidered Kaftan', 
    'Regal gold embroidered kaftan celebrating Nigerian fashion heritage with contemporary flair.', 
    165000, 
    'separates', 
    ARRAY['/gold-embroidered-kaftan-nigerian-fashion.jpg'], 
    ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
    ARRAY['Gold', 'Cream', 'White'], 
    true
  ),
  (
    'Lace Aso-Oke Ensemble', 
    'Traditional lace and aso-oke ensemble with modern styling. A celebration of Nigerian culture.', 
    145000, 
    'separates', 
    ARRAY['/lace-aso-oke-traditional-nigerian-fashion.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Coral', 'Peach', 'Gold'], 
    true
  ),
  (
    'Sequin Mermaid Gown', 
    'Glamorous sequin mermaid gown that captures the essence of Nigerian luxury fashion.', 
    285000, 
    'gowns', 
    ARRAY['/sequin-mermaid-gown-nigerian-glamour-fashion.jpg'], 
    ARRAY['XS', 'S', 'M', 'L', 'XL'], 
    ARRAY['Gold', 'Silver', 'Rose Gold'], 
    true
  ),
  (
    'Silk Wrap Dress', 
    'Versatile silk wrap dress with elegant draping. Perfect for both day and evening wear.', 
    125000, 
    'dresses', 
    ARRAY['/silk-wrap-dress-african-woman-fashion.jpg'], 
    ARRAY['XS', 'S', 'M', 'L', 'XL'], 
    ARRAY['Navy', 'Black', 'Emerald'], 
    true
  ),
  (
    'Contemporary Chic Outfit', 
    'Stylish contemporary outfit blending African aesthetics with modern design.', 
    155000, 
    'separates', 
    ARRAY['/stylish-african-woman-in-chic-contemporary-outfit-.jpg'], 
    ARRAY['S', 'M', 'L', 'XL'], 
    ARRAY['Multi', 'Black', 'White'], 
    true
  ),
  (
    'Royal Ankara Ensemble', 
    'Bold royal ankara ensemble with vibrant African prints and impeccable tailoring.', 
    135000, 
    'separates', 
    ARRAY['/royal-ankara-ensemble-african-print-fashion.jpg'], 
    ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
    ARRAY['Multi', 'Blue', 'Red'], 
    true
  );
