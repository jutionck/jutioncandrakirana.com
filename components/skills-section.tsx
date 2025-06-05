"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Layers, LineChart, Palette, Server, Settings } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      id: 1,
      title: "Frontend Development",
      icon: <Layout className="h-8 w-8 text-primary" />,
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      id: 2,
      title: "Backend Development",
      icon: <Server className="h-8 w-8 text-primary" />,
      skills: ["Node.js", "Express", "Python", "Django", "PHP", "Laravel", "RESTful APIs", "GraphQL"],
    },
    {
      id: 3,
      title: "Database",
      icon: <Database className="h-8 w-8 text-primary" />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase", "Redis", "Prisma", "Mongoose"],
    },
    {
      id: 4,
      title: "UI/UX Design",
      icon: <Palette className="h-8 w-8 text-primary" />,
      skills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research", "Accessibility"],
    },
    {
      id: 5,
      title: "DevOps & Tools",
      icon: <Settings className="h-8 w-8 text-primary" />,
      skills: ["Git", "GitHub", "Docker", "CI/CD", "AWS", "Vercel", "Netlify", "Jest", "Cypress"],
    },
    {
      id: 6,
      title: "Programming Languages",
      icon: <Code className="h-8 w-8 text-primary" />,
      skills: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "C#", "Go", "Rust"],
    },
    {
      id: 7,
      title: "Data Visualization",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      skills: ["D3.js", "Chart.js", "Recharts", "Tableau", "Power BI", "Data Analysis", "SVG"],
    },
    {
      id: 8,
      title: "Architecture",
      icon: <Layers className="h-8 w-8 text-primary" />,
      skills: ["Microservices", "Serverless", "MVC", "REST", "GraphQL", "System Design", "Performance Optimization"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">My Skills</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies and tools throughout my career. Here's an overview of my
            technical skills and expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {category.icon}
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
