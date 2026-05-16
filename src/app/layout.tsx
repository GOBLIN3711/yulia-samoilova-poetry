import type { Metadata, Viewport } from "next"
import "./globals.css"

const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: "Юлия Самойлова — Поэтесса | Санкт-Петербург",
  description: "Стихи поэтессы Юлии Самойловой из Санкт-Петербурга. Лирика о природе, любви, семье и родном городе.",
  keywords: ["Юлия Самойлова", "поэтесса", "Санкт-Петербург", "стихи", "поэзия", "лирика"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontsUrl} rel="stylesheet" />
      </head>
      <body className="min-h-screen antialiased" style={{ backgroundColor: "#FAF7F2", color: "#3C2415" }}>
        {children}
      </body>
    </html>
  )
}
