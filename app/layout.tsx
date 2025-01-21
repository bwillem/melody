import type { Metadata } from "next"
import "./globals.css"
import { geistMono, geistSans } from "./fonts";

export const experimental_ppr = true

export const metadata: Metadata = {
  title: "Melody AI",
  description: "AI learning tool",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
