import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import SystemStatusPanel from '@/components/SystemStatusPanel';
import CustomCursor from '@/components/CustomCursor';
import Analytics from '@/components/analytics/Analytics';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'V Kavya — AI × Security × Full-Stack Engineer',
  description: 'I build intelligent, secure, and immersive digital experiences. AI Engineer, Cybersecurity Specialist, Full-Stack Developer. GDGoC Organizer. Google Cloud Certified. CTF Rank 65.',
  keywords: ['Kavya V', 'AI Engineer', 'Full Stack Developer', 'Cybersecurity', 'VAPT', 'Flutter', 'Google Cloud', 'CTF', 'Portfolio', 'GDGoC', 'ServiceNow'],
  openGraph: {
    title: 'V Kavya — AI × Security × Full-Stack Engineer',
    description: 'I build intelligent, secure, and immersive digital experiences.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <Analytics />
      </head>
      <body className="noise-overlay grid-bg">
        <Providers>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <SiteFooter />
          <SystemStatusPanel />
        </Providers>
      </body>
    </html>
  );
}
