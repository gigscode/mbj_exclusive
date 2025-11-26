# Admin Dashboard - README

## Overview

The MBJ Exclusive Admin Dashboard is a full-featured product management system built with Next.js, TypeScript, and Supabase. It allows administrators to manage the store's product inventory including uploading, editing, and deleting products with images.

## Features

### ✨ Core Features

- **Authentication**: Secure admin login using Supabase Auth
- **Product Management**: Full CRUD operations for products
- **Image Upload**: Drag-and-drop image upload with preview
- **Search & Filter**: Search products by name and filter by category
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant synchronization with Supabase database

### 🎨 Product Features

- Multiple images per product (up to 5)
- Category management (Dresses, Gowns, Separates, Bridal)
- Size selection (XS, S, M, L, XL, XXL)
- Color variants
- Stock status tracking
- Price management in Naira (₦)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **UI Components**: Radix UI + Custom components
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. A Supabase account and project
3. Admin credentials set up in Supabase

### Installation

The dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### Configuration

1. **Set up Supabase** - Follow the complete guide in `SUPABASE_SETUP.md`

2. **Configure environment variables** - Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then update with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Start the development server**:

```bash
npm run dev
```

4. **Access the admin dashboard** at `http://localhost:3000/admin/login`

## Project Structure

```
app/
├── admin/
│   ├── layout.tsx              # Admin layout with auth protection
│   ├── page.tsx                # Dashboard home with statistics
│   ├── login/
│   │   └── page.tsx           # Admin login page
│   └── products/
│       ├── page.tsx           # Products list with search/filter
│       ├── new/
│       │   └── page.tsx       # Create new product
│       └── [id]/
│           └── page.tsx       # Edit product
├── api/
│   └── products/
│       └── route.ts           # Public API for frontend
components/
├── admin/
│   ├── admin-nav.tsx          # Admin navigation sidebar
│   ├── delete-product-dialog.tsx
│   ├── image-upload.tsx       # Image upload component
│   └── product-form.tsx       # Product form (create/edit)
contexts/
└── admin-context.tsx          # Admin authentication context
lib/
├── supabase.ts               # Supabase client configuration
├── database.types.ts         # TypeScript types for database
├── types.ts                  # App-wide TypeScript types
└── products-data.ts          # Static product data (backup)
```

## Usage Guide

### Logging In

1. Navigate to `/admin/login`
2. Enter your admin email and password (created in Supabase)
3. Click "Sign In"

### Creating a Product

1. Navigate to **Products** in the sidebar
2. Click **"Add Product"** button
3. Fill in the product details:
   - Name (required)
   - Description (required)
   - Price in Naira (required)
   - Category (required)
   - Upload images (required, at least 1)
   - Select sizes (required, at least 1)
   - Select colors (required, at least 1)
   - Set stock status
4. Click **"Create Product"**

### Editing a Product

1. Go to the Products page
2. Click **"Edit"** on any product card
3. Update the desired fields
4. Click **"Save Changes"**

### Deleting a Product

1. Go to the Products page
2. Click the **trash icon** on any product card
3. Confirm the deletion in the dialog

### Searching & Filtering

- Use the **search bar** to find products by name
- Use the **category dropdown** to filter by category
- Filters update the list in real-time

## API Endpoints

### Public Endpoints

- `GET /api/products` - Fetch all products (public)
  - Query params: `?category=dresses&limit=10`

### Authentication

All admin operations are protected by Supabase Auth. The admin context automatically handles:
- Session management
- Token refresh
- Route protection

## Database Schema

See `SUPABASE_SETUP.md` for the complete database schema.

### Products Table

```typescript
{
  id: UUID (primary key)
  name: string
  description: string
  price: number
  category: 'dresses' | 'gowns' | 'separates' | 'bridal'
  images: string[]
  sizes: string[]
  colors: string[]
  in_stock: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

## Security

### Row Level Security (RLS)

- **Read**: Anyone can view products (for public website)
- **Create/Update/Delete**: Only authenticated users

### Storage Policies

- **Read**: Public access to product images
- **Upload/Delete**: Authenticated users only

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Ensure `.env.local` exists with correct values
   - Restart dev server after changes

2. **Images not uploading**
   - Check Supabase Storage bucket `product-images` exists
   - Verify bucket is set to public
   - Check storage policies are configured

3. **Can't log in**
   - Verify admin user exists in Supabase Auth
   - Check email is confirmed
   - Ensure password is correct

4. **Products not appearing**
   - Check database connection
   - Verify RLS policies allow SELECT for public
   - Check browser console for errors

## Development Tips

### Adding New Product Fields

1. Update the database schema in Supabase
2. Update `lib/database.types.ts`
3. Update `lib/types.ts` Product interface
4. Update `ProductForm` component
5. Update API routes to handle new fields

### Customizing the UI

- Colors are defined in `globals.css` (--gold, --charcoal, --cream)
- Components use Tailwind CSS classes
- Radix UI components can be customized in `components/ui/`

## Future Enhancements

Potential features to add:

- [ ] Product variants (size/color combinations with separate stock)
- [ ] Bulk product upload (CSV import)
- [ ] Sales analytics and reports
- [ ] Order management
- [ ] Customer management
- [ ] Email notifications
- [ ] Product reviews management
- [ ] Inventory tracking
- [ ] Multi-admin support with roles

## Support

For issues or questions:

1. Check `SUPABASE_SETUP.md` for setup issues
2. Review the troubleshooting section above
3. Check Supabase logs in the dashboard
4. Review browser console for errors

## License

Part of the MBJ Exclusive e-commerce platform.

---

**Happy Managing! 🎉**
