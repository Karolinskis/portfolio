import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./components/theme-provider";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s • Karolis",
    default: "Karolis",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Karolis",
  },
  description:
    "Hi, I'm Karolis. I'm a 23-year-old Software Engineer mainly focused on backend development.",
  applicationName: "Karolis' portfolio",
  keywords: [
    "Karolis",
    "Software Engineer",
    "Backend Developer",
    "Lithuania",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <div className="flex justify-center mb-20">
            <Navbar />
          </div>
          <main className="flex-grow">{children}</main>
          <div className="mt-auto">
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
