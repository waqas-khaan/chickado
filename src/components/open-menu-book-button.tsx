'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';

interface OpenMenuBookButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'hero' | 'custom' | 'navbar';
  spread?: 1 | 2;
  label?: string;
  children?: React.ReactNode;
}

export default function OpenMenuBookButton({
  className = '',
  variant = 'hero',
  label = 'MENU BOOK',
  children,
}: OpenMenuBookButtonProps) {
  const pdfUrl = '/menu-book/chickado-menu.pdf';

  if (children) {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (variant === 'hero' || variant === 'navbar') {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-black tracking-wider transition bg-gradient-to-r from-[#E30613] via-[#F24405] to-[#FF5E00] text-white shadow-md hover:shadow-red-600/30 hover:scale-105 active:scale-95 border border-amber-400/30 cursor-pointer select-none ${className}`}
        title="Open Official Chickado Menu PDF"
      >
        <BookOpen className="w-3.5 h-3.5 text-white" />
        <span className="tracking-wider">{label}</span>
      </a>
    );
  }

  if (variant === 'outline') {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-red-600 text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer ${className}`}
      >
        <BookOpen className="w-4 h-4" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md active:scale-95 transition-all cursor-pointer ${className}`}
    >
      <BookOpen className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
}
