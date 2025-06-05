'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Featured blog posts for the home page
const featuredPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15: A Complete Guide',
    excerpt:
      'Explore the latest features in Next.js 15 and learn how to build modern web applications.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 2,
    title: 'The Art of Clean Code: Best Practices for Developers',
    excerpt:
      'Learn essential principles for writing maintainable, readable, and efficient code.',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Programming',
    tags: ['Clean Code', 'Best Practices'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 3,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt:
      'Master the utility-first CSS framework and create beautiful, responsive user interfaces.',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'CSS',
    tags: ['Tailwind CSS', 'UI/UX'],
    image: '/placeholder.svg?height=300&width=400',
  },
];

export function BlogSection() {
  return (
    <section id='blog' className='py-20 px-4'>
      <div className='container max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl font-bold'>Latest Blog Posts</h2>
          <div className='mt-2 h-1 w-20 bg-primary mx-auto'></div>
          <p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
            Insights, tutorials, and thoughts about web development,
            programming, and technology.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow'>
                <div className='relative aspect-video overflow-hidden'>
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute top-4 left-4'>
                    <Badge variant='secondary'>{post.category}</Badge>
                  </div>
                </div>
                <CardContent className='p-6 flex-grow'>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-4 w-4' />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='h-4 w-4' />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className='text-lg font-bold mb-3 group-hover:text-primary transition-colors'>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className='text-muted-foreground text-sm mb-4'>
                    {post.excerpt}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className='inline-flex items-center gap-1 text-xs text-muted-foreground'
                      >
                        <Tag className='h-3 w-3' />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className='px-6 pb-6 pt-0'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className='text-center'>
          <Button asChild size='lg'>
            <Link href='/blog'>
              View All Posts <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
