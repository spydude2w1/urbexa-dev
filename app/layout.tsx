import React from "react"
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CustomCursor } from '@/components/custom-cursor'
import { MeshBackground } from '@/components/mesh-background'
import { NoiseTexture } from '@/components/noise-texture'

const _inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const _cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: '--font-cormorant'
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Urbexa Projects — Execution-led Construction',
  description: 'Execution-led construction with clarity, control, and long-term value. Free resources and structured insight for landowners and serious builders.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/BK-Favicon.ico',
      },
    ],
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <MeshBackground />
        <NoiseTexture />
        <CustomCursor />
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
