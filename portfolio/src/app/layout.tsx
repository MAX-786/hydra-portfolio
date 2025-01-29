import "./globals.css"
import { Inter } from "next/font/google"
import AnimatedBackground from "../components/AnimatedBackground"
import { ThemeProvider } from "../contexts/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Unique Portfolio",
  description: "A unique portfolio design with vertical navigation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 overflow-x-hidden transition-colors duration-200`}
      >
        <ThemeProvider>
          <AnimatedBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}

