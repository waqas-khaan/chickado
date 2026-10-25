import React from 'react';
import MenuLoadingFallback from '@/components/menu-loading-fallback';

export default function RootLoading() {
  return (
    <MenuLoadingFallback
      message="Preparing Fresh Joy..."
      subtext="Hand-crafted chicken & secret spices"
    />
  );
}
