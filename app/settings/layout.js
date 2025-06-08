// app/layout.tsx or app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Settings | Nearme",
    template: "Settings you preferences | Security and privacy | Nearme",
  },
  description: "A modern web application built with Next.js 13+ App Router.",
  metadataBase: new URL("https://yourdomain.com"), // change this to your actual domain
  openGraph: {
    title: "Create Next App",
    description: "A modern web application built with Next.js.",
    url: "/",
    siteName: "My Next App",
    images: [
      {
        url: "/og-image.png", // optional: path to your open graph image
        width: 1200,
        height: 630,
        alt: "Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Next App",
    description: "A modern web application built with Next.js.",
    creator: "@your_twitter_handle", // optional
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}