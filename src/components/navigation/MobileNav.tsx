'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav, utilityNav } from '@/content/navigation';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span
          className={`h-0.5 w-6 bg-white transition-all ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-all ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-all ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/50"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Slide-over */}
      <div
        className={`fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 transform bg-[var(--color-primary)] shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 p-6">
          {/* Main Navigation */}
          <div className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              const isCTA = item.variant === 'cta';

              if (isCTA) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="mt-2 rounded-md border-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-3 text-center font-semibold text-white transition-all hover:bg-transparent hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-md px-4 py-3 font-medium text-white transition-colors hover:bg-white/10 hover:text-[var(--color-accent)] ${
                    isActive ? 'bg-white/10 text-[var(--color-accent)]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-white/20" />

          {/* Utility Navigation */}
          <div className="flex flex-col gap-1">
            {utilityNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-md px-4 py-3 font-medium text-white transition-colors hover:bg-white/10 hover:text-[var(--color-accent)] ${
                    isActive ? 'bg-white/10 text-[var(--color-accent)]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
