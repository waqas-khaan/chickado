# 🍗 Chickado - Restaurant Website & Admin POS System

A complete, production-ready full-stack restaurant platform and Point-of-Sale (POS) system built for **Chickado** — a premier fast-food brand serving crispy fried chicken, succulent zinger burgers, and fiery wings.

---

## 🌟 Key Features

### 🛒 1. Customer Storefront
- **Modern KFC-Style Aesthetics**: High-energy red, golden amber, crisp white, and charcoal theme.
- **Dynamic Category Tabs**: Burgers, Golden Fried Chicken, Crispy Wings, Party Deals & Combos, Sides, Drinks, and Desserts.
- **Customizer Modal**: Real-time selection of sizes/variants, add-ons (extra cheese, patty, dips, jalapenos), and custom instructions.
- **Persistent Cart (Zustand)**: Auto-persisted in `localStorage`, live subtotal, promo code calculations, configurable delivery fee & sales tax.
- **Dual Checkout System**:
  - **Online Order**: Saved directly to MySQL database with live order tracking.
  - **WhatsApp Direct Order**: Saves order with source `WHATSAPP` and automatically launches WhatsApp with a structured, pre-filled receipt.
- **Floating WhatsApp Badge**: Present on every customer page for 1-click inquiries and direct orders.
- **Order Tracking**: Visual 5-step live pipeline (*Pending → Preparing → Ready → Out for delivery → Completed*).

### 🖥️ 2. Cashier POS System (`/admin/pos`)
- **Touch-Friendly Layout**: Fast category filters and visual item cards on the left, active bill ticket on the right.
- **Order Types**: Dine-in (with table number picker), Takeaway, and Delivery.
- **Customer Phone Lookup**: Auto-completes customer name and previous delivery addresses.
- **Tender & Change Calculator**: Instant denomination shortcuts (Exact, 500, 1000, 2000, 5000) and change calculation.
- **Hold & Resume Bills**: Put multiple tickets on hold during busy rush hours and resume anytime.
- **Thermal Receipt (80mm)**: Standard thermal receipt formatting with store branding, order ID, items, and tax breakdown.
- **Kitchen Order Ticket (KOT)**: Specialized ticket view displaying item quantities and cooking notes for kitchen staff.
- **Daily Closing Report**: Total sales reconciliation (Cash vs. Card vs. Online) and 1-click CSV export.

### 📊 3. Admin Panel (`/admin`)
- **Role-Based Access**: Secure JWT cookie sessions with `ADMIN` and `CASHIER` roles.
- **Dashboard Analytics**: Today's revenue, order counts, average ticket size, orders by channel (Web, WhatsApp, POS), and top selling items.
- **Orders Pipeline**: Real-time order status updates and instant receipt reprinting.
- **Menu Management**: Full CRUD for Categories, Items, Variants, and Add-ons with live availability switches.
- **Promo Codes & Coupons**: Fixed PKR or percentage discounts with minimum order thresholds and usage limits.
- **Customer Directory**: Customer order history, phone numbers, and lifetime spend metrics.
- **Store Configuration**: Centralized restaurant settings (hotline, WhatsApp number, tax rate, delivery fee, and address).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19
- **Database**: MySQL 8.0 with Prisma ORM
- **Styling**: Tailwind CSS + Lucide Icons + Framer Motion
- **State Management**: Zustand with `persist` middleware
- **Authentication**: JWT (`jose`) + `bcryptjs` stored in HTTP-only cookies
- **Validation**: Zod schema validation
- **Containerization**: Docker & Docker Compose

---

## 📁 Project Structure

```
chickado/
├── docker-compose.yml       # MySQL 8 & App container definitions
├── Dockerfile               # Multi-stage production container build
├── prisma/
│   ├── schema.prisma        # Normalized relational MySQL schema
│   └── seed.ts              # Database seed (staff, items, tables, orders)
├── public/
│   └── assets/              # Store branding & hero food photography
│       ├── logo.png         # Main Chickado logo (single config change)
│       └── hero-banner.jpg  # Mouthwatering hero banner
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── page.tsx            # Home page (hero, categories, reviews)
│   │   │   ├── menu/               # Interactive menu catalog
│   │   │   ├── cart/               # Dedicated cart view
│   │   │   ├── checkout/           # Dual checkout (Web & WhatsApp)
│   │   │   ├── order-tracking/     # 5-step live order tracker
│   │   │   ├── order-success/      # Order confirmed celebration page
│   │   │   ├── about/              # Brand story & quality standards
│   │   │   └── contact/            # Store hotline & location
│   │   ├── admin/
│   │   │   ├── login/              # Staff & Cashier login
│   │   │   ├── page.tsx            # Analytics dashboard
│   │   │   ├── pos/                # Cashier touch POS terminal
│   │   │   ├── orders/             # Live orders pipeline & 80mm receipts
│   │   │   ├── menu/items/         # Menu items CRUD
│   │   │   ├── menu/categories/    # Categories CRUD
│   │   │   ├── promos/             # Promo codes & discount rules
│   │   │   ├── customers/          # Customer loyalty records
│   │   │   ├── settings/           # Restaurant configuration
│   │   │   └── users/              # Staff user accounts
│   │   └── api/                    # Route handlers for all resources
│   ├── components/                 # Navbar, Footer, CartDrawer, Modals
│   └── lib/                        # Prisma client, auth, formatters, WhatsApp
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18+ (tested on Node v20/v22/v26)
- MySQL 8.0 (running locally or via Docker Compose)

### 2. Environment Setup
Create a `.env` file from the provided `.env.example`:

```bash
cp .env.example .env
```

Ensure your `DATABASE_URL` matches your MySQL credentials:
```env
DATABASE_URL="mysql://root:rootuser@localhost:3306/chickado"
JWT_SECRET="chickado_secret_jwt_token_auth_key_2026_xyz"
```

### 3. Start MySQL (Optional with Docker)
If you do not have MySQL running locally:
```bash
docker compose up -d mysql
```

### 4. Database Migration & Seeding
Push the Prisma schema to create all tables and run the seed script:

```bash
# Push schema to MySQL
npm run db:push

# Populate sample menu, staff, and demo orders
npm run db:seed
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Staff Logins

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@chickado.com` | `admin123` | Full Access (Dashboard, Menu, Promos, Users, Settings, POS) |
| **Cashier** | `cashier@chickado.com` | `cashier123` | POS Terminal, Orders, and Customers |

---

## 📲 WhatsApp Order Message Format

When a customer or cashier checks out via WhatsApp, the following structured format is encoded and opened directly in `https://wa.me/923316633141`:

```
🍗 *New Order - Chickado*
🔖 Order ID: #CKD-1002
👤 Name: Muhammad Ali
📞 Phone: 03316633141
📍 Address: House 12, Street 4, F-7/2, Islamabad
🛵 Type: Delivery
------------------
1) Chickado Classic Zinger (Fire Blaster Spicy) x2 - Rs 590 = Rs 1,180
   ↳ Note: Extra crispy
2) Crispy Masala Crinkle Fries (Large) x1 - Rs 350 = Rs 350
------------------
Subtotal: Rs 1,530
Delivery: Rs 150
Discount: -Rs 100
Tax: Rs 79
*Total: Rs 1,659*
📝 Notes: Please ring the bell upon arrival
```

---

## 🖨️ Thermal Receipt Printing
The POS and Orders screens support standard **80mm thermal receipts**:
- Automatically hides all navigation and UI elements during printing.
- Includes store contact details, timestamp, itemized list, subtotal, taxes, and cash tendered/change.
- Includes a dedicated **Kitchen Order Ticket (KOT)** mode for kitchen expediters.

---

## 📦 Available Scripts

- `npm run dev`: Starts local Next.js dev server.
- `npm run build`: Compiles production Next.js bundle.
- `npm run start`: Runs compiled production build.
- `npm run db:push`: Pushes Prisma schema changes directly to MySQL.
- `npm run db:seed`: Seeds database with categories, items, and staff.
- `npm run db:studio`: Opens interactive Prisma Studio GUI.
- `npm run lint`: Checks for linting errors.
