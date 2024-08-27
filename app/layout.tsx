import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./components/theme-provider";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s • Karolis",
    default: "Karolis",
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
      <body className={inter.className}>
        <Providers>
          <div className="flex justify-center mb-16">
            <Navbar />
          </div>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
