import React, { Suspense } from 'react';
import { getAllCategories } from '@/data/menu-data';
import MenuClientView from './menu-client-view';
import MenuLoadingFallback from '@/components/menu-loading-fallback';

export default function MenuPage() {
  // Only display active categories with items on the order menu page
  const categories = getAllCategories().filter(
    (cat) => !cat.isComingSoon && cat.items.length > 0
  );

  return (
    <Suspense fallback={<MenuLoadingFallback />}>
      <MenuClientView categories={categories as any} />
    </Suspense>
  );
}
