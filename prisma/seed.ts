import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Chickado database seed...');

  // 1. Clean up existing tables
  await prisma.handledOrder.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItemAddon.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.dealItem.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.itemAddon.deleteMany();
  await prisma.addon.deleteMany();
  await prisma.itemVariant.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.restaurantTable.deleteMany();
  await prisma.user.deleteMany();
  await prisma.setting.deleteMany();

  // 2. Users (Admin and Cashier)
  const adminPassword = await bcrypt.hash('admin123', 10);
  const cashierPassword = await bcrypt.hash('cashier123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@chickado.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  const cashier = await prisma.user.create({
    data: {
      name: 'Hamza Cashier',
      email: 'cashier@chickado.com',
      passwordHash: cashierPassword,
      role: 'CASHIER',
      isActive: true,
    },
  });

  console.log('✅ Created Admin and Cashier users');

  // 3. Settings
  const initialSettings = [
    { key: 'restaurant_name', value: 'Chickado', description: 'Restaurant Brand Name' },
    { key: 'phone', value: '+92 331 6633141', description: 'Phone Number' },
    { key: 'whatsapp_number', value: '923316633141', description: 'WhatsApp Order Number' },
    { key: 'currency', value: 'Rs', description: 'Currency Symbol' },
    { key: 'delivery_fee', value: '150', description: 'Standard Delivery Fee in PKR' },
    { key: 'tax_rate', value: '0.05', description: 'Sales Tax Rate (0.05 = 5%)' },
    { key: 'address', value: 'Commercial Market, Satellite Town, Rawalpindi / Islamabad', description: 'Store Address' },
    { key: 'opening_hours', value: '11:00 AM - 02:00 AM Daily', description: 'Store Working Hours' },
  ];

  for (const s of initialSettings) {
    await prisma.setting.create({ data: s });
  }

  // 4. Restaurant Tables for Dine-in / POS
  for (let i = 1; i <= 10; i++) {
    await prisma.restaurantTable.create({
      data: {
        tableNumber: `T-${i}`,
        capacity: i % 2 === 0 ? 4 : 2,
        status: i === 3 ? 'OCCUPIED' : 'AVAILABLE',
      },
    });
  }

  // 5. Promo Codes
  await prisma.promoCode.createMany({
    data: [
      {
        code: 'CHICK100',
        type: 'FIXED',
        value: 100,
        minOrder: 1000,
        maxUses: 500,
        isActive: true,
      },
      {
        code: 'CRISPY20',
        type: 'PERCENTAGE',
        value: 20,
        minOrder: 1200,
        maxDiscount: 350,
        maxUses: 200,
        isActive: true,
      },
      {
        code: 'WELCOME50',
        type: 'FIXED',
        value: 50,
        minOrder: 500,
        maxUses: 1000,
        isActive: true,
      },
    ],
  });

  // 6. Addons
  const extraCheese = await prisma.addon.create({ data: { name: 'Extra Cheese Slice', price: 80 } });
  const extraPatty = await prisma.addon.create({ data: { name: 'Extra Crispy Patty', price: 250 } });
  const garlicMayo = await prisma.addon.create({ data: { name: 'Garlic Mayo Dip', price: 70 } });
  const chipotleDip = await prisma.addon.create({ data: { name: 'Chipotle Fire Dip', price: 80 } });
  const jalapenos = await prisma.addon.create({ data: { name: 'Pickled Jalapenos', price: 60 } });
  const coleslaw = await prisma.addon.create({ data: { name: 'Fresh Coleslaw Cup', price: 90 } });

  // 7. Categories
  const catBurgers = await prisma.category.create({
    data: {
      name: 'Burgers',
      slug: 'burgers',
      description: 'Crispy fried fillets, gourmet brioche buns, fresh lettuce and secret signature sauces.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      sortOrder: 1,
    },
  });

  const catChicken = await prisma.category.create({
    data: {
      name: 'Fried Chicken',
      slug: 'fried-chicken',
      description: 'Hand-breaded with 11 secret herbs and spices, fried golden brown to juicy perfection.',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      sortOrder: 2,
    },
  });

  const catWings = await prisma.category.create({
    data: {
      name: 'Wings',
      slug: 'wings',
      description: 'Crunchy golden wings tossed in spicy buffalo, fiery peri peri or tangy honey glaze.',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
      sortOrder: 3,
    },
  });

  const catDeals = await prisma.category.create({
    data: {
      name: 'Combos & Deals',
      slug: 'deals-combos',
      description: 'Best value party feasts, solo combos, and midnight hunger busters.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      sortOrder: 4,
    },
  });

  const catSides = await prisma.category.create({
    data: {
      name: 'Sides & Dips',
      slug: 'sides',
      description: 'Crinkle cut fries, loaded melted cheese platters, and authentic dipping sauces.',
      image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
      sortOrder: 5,
    },
  });

  const catDrinks = await prisma.category.create({
    data: {
      name: 'Drinks',
      slug: 'drinks',
      description: 'Chilled sodas, gourmet mojitos, and refreshing signature coolers.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      sortOrder: 6,
    },
  });

  const catDesserts = await prisma.category.create({
    data: {
      name: 'Desserts',
      slug: 'desserts',
      description: 'Warm chocolate molten cake, soft serve vanilla sundaes and sweet cravings.',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      sortOrder: 7,
    },
  });

  // 8. Items with Variants and Add-on links
  // BURGERS
  const zingerClassic = await prisma.item.create({
    data: {
      name: 'Chickado Classic Zinger',
      slug: 'chickado-classic-zinger',
      description: 'Signature crispy whole chicken fillet, fresh shredded iceberg, and house mayo on toasted sesame bun.',
      price: 550,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      categoryId: catBurgers.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 1,
      variants: {
        create: [
          { name: 'Single Fillet', price: 550, isDefault: true },
          { name: 'Double Fillet Mega', price: 790, isDefault: false },
          { name: 'Fire Blaster Spicy', price: 590, isDefault: false },
        ],
      },
      addons: {
        create: [
          { addonId: extraCheese.id },
          { addonId: extraPatty.id },
          { addonId: jalapenos.id },
          { addonId: garlicMayo.id },
        ],
      },
    },
  });

  const fieryCrunchBurger = await prisma.item.create({
    data: {
      name: 'Fiery Jalapeno Crunch',
      slug: 'fiery-jalapeno-crunch',
      description: 'Spicy crusted fillet topped with pickled jalapenos, molten cheddar sauce, and chili crunch.',
      price: 640,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      categoryId: catBurgers.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 2,
      variants: {
        create: [
          { name: 'Regular Spicy', price: 640, isDefault: true },
          { name: 'Double Cheese Overload', price: 740, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: extraCheese.id }, { addonId: chipotleDip.id }],
      },
    },
  });

  const smokyBbqBurger = await prisma.item.create({
    data: {
      name: 'Smoky BBQ Tender Burger',
      slug: 'smoky-bbq-tender-burger',
      description: 'Crispy fried tenders glazed in smoky hickory BBQ sauce, caramelized onions, and swiss cheese.',
      price: 680,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
      categoryId: catBurgers.id,
      isAvailable: true,
      isFeatured: false,
      sortOrder: 3,
      variants: {
        create: [
          { name: 'Standard', price: 680, isDefault: true },
          { name: 'Double Stack', price: 880, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: extraCheese.id }, { addonId: extraPatty.id }],
      },
    },
  });

  // FRIED CHICKEN
  const chicken2pcs = await prisma.item.create({
    data: {
      name: '2 Pcs Crispy Chicken Box',
      slug: '2-pcs-crispy-chicken',
      description: 'Two pieces of golden, crispy, tender bone-in chicken served with our signature dip.',
      price: 490,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      categoryId: catChicken.id,
      isAvailable: true,
      isFeatured: false,
      sortOrder: 1,
      variants: {
        create: [
          { name: 'Mild Crispy', price: 490, isDefault: true },
          { name: 'Hot & Spicy', price: 520, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: garlicMayo.id }, { addonId: coleslaw.id }],
      },
    },
  });

  const chicken4pcs = await prisma.item.create({
    data: {
      name: '4 Pcs Golden Fried Chicken Box',
      slug: '4-pcs-golden-fried-chicken',
      description: 'Four large pieces of our secret-recipe crunchy fried chicken with 1 regular dip sauce.',
      price: 890,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
      categoryId: catChicken.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 2,
      variants: {
        create: [
          { name: 'Mild Crispy', price: 890, isDefault: true },
          { name: 'Hot & Spicy', price: 930, isDefault: false },
          { name: 'Half & Half (2 Mild, 2 Spicy)', price: 910, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: garlicMayo.id }, { addonId: coleslaw.id }, { addonId: chipotleDip.id }],
      },
    },
  });

  const bucket8pcs = await prisma.item.create({
    data: {
      name: '8 Pcs Feast Bucket',
      slug: '8-pcs-feast-bucket',
      description: 'Eight pieces of sizzling fresh crispy fried chicken, perfect for friends and family.',
      price: 1650,
      image: '/assets/chickado-feast-bucket.jpg',
      categoryId: catChicken.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 3,
      variants: {
        create: [
          { name: 'All Mild', price: 1650, isDefault: true },
          { name: 'All Spicy', price: 1690, isDefault: false },
          { name: 'Half Mild / Half Spicy', price: 1670, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: garlicMayo.id }, { addonId: coleslaw.id }],
      },
    },
  });

  // WINGS
  const buffaloWings = await prisma.item.create({
    data: {
      name: 'Hot & Spicy Buffalo Wings (6 Pcs)',
      slug: 'hot-spicy-buffalo-wings-6pcs',
      description: 'Six jumbo crispy wings smothered in rich tangy hot buffalo sauce and toasted sesame.',
      price: 490,
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
      categoryId: catWings.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 1,
      variants: {
        create: [
          { name: '6 Pcs Box', price: 490, isDefault: true },
          { name: '10 Pcs Mega Box', price: 780, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: garlicMayo.id }, { addonId: chipotleDip.id }],
      },
    },
  });

  const honeyGlazedWings = await prisma.item.create({
    data: {
      name: 'Honey Glazed Crunch Wings (6 Pcs)',
      slug: 'honey-glazed-crunch-wings-6pcs',
      description: 'Crispy fried wings dipped in sticky sweet honey garlic butter glaze.',
      price: 520,
      image: '/assets/honey-glazed-wings.jpg',
      categoryId: catWings.id,
      isAvailable: true,
      isFeatured: false,
      sortOrder: 2,
      variants: {
        create: [
          { name: '6 Pcs Box', price: 520, isDefault: true },
          { name: '10 Pcs Box', price: 820, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: garlicMayo.id }],
      },
    },
  });

  // COMBOS & DEALS
  const soloDeal = await prisma.item.create({
    data: {
      name: 'Solo Crunch Delight Deal',
      slug: 'solo-crunch-delight',
      description: '1 Chickado Classic Zinger + 1 Regular Crinkle Fries + 1 Chilled Drink (330ml).',
      price: 790,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      categoryId: catDeals.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 1,
      addons: {
        create: [{ addonId: extraCheese.id }, { addonId: garlicMayo.id }],
      },
    },
  });

  const duoCombo = await prisma.item.create({
    data: {
      name: 'Duo Mega Combo Deal',
      slug: 'duo-mega-combo',
      description: '2 Chickado Zingers + 2 Pcs Golden Fried Chicken + 1 Large Masala Fries + 2 Cold Drinks.',
      price: 1550,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
      categoryId: catDeals.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 2,
      addons: {
        create: [{ addonId: extraCheese.id }, { addonId: coleslaw.id }, { addonId: garlicMayo.id }],
      },
    },
  });

  const familyFeast = await prisma.item.create({
    data: {
      name: 'Family Mega Feast Deal',
      slug: 'family-mega-feast',
      description: '4 Chickado Zingers + 4 Pcs Crispy Chicken + 2 Large Crinkle Fries + 6 Pcs Wings + 1.5L Chilled Beverage.',
      price: 2950,
      image: '/assets/chickado-feast-bucket.jpg',
      categoryId: catDeals.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 3,
      addons: {
        create: [{ addonId: extraCheese.id }, { addonId: garlicMayo.id }, { addonId: coleslaw.id }],
      },
    },
  });

  // SIDES
  const fries = await prisma.item.create({
    data: {
      name: 'Crispy Masala Crinkle Fries',
      slug: 'crispy-masala-crinkle-fries',
      description: 'Golden crinkle-cut potatoes dusted with Chickado signature spicy chaat masala.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
      categoryId: catSides.id,
      isAvailable: true,
      isFeatured: false,
      sortOrder: 1,
      variants: {
        create: [
          { name: 'Regular', price: 250, isDefault: true },
          { name: 'Large', price: 350, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: garlicMayo.id }, { addonId: extraCheese.id }],
      },
    },
  });

  const loadedFries = await prisma.item.create({
    data: {
      name: 'Cheesy Chicken Loaded Fries',
      slug: 'cheesy-chicken-loaded-fries',
      description: 'Hot crinkle fries loaded with crispy chicken chunks, melted cheddar cheese, jalapenos, and chipotle mayo.',
      price: 490,
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
      categoryId: catSides.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 2,
      variants: {
        create: [
          { name: 'Standard Bowl', price: 490, isDefault: true },
          { name: 'Monster Loaded Overload', price: 680, isDefault: false },
        ],
      },
      addons: {
        create: [{ addonId: extraCheese.id }, { addonId: jalapenos.id }],
      },
    },
  });

  // DRINKS
  await prisma.item.create({
    data: {
      name: 'Chilled Soft Drink (Can 330ml)',
      slug: 'chilled-soft-drink-330ml',
      description: 'Ice cold refreshing can of your choice: Pepsi, 7Up, Mirinda, or Diet Pepsi.',
      price: 130,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
      categoryId: catDrinks.id,
      isAvailable: true,
      isFeatured: false,
      sortOrder: 1,
      variants: {
        create: [
          { name: 'Pepsi', price: 130, isDefault: true },
          { name: '7Up', price: 130, isDefault: false },
          { name: 'Mirinda Orange', price: 130, isDefault: false },
          { name: 'Diet Pepsi', price: 130, isDefault: false },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      name: 'Zesty Mint Margarita Cooler',
      slug: 'zesty-mint-margarita',
      description: 'Fresh garden mint, crushed ice, lemon zest and bubbly soda for instant refreshment.',
      price: 290,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      categoryId: catDrinks.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 2,
    },
  });

  // DESSERTS
  await prisma.item.create({
    data: {
      name: 'Warm Chocolate Molten Lava Cake',
      slug: 'chocolate-molten-lava-cake',
      description: 'Decadent dark chocolate cake with a rich molten chocolate center flowing out on first bite.',
      price: 450,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      categoryId: catDesserts.id,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 1,
    },
  });

  console.log('✅ Created Menu Categories, Items, Variants and Addons');

  // 9. Customers & Demo Orders across WEB, WHATSAPP, POS
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Zubair Ahmed',
      phone: '03335551234',
      email: 'zubair@example.com',
      address: 'House 42, St 9, F-10/2, Islamabad',
      totalOrders: 3,
      totalSpent: 4200,
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Ayesha Khan',
      phone: '03219876543',
      email: 'ayesha@example.com',
      address: 'Apartment 4B, Bahria Heights, Rawalpindi',
      totalOrders: 2,
      totalSpent: 2980,
    },
  });

  // Sample Order 1: Web Order (Preparing)
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'CKD-1001',
      customerName: customer1.name,
      customerPhone: customer1.phone,
      customerEmail: customer1.email,
      customerAddress: customer1.address,
      orderType: 'DELIVERY',
      source: 'WEB',
      status: 'PREPARING',
      subtotal: 1340,
      deliveryFee: 150,
      discount: 100,
      tax: 62,
      total: 1452,
      notes: 'Please ring doorbell and keep it spicy!',
      paymentStatus: 'PAID',
      paymentMethod: 'ONLINE',
      customerId: customer1.id,
      items: {
        create: [
          {
            itemId: zingerClassic.id,
            itemName: 'Chickado Classic Zinger',
            variantName: 'Fire Blaster Spicy',
            quantity: 2,
            unitPrice: 590,
            totalPrice: 1180,
            addons: {
              create: [{ addonName: 'Extra Cheese Slice', price: 80 }],
            },
          },
          {
            itemId: fries.id,
            itemName: 'Crispy Masala Crinkle Fries',
            variantName: 'Regular',
            quantity: 1,
            unitPrice: 250,
            totalPrice: 250,
          },
        ],
      },
      payments: {
        create: {
          method: 'ONLINE',
          amount: 1452,
          status: 'PAID',
          transactionRef: 'TXN-984210',
        },
      },
    },
  });

  // Sample Order 2: WhatsApp Order (Out for delivery)
  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'CKD-1002',
      customerName: customer2.name,
      customerPhone: customer2.phone,
      customerEmail: customer2.email,
      customerAddress: customer2.address,
      orderType: 'DELIVERY',
      source: 'WHATSAPP',
      status: 'OUT_FOR_DELIVERY',
      subtotal: 1650,
      deliveryFee: 150,
      discount: 0,
      tax: 83,
      total: 1883,
      notes: 'WhatsApp verified order. Please deliver hot.',
      paymentStatus: 'UNPAID',
      paymentMethod: 'CASH',
      customerId: customer2.id,
      items: {
        create: [
          {
            itemId: bucket8pcs.id,
            itemName: '8 Pcs Feast Bucket',
            variantName: 'Half Mild / Half Spicy',
            quantity: 1,
            unitPrice: 1650,
            totalPrice: 1650,
            addons: {
              create: [{ addonName: 'Garlic Mayo Dip', price: 70 }],
            },
          },
        ],
      },
    },
  });

  // Sample Order 3: POS Dine-in Order (Completed)
  const order3 = await prisma.order.create({
    data: {
      orderNumber: 'POS-2001',
      customerName: 'Dine-in Guest',
      customerPhone: '03000000000',
      orderType: 'DINE_IN',
      tableNumber: 'T-3',
      source: 'POS',
      status: 'COMPLETED',
      subtotal: 1280,
      deliveryFee: 0,
      discount: 0,
      tax: 64,
      total: 1344,
      paymentStatus: 'PAID',
      paymentMethod: 'CASH',
      cashierId: cashier.id,
      items: {
        create: [
          {
            itemId: fieryCrunchBurger.id,
            itemName: 'Fiery Jalapeno Crunch',
            variantName: 'Regular Spicy',
            quantity: 2,
            unitPrice: 640,
            totalPrice: 1280,
          },
        ],
      },
      payments: {
        create: {
          method: 'CASH',
          amount: 1344,
          status: 'PAID',
          cashTendered: 1500,
          changeAmount: 156,
        },
      },
    },
  });

  console.log('✅ Created Demo Orders (Web, WhatsApp, POS)');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
