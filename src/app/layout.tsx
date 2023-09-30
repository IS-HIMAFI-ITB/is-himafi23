import Navbar from '-/components/navbar';
import Footer from '-/components/ui/footer';
import AuthProvider from '-/context/auth-provider';
import { ThemeProvider } from '-/context/theme-provider';
import TRPCProvider from '-/trpc/provider';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://www.ishimafiitb.com'),
  title: {
    template: '%s | Intellektuelle Schule 2023',
    default: 'Intellektuelle Schule 2023',
  },
  colorScheme: 'dark',
  publisher: 'HIMAFI ITB 2023',
  creator: 'Divisi IT Intellektuelle Schule 2023',
  authors: [
    { name: 'Muhammad Zydan Priambada' },
    {
      name: 'Muhammad Afief Abdurrahman',
      url: 'https://afiefabdurrahman.vercel.app',
    },
  ],
  keywords: [
    'Intellektuelle Schule 2023',
    'HIMAFI ITB',
    'ITB',
    'Penerimaan Anggota Baru',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  description:
    'Sebuah acara tahunan yang diadakan sebagai proses penerimaan anggota baru HIMAFI ITB.',
  openGraph: {
    title: 'Intellektuelle Schule 2023',
    description:
      'Sebuah acara tahunan yang diadakan sebagai proses penerimaan anggota baru HIMAFI ITB.',
    url: 'https://www.ishimafiitb.com',
    siteName: 'Intellektuelle Schule 2023',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    title: 'Intellektuelle Schule 2023',
    description:
      'Sebuah acara tahunan yang diadakan sebagai proses penerimaan anggota baru HIMAFI ITB.',
    creator: '@ishimafiitb',
    images: {
      url: '../../public/logo.svg',
      alt: 'Intellektuelle Schule 2023',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id'>
      <body className={`${inter.className} overflow-x-hidden`}>
        <AuthProvider>
          <TRPCProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
            >
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
