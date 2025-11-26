# Supabase Setup Guide for MBJ Exclusive Admin Dashboard

This guide will walk you through setting up Supabase for the admin dashboard feature.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js installed (already done)
- The Supabase client library (already installed)

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: mbj-exclusive (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to Nigeria (e.g., Frankfurt or Singapore)
5. Click "Create new project"
6. Wait for the project to be provisioned (~2 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, click on the "Settings" icon (gear) in the sidebar
2. Go to "API" section
3. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. In your project root, update the `.env.local` file (or create it if it doesn't exist):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Create the Database Schema

1. In your Supabase dashboard, click on "SQL Editor" in the sidebar
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('dresses', 'gowns', 'separates', 'bridal')),
  images TEXT[] NOT NULL,
  sizes TEXT[] NOT NULL,
  colors TEXT[] NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can view products (for public website)
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

-- Create policy: Only authenticated users can insert products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy: Only authenticated users can update products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy: Only authenticated users can delete products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX products_created_at_idx ON products(created_at DESC);
```

4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned" message

## Step 5: Set Up Storage for Product Images

1. In your Supabase dashboard, click on "Storage" in the sidebar
2. Click "Create a new bucket"
3. Enter bucket details:
   - **Name**: `product-images`
   - **Public bucket**: Toggle ON (so product images can be viewed publicly)
4. Click "Create bucket"

### Configure Storage Policies

1. Click on the `product-images` bucket you just created
2. Go to "Policies" tab
3. Click "New Policy"
4. Choose "For full customization" template
5. Create the following policies:

**Policy 1: Public Read Access**
```sql
-- Name: Public can view product images
-- Allowed operation: SELECT
-- Target roles: public

CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

**Policy 2: Authenticated Upload**
```sql
-- Name: Authenticated users can upload images
-- Allowed operation: INSERT
-- Target roles: authenticated

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
```

**Policy 3: Authenticated Delete**
```sql
-- Name: Authenticated users can delete images
-- Allowed operation: DELETE
-- Target roles: authenticated

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
```

## Step 6: Create Admin User

You have two options for creating an admin user:

### Option A: Using Supabase Dashboard (Recommended)

1. In your Supabase dashboard, click on "Authentication" in the sidebar
2. Click on "Users"
3. Click "Add user" → "Create new user"
4. Enter:
   - **Email**: Your admin email (e.g., admin@mbjexclusive.com)
   - **Password**: Create a strong password
   - **Auto Confirm User**: Toggle ON
5. Click "Create user"

### Option B: Using SQL

```sql
-- This is just for reference, it's easier to use the dashboard
-- Replace with your actual email and password
INSERT INTO auth.users (
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  crypt('your_password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  'authenticated'
);
```

## Step 7: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/admin/login`

3. Log in with the admin credentials you created in Step 6

4. You should be redirected to the admin dashboard

5. Try creating a test product to verify everything works

## Migrating Existing Products (Optional)

If you want to migrate your existing products from `lib/products-data.ts` to Supabase:

1. Go to SQL Editor in Supabase
2. Run the following query with your existing products data:

```sql
INSERT INTO products (name, description, price, category, images, sizes, colors, in_stock)
VALUES 
  ('Beaded Cocktail Dress', 'Stunning beaded cocktail dress...', 185000, 'dresses', 
   ARRAY['/beaded-cocktail-dress-african-glamour.jpg'], 
   ARRAY['XS', 'S', 'M', 'L', 'XL'], 
   ARRAY['Gold', 'Black'], 
   true),
  -- Add more products here following the same pattern
;
```

Or create a migration script to do this automatically.

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env.local` file exists and has the correct values
- Restart your development server after adding environment variables

### Error: "Access to product-images bucket denied"
- Verify the storage policies are set up correctly
- Make sure the bucket is set to public
- Check that you're authenticated when uploading

### Error: "Row Level Security policy violation"
- Make sure you're logged in as an authenticated user
- Verify the RLS policies are created correctly
- Check that the policies allow the operation you're trying to perform

### Images not showing
- Verify the `product-images` bucket is public
- Check that the image URLs are correct
- Make sure the images were uploaded successfully

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** on your Supabase account
4. **Regularly rotate** your API keys if compromised
5. **Monitor** your Supabase usage in the dashboard

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Project Issues: Create an issue in your repository

---

## Summary

You've now successfully set up:
- ✅ Supabase project
- ✅ Products database table with RLS policies
- ✅ Storage bucket for product images
- ✅ Admin authentication
- ✅ Environment configuration

You're ready to start managing products through the admin dashboard!
