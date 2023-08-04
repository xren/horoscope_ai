// File path: /app/input/layout.tsx

// import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { InputPageContainer } from './container';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Input',
}

export default function InputLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         {children}
      </body>
    </html>
  )
}
