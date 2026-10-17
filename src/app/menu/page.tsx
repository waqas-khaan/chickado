import React, { Suspense } from 'react';
import { getAllCategories } from '@/data/menu-data';
import MenuClientView from './menu-client-view';

export default function MenuPage() {
  const categories = getAllCategories();

  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500 font-bold">Loading Chickado Menu...</div>}>
      <MenuClientView categories={categories as any} />
    </Suspense>
  );
}
