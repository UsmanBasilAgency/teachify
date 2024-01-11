import type { Metadata } from 'next'
import { DARK_MODE_CLASS_NAME } from "@/utils/const";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={DARK_MODE_CLASS_NAME}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
