import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PWAInstaller } from "@/components/pwa-installer"
import { CartProvider } from "@/contexts/cart-context"
import { AdminProvider } from "@/contexts/admin-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "MBJ EXCLUSIVE | Fashion Beyond Clothing",
  description:
    "Redefining Nigerian luxury fashion for the modern woman. Handcrafted couture, premium materials, and perfect fit guaranteed.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MBJ EXCLUSIVE",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#b8860b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MBJ EXCLUSIVE" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AdminProvider>
          <CartProvider>
            {children}
            <PWAInstaller />
            <Analytics />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}


