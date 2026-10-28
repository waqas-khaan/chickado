/**
 * Chickado Brand & Restaurant Configuration
 * Centralized configuration for all brand attributes, contact details,
 * currency, delivery settings, and asset paths.
 */

export const brandConfig = {
  appUrl: 'https://chickado.falconsoftwares.com',
  name: 'Chickado',
  tagline: 'Bite into Joy',
  phone: '0331 6633141',
  phoneFormatted: '+92 331 6633141',
  email: 'chickado1@gmail.com',
  whatsappNumber: '923316633141',
  whatsappCleanNumber: '923316633141',
  currency: 'Rs',
  currencyCode: 'PKR',
  deliveryFee: 0,
  taxRate: 0,
  address: 'opposite to Sunhri Masjid near to MCB bank peshawar saddar, Peshawar, Pakistan',
  openingHours: '11:00 AM - 02:00 AM Daily',
  
  // Centralized logo path
  logoPath: '/assets/brand/logo.webp',
  
  // Google Maps Integration
  googleMaps: {
    embedUrl: 'https://maps.google.com/maps?q=Sunhri+Masjid+Peshawar+Saddar+Peshawar+Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directLink: 'https://www.google.com/maps/search/?api=1&query=Sunhri+Masjid+Peshawar+Saddar+Peshawar+Pakistan',
    query: 'Sunhri Masjid, Peshawar Saddar, Peshawar, Pakistan',
  },

  socials: {
    instagram: 'https://instagram.com/chickadopk',
    tiktok: 'https://tiktok.com/@chickadopk',
    youtube: 'https://youtube.com/@chickado01',
    facebook: 'https://facebook.com/chickado',
    handles: {
      instagram: '@chickadopk',
      tiktok: '@chickadopk',
      youtube: '@chickado01',
      facebook: 'Chickado',
    }
  },
  
  meta: {
    title: 'Chickado | Bite into Joy - Fried Chicken & Gourmet Burgers',
    description: 'Craving mouthwatering, crispy fried chicken, succulent zinger burgers, and loaded fries? Order online or via WhatsApp from Chickado in Peshawar Saddar. Hot & fresh delivery!',
  }
};
