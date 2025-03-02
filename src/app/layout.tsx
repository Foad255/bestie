import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Virtual Friend World",
  description: "A world where AI friends live their own lives and interact with users",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <i className="fas fa-user-friends text-2xl"></i>
                  <span className="font-bold">Virtual Friend World</span>
                </a>
              </div>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a href="/dashboard" className="transition-colors hover:text-foreground/80">
                  Dashboard
                </a>
                <a href="/family" className="transition-colors hover:text-foreground/80">
                  Family Tree
                </a>
              </nav>
            </div>
          </header>
          <div className="flex-1">
            <div className="container py-6">
              {children}
            </div>
          </div>
          <footer className="border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js, Tailwind CSS and shadcn/ui
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
