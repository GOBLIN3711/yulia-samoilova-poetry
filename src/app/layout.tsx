import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Юлия Самойлова — Поэтесса | Санкт-Петербург",
  description: "Стихи поэтессы Юлии Самойловой из Санкт-Петербурга. Природа, любовь, семейная лирика и духовная поэзия."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
