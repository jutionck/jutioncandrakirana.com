'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Tag, User, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Mock blog data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15: A Complete Guide',
    excerpt:
      'Explore the latest features in Next.js 15 and learn how to build modern web applications with improved performance and developer experience.',
    content: 'Full blog post content would go here...',
    author: 'Your Name',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    image: '/placeholder.svg?height=400&width=600',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of Clean Code: Best Practices for Developers',
    excerpt:
      'Learn essential principles and practices for writing maintainable, readable, and efficient code that your future self will thank you for.',
    content: 'Full blog post content would go here...',
    author: 'Your Name',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Programming',
    tags: [
      'Clean Code',
      'Best Practices',
      'Programming',
      'Software Development',
    ],
    image: '/placeholder.svg?height=400&width=600',
    featured: false,
  },
  {
    id: 3,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt:
      'Master the utility-first CSS framework and create beautiful, responsive user interfaces with Tailwind CSS.',
    content: 'Full blog post content would go here...',
    author: 'Your Name',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Responsive Design', 'UI/UX'],
    image: '/placeholder.svg?height=400&width=600',
    featured: true,
  },
  {
    id: 4,
    title: 'Understanding React Server Components',
    excerpt:
      "Dive deep into React Server Components and learn how they can improve your application's performance and user experience.",
    content: 'Full blog post content would go here...',
    author: 'Your Name',
    date: '2023-12-28',
    readTime: '12 min read',
    category: 'React',
    tags: ['React', 'Server Components', 'Performance', 'Web Development'],
    image: '/placeholder.svg?height=400&width=600',
    featured: false,
  },
  {
    id: 5,
    title: 'Database Design Patterns for Modern Applications',
    excerpt:
      'Explore common database design patterns and learn how to structure your data for scalability and performance.',
    content: 'Full blog post content would go here...',
    author: 'Your Name',
    date: '2023-12-20',
    readTime: '15 min read',
    category: 'Database',
    tags: ['Database', 'Design Patterns', 'SQL', 'Architecture'],
    image: '/placeholder.svg?height=400&width=600',
    featured: false,
  },
  {
    id: 6,
    title: 'The Future of Web Development: Trends to Watch',
    excerpt:
      'Stay ahead of the curve with insights into emerging web development trends and technologies shaping the future.',
    content: 'Full blog post content would go here...',
    author: 'Your Name',
    date: '2023-12-15',
    readTime: '7 min read',
    category: 'Trends',
    tags: ['Web Development', 'Trends', 'Future', 'Technology'],
    image: '/placeholder.svg?height=400&width=600',
    featured: false,
  },
];

const categories = [
  'All',
  'Web Development',
  'Programming',
  'CSS',
  'React',
  'Database',
  'Trends',
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      <div className='pt-16'>
        {/* Hero Section */}
        <section className='py-20 px-4 bg-muted/30'>
          <div className='container max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='mb-6'>
                <Button variant='ghost' asChild>
                  <Link href='/'>
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Back to Portfolio
                  </Link>
                </Button>
              </div>
              <h1 className='text-4xl md:text-6xl font-bold mb-6'>My Blog</h1>
              <p className='text-xl text-muted-foreground max-w-2xl'>
                Thoughts, tutorials, and insights about web development,
                programming, and technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className='py-12 px-4'>
          <div className='container max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='flex flex-col md:flex-row gap-6 items-center justify-between mb-12'
            >
              <div className='relative w-full md:w-96'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                <Input
                  placeholder='Search posts...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>

              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? 'default' : 'outline'
                    }
                    size='sm'
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='mb-16'
              >
                <h2 className='text-2xl font-bold mb-8'>Featured Posts</h2>
                <div className='grid md:grid-cols-2 gap-8'>
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
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
                              <User className='h-4 w-4' />
                              {post.author}
                            </div>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='h-4 w-4' />
                              {post.readTime}
                            </div>
                          </div>
                          <h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors'>
                            {post.title}
                          </h3>
                          <p className='text-muted-foreground mb-4'>
                            {post.excerpt}
                          </p>
                          <div className='flex flex-wrap gap-2'>
                            {post.tags.slice(0, 3).map((tag) => (
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
                          <Button asChild className='w-full'>
                            <Link href={`/blog/${post.id}`}>Read More</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className='text-2xl font-bold mb-8'>All Posts</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {regularPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
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
                            {post.title}
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
              </motion.div>
            )}

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-center py-16'
              >
                <h3 className='text-2xl font-bold mb-4'>No posts found</h3>
                <p className='text-muted-foreground mb-6'>
                  Try adjusting your search terms or selected category.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
