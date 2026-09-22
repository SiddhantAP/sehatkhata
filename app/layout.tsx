import type { Metadata, Viewport } from 'next';
import { AppStateProvider } from '@/context/AppStateContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'sehatkhata — Shared Health Records',
  description:
    'A two-way, phone-first health record platform connecting patients and doctors. Hackathon prototype using synthetic demo data.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
