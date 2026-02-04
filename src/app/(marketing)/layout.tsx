'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget';
import { AuthProvider } from '@/contexts/AuthContext';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <Footer />
      <WhatsAppWidget />
    </AuthProvider>
  );
}
