"use client"

import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4">Your Name</h3>
            <p className="text-muted-foreground max-w-xs">
              A passionate web developer focused on creating beautiful and functional websites and applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="grid gap-2">
              <Link
                href="#home"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                About
              </Link>
              <Link
                href="#projects"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Projects
              </Link>
              <Link
                href="#skills"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Skills
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:your.email@example.com"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
