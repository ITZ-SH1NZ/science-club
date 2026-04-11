import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Science Club | Innovate, Discover, Create",
  description: "Official website of the Science Club. Join us for events, workshops, and cutting-edge projects.",
};

import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased smooth-scroll`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
