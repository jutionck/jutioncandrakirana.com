"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">About Me</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=600&width=800" alt="About Me" className="object-cover h-full w-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold">Who I Am</h3>
            <p className="text-muted-foreground">
              I'm a passionate web developer with over 5 years of experience creating beautiful, functional websites and
              applications. I specialize in front-end development with React and Next.js, but I'm also comfortable
              working with back-end technologies.
            </p>
            <p className="text-muted-foreground">
              My journey in web development started when I built my first website for a local business. Since then, I've
              worked with clients ranging from small startups to large enterprises, helping them achieve their digital
              goals.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">5+</h4>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">50+</h4>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">30+</h4>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-bold">10+</h4>
                  <p className="text-sm text-muted-foreground">Awards Won</p>
                </CardContent>
              </Card>
            </div>

            <Button className="w-fit mt-4" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
