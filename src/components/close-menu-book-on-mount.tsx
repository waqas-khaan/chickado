'use client';

import { useEffect } from 'react';
import { useMenuBookStore } from '@/lib/menu-book-store';

export default function CloseMenuBookOnMount() {
  useEffect(() => {
    // Immediately close menu book and cancel all timers on 404
    useMenuBookStore.getState().closeBook();
  }, []);

  return null;
}

