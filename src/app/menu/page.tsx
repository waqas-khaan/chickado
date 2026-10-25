import React, { Suspense } from 'react';
import { getAllCategories } from '@/data/menu-data';
import MenuClientView from './menu-client-view';

export default function MenuPage() {
  // Only display active categories with items on the order menu page
  const categories = getAllCategories().filter(
    (cat) => !cat.isComingSoon && cat.items.length > 0
  );

  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500 font-bold">Loading Chickado Menu...</div>}>
      <MenuClientView categories={categories as any} />
    </Suspense>
  );
}
