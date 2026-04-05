# 🛍️ Product Studio

A modern, feature-rich product management dashboard built with Next.js. Create, edit, delete, and manage your products with a beautiful UI that supports both light and dark modes.

## ✨ Features

- **Complete CRUD Operations** - Add, edit, and delete products seamlessly
- **Persistent Storage** - Data saved in browser's localStorage (no backend)
- **Dark/Light Mode** - Beautiful gradient themes for both modes
- **Real-time Search** - Filter products by name, description, or category
- **Statistics Dashboard** - View total products, stock status, and total value
- **Form Validation** - Prevent empty submissions with helpful error messages
- **Toast Notifications** - Instant feedback for all actions
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Image Preview** - Live image preview when adding product URLs

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type safety and better developer experience |
| **Tailwind CSS** | Utility-first styling |
| **next-themes** | Dark/light mode management |
| **Lucide React** | Beautiful, consistent icons |
| **LocalStorage** | Client-side data persistence |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Steps to Run Locally
1. **Clone the repository**
   git clone https://github.com/ridma1026/Product-Management.git
   cd product-studio
2. **Install dependencies**
    npm install
3. **Run the development server**
    npm run dev
4. **Open your browser**
    http://localhost:3000

### 🎯 Usage Guide
**Adding a Product**
    Click the + Add Product button
    Fill in product details (name, price, description)
    Optional: Add an image URL
    Select stock status and category
    Click Save Product

**Editing a Product**
    Click the Edit button on any product card
    Update the information in the modal
    Click Update Product

**Deleting a Product**
    Click the Delete button on any product card
    Confirm deletion in the modal
    Product is permanently removed

**Searching Products**
    Type in the search bar to filter products by name, description, or category

**Switching Themes**
    Click the sun/moon icon in the top bar to toggle between light and dark mode

## 📁 Project Structure

product-studio/
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Main products page
│   └── globals.css         # Global styles & CSS variables
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── StatsBar.tsx        # Statistics cards
│   ├── ProductCard.tsx     # Individual product display
│   ├── ProductModal.tsx    # Add/Edit product form
│   ├── DeleteModal.tsx     # Delete confirmation
│   ├── Toast.tsx           # Notification system
│   └── ThemeToggle.tsx     # Dark/light mode switcher
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   └── storage.ts          # localStorage helpers
└── public/                 # Static assets

## 💾 Data Storage
    All products are stored in your browser's localStorage using the key product_studio_v1. This means:
    ✅ Data persists after page refresh
    ✅ Works offline
    ✅ No backend or database required
    ✅ Sample products pre-loaded on first visit

## Future Improvements 
    Given more time, I would add:
    Backend Integration - Connect to a real database (PostgreSQL/MongoDB)
    User Authentication - Login system for multiple users
    Export Functionality - Export products to CSV/PDF
    Advanced Filters - Filter by price range, stock status, and categories
    Pagination - Handle large product lists efficiently
    Analytics Charts - Visual representation of sales and inventory

## Assumptions
    During development, I assumed:
    No backend required - Using localStorage for simplicity
    Sample products - Pre-loaded to demonstrate functionality
    Image URLs - External URLs instead of file uploads
    Single user - No authentication needed for this demo
    Mobile-first - Responsive design prioritized

## Acknowledgments
    Icons by Lucide
    Built with Next.js
    Styled with Tailwind CSS