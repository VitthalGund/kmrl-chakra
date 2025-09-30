import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/20">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4 md:flex md:items-center md:justify-between">
        <p className="text-sm opacity-90">© {new Date().getFullYear()} KMRL‑Synapse</p>
        <nav className="flex gap-4 text-sm">
          <Link href="/#about" className="hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/#contact" className="hover:underline underline-offset-4">
            Contact
          </Link>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
