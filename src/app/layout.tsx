import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Footer from "@/components/Footer";
import TanstackProvider from "@/components/TanstackProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth/authProvider";
import { LocationProvider } from "@/context/location/locationProvider";
// import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liveyst",
  description:
    "Liveyst is a platform where you can view the current opening status, easily provide feedback on Google Business, and access other details about any business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1C506C4V3V" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1C506C4V3V');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <NextTopLoader color="#18181B" showSpinner={false} /> */}
        <LocationProvider>
          <AuthProvider>
            <TanstackProvider>
              {children}
              <Toaster />
              {/* <Footer /> */}
            </TanstackProvider>
          </AuthProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
