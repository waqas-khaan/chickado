import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

async function optimizeMenuAssets() {
  console.log('\n--- Optimizing Menu Assets (public/assets/menu) ---');
  const menuDir = path.join(PUBLIC_DIR, 'assets/menu');
  if (!fs.existsSync(menuDir)) return;

  const categories = fs.readdirSync(menuDir);
  for (const cat of categories) {
    const catDir = path.join(menuDir, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;

    const files = fs.readdirSync(catDir);
    for (const file of files) {
      if (!/\.(jpe?g|png)$/i.test(file)) continue;

      const filePath = path.join(catDir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(catDir, `${baseName}.webp`);

      const origSize = fs.statSync(filePath).size;

      // 1. Generate WebP
      const webpBuf = await sharp(filePath)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toBuffer();
      fs.writeFileSync(webpPath, webpBuf);

      // 2. Re-compress JPEG in-place as fallback
      if (/\.jpe?g$/i.test(file)) {
        const jpegBuf = await sharp(filePath)
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true, mozjpeg: true })
          .toBuffer();
        fs.writeFileSync(filePath, jpegBuf);
      }

      const newSize = fs.statSync(filePath).size;
      const webpSize = fs.statSync(webpPath).size;
      console.log(`[MENU] ${cat}/${file}: ${(origSize/1024).toFixed(0)}KB -> JPEG: ${(newSize/1024).toFixed(0)}KB | WebP: ${(webpSize/1024).toFixed(0)}KB`);
    }
  }
}

async function optimizeGalleryAssets() {
  console.log('\n--- Optimizing Gallery Assets (public/assets/gallery) ---');
  const galleryDir = path.join(PUBLIC_DIR, 'assets/gallery');
  if (!fs.existsSync(galleryDir)) return;

  const files = fs.readdirSync(galleryDir);
  for (const file of files) {
    if (!/\.(jpe?g|png)$/i.test(file) || file.includes('-thumb')) continue;

    const filePath = path.join(galleryDir, file);
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const webpPath = path.join(galleryDir, `${baseName}.webp`);
    const thumbWebpPath = path.join(galleryDir, `${baseName}-thumb.webp`);

    const origSize = fs.statSync(filePath).size;

    // Full-res WebP for lightbox (up to 1400px)
    const webpBuf = await sharp(filePath)
      .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuf);

    // Thumbnail WebP for grid & bottom strip (up to 640px)
    const thumbBuf = await sharp(filePath)
      .resize(640, 640, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    fs.writeFileSync(thumbWebpPath, thumbBuf);

    // Re-compress JPG in-place
    const jpegBuf = await sharp(filePath)
      .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(filePath, jpegBuf);

    const newSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const thumbSize = fs.statSync(thumbWebpPath).size;
    console.log(`[GALLERY] ${file}: ${(origSize/1024).toFixed(0)}KB -> JPG: ${(newSize/1024).toFixed(0)}KB | WebP: ${(webpSize/1024).toFixed(0)}KB | Thumb: ${(thumbSize/1024).toFixed(0)}KB`);
  }
}

async function optimizeBanners() {
  console.log('\n--- Optimizing Banner Assets (public/assets/banners) ---');
  const bannerDir = path.join(PUBLIC_DIR, 'assets/banners');
  if (!fs.existsSync(bannerDir)) return;

  // 1. Baked Pasta Banner
  const bakedPastaPng = path.join(bannerDir, 'baked-pasta-banner-hq.png');
  if (fs.existsSync(bakedPastaPng)) {
    const origSize = fs.statSync(bakedPastaPng).size;
    // Mobile WebP (800w)
    const mobileBuf = await sharp(bakedPastaPng).resize(800, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'baked-pasta-banner-mobile.webp'), mobileBuf);

    // Tablet WebP (1400w)
    const mdBuf = await sharp(bakedPastaPng).resize(1400, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'baked-pasta-banner-md.webp'), mdBuf);

    // Desktop HQ WebP (2048w)
    const hqBuf = await sharp(bakedPastaPng).resize(2048, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'baked-pasta-banner-hq.webp'), hqBuf);

    // 4K WebP (2560w)
    const k4Buf = await sharp(bakedPastaPng).resize(2560, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'baked-pasta-banner-4k.webp'), k4Buf);

    // PNG fallback compressed
    const pngBuf = await sharp(bakedPastaPng).resize(1920, null, { withoutEnlargement: true }).png({ compressionLevel: 9, effort: 7 }).toBuffer();
    fs.writeFileSync(bakedPastaPng, pngBuf);
    console.log(`[BANNER] baked-pasta-banner-hq.png: ${(origSize/1024).toFixed(0)}KB -> ${(pngBuf.length/1024).toFixed(0)}KB | Mobile: ${(mobileBuf.length/1024).toFixed(0)}KB | HQ: ${(hqBuf.length/1024).toFixed(0)}KB`);
  }

  // 2. Crunch Box Banner
  const crunchPng = path.join(bannerDir, 'crunch-box-banner-hq.png');
  if (fs.existsSync(crunchPng)) {
    const origSize = fs.statSync(crunchPng).size;
    const mobileBuf = await sharp(crunchPng).resize(800, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'crunch-box-banner-mobile.webp'), mobileBuf);

    const mdBuf = await sharp(crunchPng).resize(1400, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'crunch-box-banner-md.webp'), mdBuf);

    const hqBuf = await sharp(crunchPng).resize(2048, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'crunch-box-banner-hq.webp'), hqBuf);

    const k4Buf = await sharp(crunchPng).resize(2560, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'crunch-box-banner-4k.webp'), k4Buf);

    const pngBuf = await sharp(crunchPng).resize(1920, null, { withoutEnlargement: true }).png({ compressionLevel: 9, effort: 7 }).toBuffer();
    fs.writeFileSync(crunchPng, pngBuf);
    console.log(`[BANNER] crunch-box-banner-hq.png: ${(origSize/1024).toFixed(0)}KB -> ${(pngBuf.length/1024).toFixed(0)}KB | Mobile: ${(mobileBuf.length/1024).toFixed(0)}KB | HQ: ${(hqBuf.length/1024).toFixed(0)}KB`);
  }

  // 3. Lucky Box Banner (iPhone 17 Pro Max Lucky Draw)
  const luckyPng = path.join(bannerDir, 'lucky-box-banner-hq.png');
  if (fs.existsSync(luckyPng)) {
    const origSize = fs.statSync(luckyPng).size;
    const mobileBuf = await sharp(luckyPng).resize(800, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'lucky-box-banner-mobile.webp'), mobileBuf);

    const mdBuf = await sharp(luckyPng).resize(1400, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'lucky-box-banner-md.webp'), mdBuf);

    const hqBuf = await sharp(luckyPng).resize(2048, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'lucky-box-banner-hq.webp'), hqBuf);

    const k4Buf = await sharp(luckyPng).resize(2560, null, { withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'lucky-box-banner-4k.webp'), k4Buf);

    const pngBuf = await sharp(luckyPng).resize(1920, null, { withoutEnlargement: true }).png({ compressionLevel: 9, effort: 7 }).toBuffer();
    fs.writeFileSync(luckyPng, pngBuf);
    console.log(`[BANNER] lucky-box-banner-hq.png: ${(origSize/1024).toFixed(0)}KB -> ${(pngBuf.length/1024).toFixed(0)}KB | Mobile: ${(mobileBuf.length/1024).toFixed(0)}KB | HQ: ${(hqBuf.length/1024).toFixed(0)}KB`);
  }

  // 3. Gourmet Full Pizza (Floating 3D pizza)
  const pizzaPng = path.join(bannerDir, 'gourmet-full-pizza.png');
  if (fs.existsSync(pizzaPng)) {
    const origSize = fs.statSync(pizzaPng).size;
    const webpBuf = await sharp(pizzaPng).resize(640, null, { withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'gourmet-full-pizza.webp'), webpBuf);

    const pngBuf = await sharp(pizzaPng).resize(640, null, { withoutEnlargement: true }).png({ compressionLevel: 9, effort: 7 }).toBuffer();
    fs.writeFileSync(pizzaPng, pngBuf);
    console.log(`[BANNER] gourmet-full-pizza.png: ${(origSize/1024).toFixed(0)}KB -> ${(pngBuf.length/1024).toFixed(0)}KB | WebP: ${(webpBuf.length/1024).toFixed(0)}KB`);
  }

  // 4. About restaurant & Hero banner
  const aboutJpg = path.join(bannerDir, 'about-restaurant.jpg');
  if (fs.existsSync(aboutJpg)) {
    const origSize = fs.statSync(aboutJpg).size;
    const webpBuf = await sharp(aboutJpg).resize(1200, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'about-restaurant.webp'), webpBuf);

    const jpgBuf = await sharp(aboutJpg).resize(1200, null, { withoutEnlargement: true }).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toBuffer();
    fs.writeFileSync(aboutJpg, jpgBuf);
    console.log(`[BANNER] about-restaurant.jpg: ${(origSize/1024).toFixed(0)}KB -> JPG: ${(jpgBuf.length/1024).toFixed(0)}KB | WebP: ${(webpBuf.length/1024).toFixed(0)}KB`);
  }

  const heroJpg = path.join(bannerDir, 'hero-banner.jpg');
  if (fs.existsSync(heroJpg)) {
    const origSize = fs.statSync(heroJpg).size;
    const webpBuf = await sharp(heroJpg).resize(1600, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bannerDir, 'hero-banner.webp'), webpBuf);

    const jpgBuf = await sharp(heroJpg).resize(1600, null, { withoutEnlargement: true }).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toBuffer();
    fs.writeFileSync(heroJpg, jpgBuf);
    console.log(`[BANNER] hero-banner.jpg: ${(origSize/1024).toFixed(0)}KB -> JPG: ${(jpgBuf.length/1024).toFixed(0)}KB | WebP: ${(webpBuf.length/1024).toFixed(0)}KB`);
  }
}

async function optimizeBrandAssets() {
  console.log('\n--- Optimizing Brand Assets (public/assets/brand) ---');
  const brandDir = path.join(PUBLIC_DIR, 'assets/brand');
  if (!fs.existsSync(brandDir)) return;

  const files = fs.readdirSync(brandDir);
  for (const file of files) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const filePath = path.join(brandDir, file);
    const origSize = fs.statSync(filePath).size;
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);

    if (/\.png$/i.test(file)) {
      const webpBuf = await sharp(filePath).resize(600, null, { withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toBuffer();
      fs.writeFileSync(path.join(brandDir, `${baseName}.webp`), webpBuf);

      const pngBuf = await sharp(filePath).resize(600, null, { withoutEnlargement: true }).png({ compressionLevel: 9, effort: 7 }).toBuffer();
      fs.writeFileSync(filePath, pngBuf);
      console.log(`[BRAND] ${file}: ${(origSize/1024).toFixed(0)}KB -> PNG: ${(pngBuf.length/1024).toFixed(0)}KB | WebP: ${(webpBuf.length/1024).toFixed(0)}KB`);
    } else {
      const webpBuf = await sharp(filePath).resize(600, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
      fs.writeFileSync(path.join(brandDir, `${baseName}.webp`), webpBuf);

      const jpgBuf = await sharp(filePath).resize(600, null, { withoutEnlargement: true }).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();
      fs.writeFileSync(filePath, jpgBuf);
      console.log(`[BRAND] ${file}: ${(origSize/1024).toFixed(0)}KB -> JPG: ${(jpgBuf.length/1024).toFixed(0)}KB | WebP: ${(webpBuf.length/1024).toFixed(0)}KB`);
    }
  }
}

async function optimizeMenuBook() {
  console.log('\n--- Optimizing Menu Book Assets (public/menu-book) ---');
  const bookDir = path.join(PUBLIC_DIR, 'menu-book');
  if (!fs.existsSync(bookDir)) return;

  for (const spread of ['menu-spread-1.png', 'menu-spread-2.png']) {
    const spreadPath = path.join(bookDir, spread);
    if (!fs.existsSync(spreadPath)) continue;
    const origSize = fs.statSync(spreadPath).size;
    const baseName = path.basename(spread, '.png');
    const webpBuf = await sharp(spreadPath).resize(1600, null, { withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(bookDir, `${baseName}.webp`), webpBuf);

    const pngBuf = await sharp(spreadPath).resize(1600, null, { withoutEnlargement: true }).png({ compressionLevel: 9, effort: 7 }).toBuffer();
    fs.writeFileSync(spreadPath, pngBuf);
    console.log(`[MENU BOOK] ${spread}: ${(origSize/1024).toFixed(0)}KB -> PNG: ${(pngBuf.length/1024).toFixed(0)}KB | WebP: ${(webpBuf.length/1024).toFixed(0)}KB`);
  }
}

async function main() {
  console.log('Starting full image asset optimization...');
  await optimizeMenuAssets();
  await optimizeGalleryAssets();
  await optimizeBanners();
  await optimizeBrandAssets();
  await optimizeMenuBook();
  console.log('\nOptimization finished successfully!');
}

main().catch(err => {
  console.error('Error optimizing assets:', err);
  process.exit(1);
});
