"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

type Session = { email: string; role: "admin" | "employee" } | null

function useSession(): [Session, (s: Session) => void] {
  const [session, setSession] = useState<Session>(null)
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("kmrl-session") : null
    setSession(raw ? JSON.parse(raw) : null)
  }, [])
  const set = (s: Session) => {
    if (typeof window !== "undefined") {
      if (s) localStorage.setItem("kmrl-session", JSON.stringify(s))
      else localStorage.removeItem("kmrl-session")
    }
    setSession(s)
  }
  return [session, set]
}

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useSession()

  const links = [
    { href: "/", label: "Home" },
    { href: "/analytics", label: "Analytics" },
    { href: "/whatsapp", label: "WhatsApp" },
    { href: "/settings", label: "Settings" },
  ]

  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-3">
        <div className="surface-card section-ring rounded-xl px-4 py-2 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-pretty">
            <span className="sr-only">KMRL-Synapse</span>
            <div className="flex items-center gap-2">
              <img src="/placeholder-logo.svg" alt="" className="h-6 w-6" />
              <span>KMRL‑Synapse</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm hover:underline underline-offset-4",
                  pathname === l.href ? "font-medium" : "opacity-90",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <span className="text-xs md:text-sm opacity-90">{session.role}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSession(null)
                    router.push("/")
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="secondary">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Signup</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
