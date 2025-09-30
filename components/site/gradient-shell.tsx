import type React from "react"
import { Nav } from "./nav"
import { Footer } from "./footer"

export default function GradientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-kmrl text-foreground">
      <Nav />
      <main className="mx-auto max-w-6xl px-4">{children}</main>
      <Footer />
    </div>
  )
}
