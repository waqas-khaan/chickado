import React from 'react';
import MenuLoadingFallback from '@/components/menu-loading-fallback';

export default function RootLoading() {
  return (
    <MenuLoadingFallback
      message="Loading Chickado..."
      subtext="Preparing fresh joy, crispy broast & sizzling burgers..."
    />
  );
}
