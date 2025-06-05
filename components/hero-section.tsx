"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const titles = ["Web Developer", "UI/UX Designer", "Problem Solver"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let i = 0
    const currentTitle = titles[index]
    setText("")

    const typingInterval = setInterval(() => {
      if (i < currentTitle.length) {
        setText((prev) => prev + currentTitle.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [index])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--foreground-rgb),0.1),transparent_50%)]" />

      <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-primary">Your Name</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mt-4 h-10">
              I'm a <span className="text-primary">{text}</span>
              <span className="animate-blink">|</span>
            </h2>
          </div>

          <p className="text-muted-foreground text-lg max-w-md">
            I build exceptional and accessible digital experiences for the web.
          </p>

          <div className="flex gap-4">
            <Button asChild>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Projects
              </a>
            </Button>
          </div>

          <div className="flex gap-4 mt-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:your.email@example.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-square max-w-md mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/20 blur-3xl opacity-20" />
          <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-primary/20">
            <img src="/placeholder.svg?height=400&width=400" alt="Your Name" className="object-cover h-full w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
