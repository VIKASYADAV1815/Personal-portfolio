import type React from "react"
import type { Metadata } from "next"
import { Inter, Chakra_Petch, Goldman } from "next/font/google"
import "./globals.css"
import Navbar from "./navbar"
import PageTransition from "../components/PageTransition"

const inter = Inter({ subsets: ["latin"] })
const chakraPetch = Chakra_Petch({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-chakra'
});

// Remove dynamic font loading from components

export const metadata: Metadata = {
  title: "Vikas Yadav - Portfolio",
  description: "Translating Ideas into Operational Success",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.className} overflow-x-hidden`}
        style={{ backgroundColor: "#121315" }}
        suppressHydrationWarning
      >
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
          <Navbar />
        </div>
        <PageTransition>
          <div className="page-transition-container">
            {children}
          </div>
        </PageTransition>
      </body>
    </html>
  )
}
