'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, ImageIcon, Plus, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15: A Complete Guide',
    excerpt:
      'Explore the latest features in Next.js 15 and learn how to build modern web applications with improved performance and developer experience.',
    content: {
      sections: [
        {
          type: 'header',
          level: 1,
          content: 'Getting Started with Next.js 15: A Complete Guide',
        },
        {
          type: 'paragraph',
          content:
            "Next.js 15 brings exciting new features and improvements that make building modern web applications even more powerful and developer-friendly. In this comprehensive guide, we'll explore what's new and how to get started.",
        },
        {
          type: 'header',
          level: 2,
          content: "🚀 What's New in Next.js 15",
        },
        // More content sections...
      ],
    },
    date: '2024-01-15',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    image: '/placeholder.svg?height=400&width=800',
    status: 'published',
    featured: true,
  },
  // More blog posts...
];

// Available categories
const categories = [
  'Web Development',
  'Programming',
  'CSS',
  'React',
  'Database',
  'Trends',
  'UI/UX',
  'JavaScript',
  'TypeScript',
  'DevOps',
];

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const isNewPost = params?.id === 'new';
  const postId = isNewPost ? null : Number(params?.id);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [post, setPost] = useState({
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Web Development',
    tags: [] as string[],
    image: '/placeholder.svg?height=400&width=800',
    status: 'draft',
    featured: false,
  });

  const [newTag, setNewTag] = useState('');

  // Load post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!isNewPost && postId) {
          const foundPost = blogPosts.find((p) => p.id === postId);

          if (foundPost) {
            // Convert content object to string for the editor
            const contentString = JSON.stringify(foundPost.content, null, 2);

            setPost({
              ...foundPost,
              content: contentString,
            });
          } else {
            toast({
              title: 'Post not found',
              description: 'The requested blog post could not be found',
              variant: 'destructive',
            });
            router.push('/admin/content/blog');
          }
        }
      } catch (error) {
        toast({
          title: 'Error loading post',
          description: 'There was a problem loading the blog post',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [isNewPost, postId, router]);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Validate required fields
      if (!post.title || !post.excerpt || !post.content) {
        toast({
          title: 'Missing required fields',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        setIsSaving(false);
        return;
      }

      // In a real app, this would be an API call to save the post
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isNewPost ? 'Post created' : 'Post updated',
        description: isNewPost
          ? 'Your new blog post has been created successfully'
          : 'The blog post has been updated successfully',
      });

      // Redirect to blog posts list
      router.push('/admin/content/blog');
    } catch (error) {
      toast({
        title: 'Error saving post',
        description: 'There was a problem saving the blog post',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (newTag && !post.tags.includes(newTag)) {
      setPost({
        ...post,
        tags: [...post.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost({
      ...post,
      tags: post.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[50vh]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/admin/content/blog'>
              <ArrowLeft className='h-5 w-5' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>
            {isNewPost ? 'Create New Post' : 'Edit Post'}
          </h1>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link
              href={isNewPost ? '/blog' : `/blog/${post.id}`}
              target='_blank'
            >
              <Eye className='mr-2 h-4 w-4' />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className='mr-2 h-4 w-4' />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue='content'>
          <TabsList className='mb-4'>
            <TabsTrigger value='content'>Content</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
            <TabsTrigger value='seo'>SEO</TabsTrigger>
          </TabsList>

          <TabsContent value='content' className='space-y-6'>
            <div className='grid gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  placeholder='Post title'
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='excerpt'>Excerpt</Label>
                <Textarea
                  id='excerpt'
                  placeholder='Brief summary of the post'
                  value={post.excerpt}
                  onChange={(e) =>
                    setPost({ ...post, excerpt: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='content'>Content</Label>
                <Textarea
                  id='content'
                  placeholder='Post content in markdown or structured format'
                  value={post.content}
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                  }
                  rows={15}
                  className='font-mono text-sm'
                />
                <p className='text-sm text-muted-foreground'>
                  Content can be structured JSON or markdown format
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='settings' className='space-y-6'>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='date'>Publication Date</Label>
                <Input
                  id='date'
                  type='date'
                  value={post.date}
                  onChange={(e) => setPost({ ...post, date: e.target.value })}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='category'>Category</Label>
                <Select
                  value={post.category}
                  onValueChange={(value) =>
                    setPost({ ...post, category: value })
                  }
                >
                  <SelectTrigger id='category'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='status'>Status</Label>
                <Select
                  value={post.status}
                  onValueChange={(value) => setPost({ ...post, status: value })}
                >
                  <SelectTrigger id='status'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='published'>Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='featured'>Featured Post</Label>
                <div className='flex items-center space-x-2 pt-2'>
                  <Switch
                    id='featured'
                    checked={post.featured}
                    onCheckedChange={(checked) =>
                      setPost({ ...post, featured: checked })
                    }
                  />
                  <Label htmlFor='featured' className='cursor-pointer'>
                    {post.featured ? 'Featured' : 'Not featured'}
                  </Label>
                </div>
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='image'>Featured Image</Label>
                <div className='flex gap-4 items-start'>
                  <div className='w-32 h-32 rounded-md border overflow-hidden flex-shrink-0'>
                    <img
                      src={post.image || '/placeholder.svg'}
                      alt='Featured'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 space-y-2'>
                    <Input
                      id='image'
                      placeholder='Image URL'
                      value={post.image}
                      onChange={(e) =>
                        setPost({ ...post, image: e.target.value })
                      }
                    />
                    <Button variant='outline' type='button'>
                      <ImageIcon className='mr-2 h-4 w-4' />
                      Choose Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='tags'>Tags</Label>
                <div className='flex flex-wrap gap-2 mb-3'>
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className='ml-1 rounded-full hover:bg-muted p-1'
                      >
                        <X className='h-3 w-3' />
                        <span className='sr-only'>Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <Input
                    id='tags'
                    placeholder='Add a tag'
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    type='button'
                    onClick={handleAddTag}
                    variant='outline'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='seo' className='space-y-6'>
            <Card>
              <CardContent className='pt-6'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='seo-title'>SEO Title</Label>
                    <Input
                      id='seo-title'
                      placeholder='SEO title (defaults to post title if empty)'
                      defaultValue={post.title}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='seo-description'>Meta Description</Label>
                    <Textarea
                      id='seo-description'
                      placeholder='Meta description for search engines'
                      defaultValue={post.excerpt}
                      rows={3}
                    />
                    <p className='text-xs text-muted-foreground'>
                      Recommended length: 150-160 characters
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='canonical-url'>Canonical URL</Label>
                    <Input
                      id='canonical-url'
                      placeholder='https://yoursite.com/blog/post-slug'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
