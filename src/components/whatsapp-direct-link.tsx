'use client';

import React from 'react';
import { openWhatsAppDirectly, buildDirectWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppDirectLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  phone: string;
  message?: string;
  children: React.ReactNode;
}

export default function WhatsAppDirectLink({
  phone,
  message,
  children,
  onClick,
  href,
  className,
  target,
  ...props
}: WhatsAppDirectLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWhatsAppDirectly(phone, message);
    if (onClick) {
      onClick(e);
    }
  };

  const directUrl = href || buildDirectWhatsAppUrl(phone, message);

  return (
    <a
      href={directUrl}
      onClick={handleClick}
      className={className}
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
