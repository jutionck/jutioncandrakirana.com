"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "React", "Tailwind CSS", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity app that helps users organize tasks, set priorities, and track progress.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Redux", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills with a modern design.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "A weather application that provides real-time forecasts and historical weather data.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">My Projects</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each project is unique and demonstrates different skills and
            technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex gap-4">
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View More Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
