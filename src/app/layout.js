import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "QuantumJobPortal - Find Your Dream Job",
    template: "%s | QuantumJobPortal"
  },
  description: "Discover your next career opportunity with QuantumJobPortal. Connect with top employers, browse thousands of jobs, and find the perfect role that matches your skills and aspirations.",
  keywords: [
    "jobs",
    "career",
    "employment",
    "hiring",
    "recruitment",
    "job portal",
    "career opportunities",
    "job search",
    "find jobs",
    "employment opportunities"
  ].join(", "),
  authors: [
    {
      name: "QuantumJobPortal Team",
      url: "https://quantum-job-portal-pi.vercel.app/",
    },
  ],
  creator: "QuantumJobPortal",
  publisher: "QuantumJobPortal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quantum-job-portal-pi.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantum-job-portal-pi.vercel.app/',
    siteName: 'QuantumJobPortal',
    title: 'QuantumJobPortal - Find Your Dream Job',
    description: 'Discover your next career opportunity with QuantumJobPortal. Connect with top employers and find the perfect role.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'QuantumJobPortal - Find Your Dream Job',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuantumJobPortal - Find Your Dream Job',
    description: 'Discover your next career opportunity with QuantumJobPortal.',
    creator: '@quantumjobportal',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'employment',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  other: {
    'msapplication-TileColor': '#10b981',
    'theme-color': '#10b981',
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </Providers>

      </body>
    </html>
  );
}
