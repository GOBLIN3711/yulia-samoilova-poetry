import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Юлия Самойлова — Поэтесса | Санкт-Петербург",
  description: "Стихи поэтессы Юлии Самойловой из Санкт-Петербурга. Любовная лирика, природа, семья, духовная поэзия и размышления."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
