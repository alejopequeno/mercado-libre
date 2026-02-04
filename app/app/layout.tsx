import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Navbar } from "@/components/layout/navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mercado Libre Challenge",
    template: "%s | Mercado Libre Challenge",
  },
  description: "Challenge técnico - Mercado Libre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NuqsAdapter>
          <QueryProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
              {children}
            </main>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
