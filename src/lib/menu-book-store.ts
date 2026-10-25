import { create } from 'zustand';

interface MenuBookStore {
  isOpen: boolean;
  isAutoOpen: boolean; // true when opened automatically on website load; false when opened manually by user
  isOpeningAnimation: boolean;
  activeSpread: 1 | 2; // 1 = Combos & Bar, 2 = Pizzas & Burgers
  activePage: 1 | 2 | 3 | 4; // 1 = Combos, 2 = Bar, 3 = Pizzas, 4 = Burgers
  viewMode: 'spread' | 'single';
  zoom: number; // 1 to 2.5
  hasAutoOpened: boolean;

  // Actions
  openBook: (spread?: 1 | 2) => void;
  closeBook: () => void;
  toggleBook: () => void;
  markUserInteracted: () => void;
  setSpread: (spread: 1 | 2) => void;
  setPage: (page: 1 | 2 | 3 | 4) => void;
  nextSpread: () => void;
  prevSpread: () => void;
  setViewMode: (mode: 'spread' | 'single') => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export const useMenuBookStore = create<MenuBookStore>((set, get) => ({
  isOpen: true, // Auto-open menu book when website opens
  isAutoOpen: true, // Flag indicating initial website auto-open
  isOpeningAnimation: true,
  activeSpread: 1, // Spread 1 is displayed first (Combos & Bar Menu)
  activePage: 1,
  viewMode: 'spread',
  zoom: 1,
  hasAutoOpened: false,

  openBook: (spread = 1) => {
    // User opened manually -> stays open until closed by user with X button
    set({
      isOpen: true,
      isAutoOpen: false,
      activeSpread: spread,
      activePage: spread === 1 ? 1 : 3,
      isOpeningAnimation: false,
      zoom: 1,
    });
  },

  markUserInteracted: () => {
    // User interacted with the book -> switch to manual mode so it stays open until user closes with X
    set({ isAutoOpen: false });
  },

  closeBook: () => {
    set({
      isOpen: false,
      isAutoOpen: false,
      isOpeningAnimation: false,
      zoom: 1,
      hasAutoOpened: true,
    });
  },

  toggleBook: () => {
    const { isOpen, openBook, closeBook } = get();
    if (isOpen) {
      closeBook();
    } else {
      openBook(1);
    }
  },

  setSpread: (spread: 1 | 2) => {
    set({
      activeSpread: spread,
      activePage: spread === 1 ? 1 : 3,
      zoom: 1,
    });
  },

  setPage: (page: 1 | 2 | 3 | 4) => {
    set({
      activePage: page,
      activeSpread: page <= 2 ? 1 : 2,
      zoom: 1,
    });
  },

  nextSpread: () => {
    const { activeSpread, activePage, viewMode } = get();
    if (viewMode === 'spread') {
      if (activeSpread === 1) {
        set({ activeSpread: 2, activePage: 3, zoom: 1 });
      }
    } else {
      if (activePage < 4) {
        const nextP = (activePage + 1) as 1 | 2 | 3 | 4;
        set({
          activePage: nextP,
          activeSpread: nextP <= 2 ? 1 : 2,
          zoom: 1,
        });
      }
    }
  },

  prevSpread: () => {
    const { activeSpread, activePage, viewMode } = get();
    if (viewMode === 'spread') {
      if (activeSpread === 2) {
        set({ activeSpread: 1, activePage: 1, zoom: 1 });
      }
    } else {
      if (activePage > 1) {
        const prevP = (activePage - 1) as 1 | 2 | 3 | 4;
        set({
          activePage: prevP,
          activeSpread: prevP <= 2 ? 1 : 2,
          zoom: 1,
        });
      }
    }
  },

  setViewMode: (mode) => set({ viewMode: mode, zoom: 1 }),

  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 1), 2.5) }),

  zoomIn: () => {
    set((state) => ({ zoom: Math.min(state.zoom + 0.3, 2.5) }));
  },

  zoomOut: () => {
    set((state) => ({ zoom: Math.max(state.zoom - 0.3, 1) }));
  },

  resetZoom: () => set({ zoom: 1 }),
}));
