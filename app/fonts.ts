import { Geist, Geist_Mono, Henny_Penny } from "next/font/google"

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const hennyPenny = Henny_Penny({
    weight: "400",
})
