import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/page";
import BottomNavBar from "@/components/bottomNavBar/page";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrepPapers — B.Tech PYQ Hub",
  description: "Access previous year question papers for NIT & IIT easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1 pb-16 md:pb-0">
          {children}
        </div>
        <BottomNavBar />
      </body>
    </html>
  );
}
