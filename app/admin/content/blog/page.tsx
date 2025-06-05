'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

// Mock blog data
const initialBlogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15: A Complete Guide',
    excerpt:
      'Explore the latest features in Next.js 15 and learn how to build modern web applications.',
    date: '2024-01-15',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript'],
    status: 'published',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of Clean Code: Best Practices for Developers',
    excerpt:
      'Learn essential principles for writing maintainable, readable, and efficient code.',
    date: '2024-01-10',
    category: 'Programming',
    tags: ['Clean Code', 'Best Practices'],
    status: 'published',
    featured: false,
  },
  {
    id: 3,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt:
      'Master the utility-first CSS framework and create beautiful, responsive user interfaces.',
    date: '2024-01-05',
    category: 'CSS',
    tags: ['Tailwind CSS', 'UI/UX'],
    status: 'published',
    featured: true,
  },
  {
    id: 4,
    title: 'Understanding React Server Components',
    excerpt:
      "Dive deep into React Server Components and learn how they can improve your application's performance.",
    date: '2023-12-28',
    category: 'React',
    tags: ['React', 'Server Components'],
    status: 'published',
    featured: false,
  },
  {
    id: 5,
    title: 'Database Design Patterns for Modern Applications',
    excerpt:
      'Explore common database design patterns and learn how to structure your data for scalability.',
    date: '2023-12-20',
    category: 'Database',
    tags: ['Database', 'Design Patterns'],
    status: 'draft',
    featured: false,
  },
  {
    id: 6,
    title: 'The Future of Web Development: Trends to Watch',
    excerpt:
      'Stay ahead of the curve with insights into emerging web development trends and technologies.',
    date: '2023-12-15',
    category: 'Trends',
    tags: ['Web Development', 'Trends'],
    status: 'draft',
    featured: false,
  },
];

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Handle search
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle sorting
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDeletePost = (id: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
    toast({
      title: 'Post deleted',
      description: 'The blog post has been deleted successfully',
    });
  };

  const handleToggleFeatured = (id: number) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === id ? { ...post, featured: !post.featured } : post
      )
    );

    const post = blogPosts.find((post) => post.id === id);
    toast({
      title: post?.featured ? 'Post unfeatured' : 'Post featured',
      description: post?.featured
        ? 'The blog post has been removed from featured posts'
        : 'The blog post has been added to featured posts',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Blog Posts</h1>
        <Button asChild>
          <Link href='/admin/content/blog/new'>
            <Plus className='mr-2 h-4 w-4' /> New Post
          </Link>
        </Button>
      </div>

      <div className='flex items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Search posts...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[400px]'>
                  <Button
                    variant='ghost'
                    onClick={() => requestSort('title')}
                    className='flex items-center'
                  >
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => requestSort('category')}
                    className='flex items-center'
                  >
                    Category
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => requestSort('date')}
                    className='flex items-center'
                  >
                    Date
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => requestSort('status')}
                    className='flex items-center'
                  >
                    Status
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center py-8'>
                    <div className='flex justify-center'>
                      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
                    </div>
                    <div className='mt-2 text-sm text-muted-foreground'>
                      Loading posts...
                    </div>
                  </TableCell>
                </TableRow>
              ) : sortedPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center py-8'>
                    <div className='text-muted-foreground'>No posts found</div>
                    <Button
                      variant='outline'
                      className='mt-4'
                      onClick={() => setSearchTerm('')}
                    >
                      Clear search
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                sortedPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className='font-medium'>{post.title}</div>
                      <div className='text-sm text-muted-foreground truncate max-w-[350px]'>
                        {post.excerpt}
                      </div>
                      {post.featured && (
                        <Badge variant='secondary' className='mt-1'>
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center'>
                        <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === 'published' ? 'default' : 'secondary'
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/content/blog/${post.id}`}>
                              <Edit className='mr-2 h-4 w-4' /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.id}`} target='_blank'>
                              <Eye className='mr-2 h-4 w-4' /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleFeatured(post.id)}
                          >
                            <Tag className='mr-2 h-4 w-4' />
                            {post.featured ? 'Unfeature' : 'Feature'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className='text-red-600'
                              >
                                <Trash2 className='mr-2 h-4 w-4' /> Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the blog post "
                                  {post.title}". This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePost(post.id)}
                                  className='bg-red-600 hover:bg-red-700'
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
