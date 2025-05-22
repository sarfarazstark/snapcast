import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { satoshi } from "../fonts/font";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapCast",
  description: "A Screen Sharing App",
  icons: {
    icon: "/assets/icons/logo.svg",
  },
  openGraph: {
    title: "SnapCast",
    description: "A Screen Sharing App",
    url: "https://snapcast.studio",
    siteName: "SnapCast",
    images: [
      {
        url: "/assets/images/snapcast.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapCast",
    description: "A Screen Sharing App",
    images: ["/assets/images/snapcast.png"],
    creator: "@sarfarazstark",
  },
  themeColor: "#000000",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistKarla.variable} ${satoshi.variable} font-karla antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
