'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3,
  FileText,
  Users,
  MessageSquare,
  Eye,
  ArrowUpRight,
  Edit,
  Clock,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalViews: 0,
    blogPosts: 0,
    projects: 0,
    messages: 0,
  });

  const [recentPosts, setRecentPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with Next.js 15',
      date: '2024-01-15',
      views: 245,
    },
    { id: 2, title: 'The Art of Clean Code', date: '2024-01-10', views: 189 },
    {
      id: 3,
      title: 'Building Responsive UIs with Tailwind CSS',
      date: '2024-01-05',
      views: 327,
    },
  ]);

  const [recentMessages, setRecentMessages] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      date: '2024-01-18',
      subject: 'Project Inquiry',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-01-17',
      subject: 'Collaboration Opportunity',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      date: '2024-01-15',
      subject: 'Speaking Engagement',
    },
  ]);

  // Simulate loading data
  useEffect(() => {
    const loadStats = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStats({
        totalViews: 1247,
        blogPosts: 6,
        projects: 4,
        messages: 8,
      });
    };

    loadStats();
  }, []);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Button asChild>
          <Link href='/admin/content/blog/new'>New Blog Post</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between space-y-0'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Total Views
                </p>
                <BarChart3 className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline justify-between'>
                <h3 className='text-2xl font-bold'>
                  {stats.totalViews.toLocaleString()}
                </h3>
                <Badge variant='outline' className='text-xs'>
                  +12% this week
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between space-y-0'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Blog Posts
                </p>
                <FileText className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline justify-between'>
                <h3 className='text-2xl font-bold'>{stats.blogPosts}</h3>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 text-xs'
                  asChild
                >
                  <Link href='/admin/content/blog'>
                    Manage <ArrowUpRight className='ml-1 h-3 w-3' />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between space-y-0'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Projects
                </p>
                <Users className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline justify-between'>
                <h3 className='text-2xl font-bold'>{stats.projects}</h3>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 text-xs'
                  asChild
                >
                  <Link href='/admin/content/projects'>
                    Manage <ArrowUpRight className='ml-1 h-3 w-3' />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between space-y-0'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Messages
                </p>
                <MessageSquare className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline justify-between'>
                <h3 className='text-2xl font-bold'>{stats.messages}</h3>
                <Badge variant='secondary' className='text-xs'>
                  3 new
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue='posts' className='mt-6'>
        <TabsList>
          <TabsTrigger value='posts'>Recent Posts</TabsTrigger>
          <TabsTrigger value='messages'>Recent Messages</TabsTrigger>
        </TabsList>

        <TabsContent value='posts' className='mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Blog Posts</CardTitle>
              <CardDescription>
                Overview of your latest blog posts and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='space-y-1'>
                      <div className='font-medium'>{post.title}</div>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <Clock className='mr-1 h-3 w-3' />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className='mx-2'>•</span>
                        <Eye className='mr-1 h-3 w-3' />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm' asChild>
                      <Link href={`/admin/content/blog/${post.id}`}>
                        <Edit className='h-4 w-4' />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full' asChild>
                <Link href='/admin/content/blog'>View All Posts</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='messages' className='mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Messages from your contact form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='space-y-1'>
                      <div className='font-medium'>{message.subject}</div>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <span>{message.name}</span>
                        <span className='mx-2'>•</span>
                        <span>{message.email}</span>
                      </div>
                    </div>
                    <Badge variant='outline'>
                      {new Date(message.date).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full' asChild>
                <Link href='/admin/contact'>View All Messages</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
