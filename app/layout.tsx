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
    <html lang="ru" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}