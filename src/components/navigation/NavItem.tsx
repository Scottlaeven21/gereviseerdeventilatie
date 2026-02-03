'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem as NavItemType } from '@/content/navigation';

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isCTA = item.variant === 'cta';

  if (isCTA) {
    return (
      <Link
        href={item.href}
        className="rounded-md border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-[var(--color-accent)]"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={`relative px-3 py-2 text-sm font-medium text-white transition-colors hover:text-[var(--color-accent)] ${
        isActive ? 'text-[var(--color-accent)]' : ''
      }`}
    >
      {item.label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[var(--color-accent)] transition-transform ${
          isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
        }`}
      />
    </Link>
  );
}
