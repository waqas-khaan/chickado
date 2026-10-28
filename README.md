# 🍗 Chickado - Restaurant Website & Online Ordering Platform

A modern, fast, and responsive full-stack restaurant web application built for **Chickado** — premier fast-food brand serving crispy fried chicken, succulent zinger burgers, loaded fries, and fiery wings in Peshawar, Pakistan.

---

## 🌟 Key Features

### 🛒 1. Customer Storefront & Menu
- **High-Energy Fast-Food Aesthetics**: Bold crimson red, golden amber, crisp white, and modern typography tailored for high visual appetite.
- **Dynamic Menu Catalog**: Interactive category navigation (Burgers, Golden Fried Chicken, Crispy Wings, Pizza & Fries, Deals & Combos, Drinks).
- **Customizer Modal**: Real-time selection of sizes/variants, add-ons (extra cheese, spicy patty, dips, jalapenos), quantity controls, and custom kitchen instructions.
- **Persistent Cart (Zustand)**: Auto-persisted in `localStorage`, live subtotal, promo code application, delivery fee calculations, and sales tax.
- **Order Fulfillment Types**: Home Delivery (with address field), Pickup / Takeaway, and Dine-in (with table number picker).

### 📱 2. Direct WhatsApp Kitchen Ordering
- **Instant Kitchen Dispatch**: Generates a clean, human-readable WhatsApp message dispatched directly to the restaurant hotline (`+92 331 6633141`).
- **Clean Message Formatting**: Formatted with item quantities, customizations, subtotal, and notes without redundant order IDs or image links.
- **Floating WhatsApp Badge**: Persistent quick-chat floating button across all pages for customer support and direct inquiries.

### 🧾 3. 80mm POS Thermal Receipt Support
- Built-in `@media print` styling configured for standard **80mm POS thermal receipt printers**.
- Cleanly isolates receipt layout and suppresses all browser UI, navigation bars, and buttons during printing.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware
- **Containerization**: [Docker](https://www.docker.com/) & Docker Compose

---

## 📁 Project Structure

```
chickado/
├── docker-compose.yml              # Production container orchestration
├── Dockerfile                      # Multi-stage optimized Node.js Alpine build
├── public/
│   ├── assets/                     # Store branding & food photography
│   │   ├── logo.png                # Main Chickado brand logo
│   │   └── hero-banner.jpg         # Hero food photography
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── page.tsx                # Home page (Hero, Categories, Deals, Reviews)
│   │   ├── menu/                   # Full menu catalog with category filters
│   │   ├── cart/                   # Dedicated cart summary & checkout gateway
│   │   ├── checkout/               # Fulfillment & customer details checkout
│   │   ├── order-success/[orderNumber]/ # Order confirmation celebration screen
│   │   ├── about/                  # Chickado story, ingredients & quality standards
│   │   ├── contact/                # Store hotline, hours & Google Maps directions
│   │   ├── api/
│   │   │   ├── menu/route.ts       # Menu items API endpoint
│   │   │   └── promos/validate/    # Promo code validation endpoint
│   │   ├── layout.tsx              # Root layout (Announcement bar, Navbar, Cart drawer, Footer)
│   │   └── globals.css             # Design system, glassmorphism tokens & 80mm print CSS
│   ├── components/                 # Reusable UI components
│   │   ├── navbar.tsx              # Sticky header with cart bounce counter
│   │   ├── footer.tsx              # Store hours, address, and social links
│   │   ├── cart-drawer.tsx         # Slide-out interactive cart drawer
│   │   ├── item-modal.tsx          # Item customizer modal (variants, add-ons)
│   │   ├── menu-item-card.tsx      # Food card with quick add
│   │   ├── bucket-cart-icon.tsx    # Fast-food chicken bucket cart indicator
│   │   └── whatsapp-floating.tsx   # Floating 1-click WhatsApp widget
│   ├── data/
│   │   └── menu-data.ts            # Centralized menu items, deals & categories
│   └── lib/
│       ├── brand.ts                # Brand configuration (phone, address, socials, tax)
│       ├── cart-store.ts           # Zustand cart store with localStorage persistence
│       ├── format.ts               # Currency and phone formatters
│       └── whatsapp.ts             # WhatsApp message builder
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v20/v22)
- **npm** or **pnpm** / **yarn**
- **Docker** (optional, for containerized run)

### 2. Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/waqas-khaan/chickado.git
cd chickado

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Running with Docker

Run the complete application in a multi-stage production Docker container:

```bash
# Build and start container
docker compose up -d --build

# View container logs
docker compose logs -f

# Stop container
docker compose down
```

The containerized app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📲 WhatsApp Order Message Format

When checking out, the app automatically compiles the order into the following clean format and launches WhatsApp:

```text
🍗 *Chickado*
👤 Name: Muhammad Ali
📞 Phone: 03316633141
📍 Address: House 14, Street 3, Saddar, Peshawar
🛵 Type: Delivery
------------------
*ORDER ITEMS:*
1) *Crispy Zinger Burger (Double Patty)* x2
   Price: Rs 650 each | Subtotal: Rs 1,300
   ↳ Note: Extra spicy
2) *Loaded Pizza Fries (Large)* x1
   Price: Rs 450 each | Subtotal: Rs 450
------------------
Subtotal: Rs 1,750
Delivery: Rs 150
Discount: -Rs 100
Tax: Rs 88
*Total: Rs 1,888*
📝 Notes: Ring doorbell twice upon arrival
```

---

## 📍 Restaurant Details

- **Brand**: Chickado (*Bite into Joy*)
- **Address**: Opposite to Sunhri Masjid near to MCB Bank, Peshawar Saddar, Peshawar, Pakistan
- **Hotline**: `0331 6633141`
- **WhatsApp**: `+92 331 6633141`
- **Hours**: 11:00 AM – 02:00 AM Daily

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Next.js development server with Turbopack |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint checks |

---

## 📄 License

Proprietary © 2026 Chickado. All rights reserved.
