import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import "swiper/css"
import "swiper/css/free-mode"
import "react-loading-skeleton/dist/skeleton.css"

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
})
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
})

export const metadata: Metadata = {
    title: "Kuztompitch | Custom Microphones & Band Equipment",
    description:
        "Kuztompitch specializes in bespoke microphone and band gear customization. Elevate your stage presence with tailored planning, creative design, and comprehensive service backed by over 5 years of experience.",
    keywords: [
        "custom microphone",
        "band equipment customization",
        "bespoke audio gear",
        "stage microphone design",
        "personalized band gear",
        "musician gear design",
        "tailored microphone service",
        "Kuztompitch microphones",
        "custom band accessories",
        "audio gear styling",
    ],
    openGraph: {
        title: "Kuztompitch | Custom Microphones & Band Equipment",
        description:
            "Transform your standard audio gear into bold statements with Kuztompitch. Our handcrafted microphones and band equipment are designed to reflect your unique style, backed by expert planning and creative craftsmanship.",
        url: "https://kuztompitch.vercel.app", // Replace with actual URL
        siteName: "Kuztompitch",
        images: [
            {
                url: "https://kuztompitch.vercel.app/assets/white-logo.png", // Replace with actual image
                width: 1200,
                height: 630,
                alt: "Custom microphone by Kuztompitch",
            },
        ],
        type: "website",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    )
}
