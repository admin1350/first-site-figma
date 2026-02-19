import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Идеи Первых",
  description: "Платформа для обмена идеями и публикации проектов Движения Первых",
  keywords: ["идеи", "проекты", "Движение Первых", "молодежь", "инновации"],
  authors: [{ name: "Движение Первых" }],
  openGraph: {
    title: "Идеи Первых",
    description: "Платформа для обмена идеями и публикации проектов Движения Первых",
    type: "website",
    locale: "ru_RU",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
