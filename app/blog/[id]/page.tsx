'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
  User,
  Copy,
  Check,
  ExternalLink,
  Github,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { toast } from '@/hooks/use-toast';
import type { JSX } from 'react/jsx-runtime'; // Import JSX to fix the undeclared variable error

// Mock blog data with markdown-style content
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
        {
          type: 'header',
          level: 3,
          content: '1. Improved App Router',
        },
        {
          type: 'list',
          items: [
            'Enhanced routing capabilities',
            'Improved server components',
            'Better error handling',
            'Optimized performance',
          ],
        },
        {
          type: 'header',
          level: 3,
          content: '2. Turbopack Improvements',
        },
        {
          type: 'list',
          items: [
            'Faster build times',
            'Better hot reload performance',
            'Improved memory usage',
            'Enhanced development experience',
          ],
        },
        {
          type: 'header',
          level: 2,
          content: '📦 Installation',
        },
        {
          type: 'paragraph',
          content:
            'To create a new Next.js 15 project, run the following command:',
        },
        {
          type: 'code',
          language: 'bash',
          content: `npx create-next-app@latest my-app
cd my-app
npm run dev`,
        },
        {
          type: 'header',
          level: 2,
          content: '🔧 Configuration',
        },
        {
          type: 'paragraph',
          content:
            'Configure your Next.js application with the following settings:',
        },
        {
          type: 'code',
          language: 'javascript',
          filename: 'next.config.js',
          content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['example.com']
  }
}

module.exports = nextConfig`,
        },
        {
          type: 'header',
          level: 2,
          content: '🏗️ Project Structure',
        },
        {
          type: 'code',
          language: 'text',
          content: `my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── components/
├── public/
├── package.json
└── next.config.js`,
        },
        {
          type: 'header',
          level: 2,
          content: '⚡ Key Features',
        },
        {
          type: 'header',
          level: 3,
          content: 'Server Components',
        },
        {
          type: 'paragraph',
          content:
            'Server Components allow you to render components on the server, reducing the JavaScript bundle size and improving performance.',
        },
        {
          type: 'code',
          language: 'tsx',
          filename: 'app/page.tsx',
          content: `// Server Component (default)
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <div>
      <h1>My Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}`,
        },
        {
          type: 'header',
          level: 3,
          content: 'Client Components',
        },
        {
          type: 'paragraph',
          content: "Use the 'use client' directive for interactive components:",
        },
        {
          type: 'code',
          language: 'tsx',
          filename: 'components/counter.tsx',
          content: `'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`,
        },
        {
          type: 'header',
          level: 2,
          content: '📚 Best Practices',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Use Server Components by default** - Only use Client Components when necessary',
            '**Optimize your images** - Use the built-in Image component',
            '**Implement proper error boundaries** - Handle errors gracefully',
            '**Follow the recommended file structure** - Keep your code organized',
            '**Use TypeScript** - Better development experience and fewer bugs',
          ],
        },
        {
          type: 'header',
          level: 2,
          content: '🔗 Useful Links',
        },
        {
          type: 'links',
          items: [
            { text: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
            { text: 'App Router Guide', url: 'https://nextjs.org/docs/app' },
            {
              text: 'GitHub Repository',
              url: 'https://github.com/vercel/next.js',
            },
            { text: 'Vercel Deployment', url: 'https://vercel.com' },
          ],
        },
        {
          type: 'header',
          level: 2,
          content: '🎯 Conclusion',
        },
        {
          type: 'paragraph',
          content:
            "Next.js 15 represents a significant step forward in web development. With its improved performance, better developer experience, and powerful features, it's an excellent choice for building modern web applications.",
        },
        {
          type: 'paragraph',
          content:
            'Start exploring these features today and see how they can improve your development workflow!',
        },
      ],
    },
    author: 'Your Name',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    image: '/placeholder.svg?height=400&width=800',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of Clean Code: Best Practices for Developers',
    excerpt:
      'Learn essential principles and practices for writing maintainable, readable, and efficient code that your future self will thank you for.',
    content: {
      sections: [
        {
          type: 'header',
          level: 1,
          content: 'The Art of Clean Code: Best Practices for Developers',
        },
        {
          type: 'paragraph',
          content:
            "Writing clean code is an art that every developer should master. Clean code is not just about making your code work; it's about making it readable, maintainable, and efficient.",
        },
        {
          type: 'header',
          level: 2,
          content: '🤔 What is Clean Code?',
        },
        {
          type: 'paragraph',
          content:
            'Clean code is code that is easy to read, understand, and modify. It follows consistent patterns and conventions, making it accessible to other developers (including your future self).',
        },
        {
          type: 'header',
          level: 2,
          content: '🎯 Key Principles',
        },
        {
          type: 'header',
          level: 3,
          content: '1. Meaningful Names',
        },
        {
          type: 'paragraph',
          content:
            'Use descriptive and meaningful names for variables, functions, and classes.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// ❌ Bad
const d = new Date();
const u = users.filter(u => u.a);

// ✅ Good
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);`,
        },
        {
          type: 'header',
          level: 3,
          content: '2. Functions Should Do One Thing',
        },
        {
          type: 'paragraph',
          content:
            'Each function should have a single responsibility and do it well.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// ❌ Bad - Function does too many things
function processUser(user) {
  // Validate user
  if (!user.email) throw new Error('Email required');
  
  // Save to database
  database.save(user);
  
  // Send email
  emailService.send(user.email, 'Welcome!');
  
  // Log activity
  logger.log('User processed');
}

// ✅ Good - Separate concerns
function validateUser(user) {
  if (!user.email) throw new Error('Email required');
}

function saveUser(user) {
  return database.save(user);
}

function sendWelcomeEmail(email) {
  return emailService.send(email, 'Welcome!');
}

function logUserActivity(action) {
  logger.log(\`User \${action}\`);
}`,
        },
        {
          type: 'header',
          level: 2,
          content: '📋 Best Practices Checklist',
        },
        {
          type: 'list',
          items: [
            '✅ **Write self-documenting code** - Code should be readable without extensive comments',
            '✅ **Use version control effectively** - Make meaningful commits with clear messages',
            '✅ **Test your code** - Write tests to ensure your code works as expected',
            '✅ **Refactor regularly** - Continuously improve your code structure',
            '✅ **Follow consistent formatting** - Use tools like Prettier and ESLint',
            '✅ **Handle errors gracefully** - Implement proper error handling',
            '✅ **Avoid deep nesting** - Use early returns and guard clauses',
          ],
        },
        {
          type: 'header',
          level: 2,
          content: '🛠️ Tools for Clean Code',
        },
        {
          type: 'list',
          items: [
            '**ESLint** - Identify and fix JavaScript problems',
            '**Prettier** - Automatic code formatting',
            '**SonarQube** - Code quality analysis',
            '**Husky** - Git hooks for quality checks',
            '**Jest** - JavaScript testing framework',
          ],
        },
        {
          type: 'header',
          level: 2,
          content: '💡 Conclusion',
        },
        {
          type: 'paragraph',
          content:
            "Clean code is an investment in your future productivity and the success of your projects. Start implementing these practices today, and you'll see immediate improvements in code quality and team collaboration.",
        },
      ],
    },
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
    image: '/placeholder.svg?height=400&width=800',
    featured: false,
  },
  {
    id: 3,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt:
      'Master the utility-first CSS framework and create beautiful, responsive user interfaces with Tailwind CSS.',
    content: {
      sections: [
        {
          type: 'header',
          level: 1,
          content: 'Building Responsive UIs with Tailwind CSS',
        },
        {
          type: 'paragraph',
          content:
            'Tailwind CSS has revolutionized how we approach styling in modern web development. This utility-first CSS framework provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.',
        },
        {
          type: 'header',
          level: 2,
          content: '🎨 Why Tailwind CSS?',
        },
        {
          type: 'header',
          level: 3,
          content: 'Utility-First Approach',
        },
        {
          type: 'paragraph',
          content:
            'Instead of writing custom CSS, you compose designs using utility classes:',
        },
        {
          type: 'code',
          language: 'html',
          content: `<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
  <h2 class="text-xl font-bold mb-2">Card Title</h2>
  <p class="text-blue-100">Card content goes here.</p>
  <button class="mt-4 bg-white text-blue-500 px-4 py-2 rounded font-medium hover:bg-gray-100">
    Learn More
  </button>
</div>`,
        },
        {
          type: 'header',
          level: 3,
          content: 'Responsive Design Made Easy',
        },
        {
          type: 'paragraph',
          content:
            'Tailwind makes responsive design intuitive with breakpoint prefixes:',
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Mobile first approach -->
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
  <img class="w-full h-48 md:h-64 object-cover rounded-lg" src="image.jpg" alt="Responsive image">
  <h3 class="text-lg md:text-xl lg:text-2xl font-bold mt-4">Responsive Title</h3>
  <p class="text-sm md:text-base text-gray-600 mt-2">Responsive description text.</p>
</div>`,
        },
        {
          type: 'header',
          level: 2,
          content: '🚀 Getting Started',
        },
        {
          type: 'header',
          level: 3,
          content: 'Installation',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p`,
        },
        {
          type: 'header',
          level: 3,
          content: 'Configuration',
        },
        {
          type: 'code',
          language: 'javascript',
          filename: 'tailwind.config.js',
          content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`,
        },
        {
          type: 'header',
          level: 2,
          content: '🎯 Best Practices',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Use component extraction** - Extract repeated patterns into components',
            '**Customize your design system** - Extend the default theme to match your brand',
            '**Use @apply for complex components** - When utility classes become unwieldy',
            '**Optimize for production** - Use PurgeCSS to remove unused styles',
            '**Follow mobile-first approach** - Design for mobile, then enhance for larger screens',
          ],
        },
        {
          type: 'header',
          level: 2,
          content: '🔧 Advanced Features',
        },
        {
          type: 'header',
          level: 3,
          content: 'Custom Components with @apply',
        },
        {
          type: 'code',
          language: 'css',
          filename: 'styles/components.css',
          content: `@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}`,
        },
        {
          type: 'header',
          level: 3,
          content: 'Dark Mode Implementation',
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Dark mode classes -->
<div class="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen">
  <header class="bg-gray-100 dark:bg-gray-900 p-4">
    <h1 class="text-2xl font-bold">My App</h1>
  </header>
  
  <main class="p-6">
    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <p class="text-gray-700 dark:text-gray-300">
        Content that adapts to dark mode
      </p>
    </div>
  </main>
</div>`,
        },
        {
          type: 'header',
          level: 2,
          content: '📱 Responsive Breakpoints',
        },
        {
          type: 'code',
          language: 'text',
          content: `sm:   640px  @media (min-width: 640px)
md:   768px  @media (min-width: 768px)
lg:   1024px @media (min-width: 1024px)
xl:   1280px @media (min-width: 1280px)
2xl:  1536px @media (min-width: 1536px)`,
        },
        {
          type: 'header',
          level: 2,
          content: '🎉 Conclusion',
        },
        {
          type: 'paragraph',
          content:
            "Tailwind CSS empowers developers to build beautiful, responsive interfaces quickly and efficiently. Its utility-first approach might feel different at first, but once you embrace it, you'll find it incredibly productive.",
        },
        {
          type: 'paragraph',
          content:
            'Start building with Tailwind today and experience the difference in your development workflow!',
        },
      ],
    },
    author: 'Your Name',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Responsive Design', 'UI/UX'],
    image: '/placeholder.svg?height=400&width=800',
    featured: true,
  },
];

// Code block component with copy functionality
function CodeBlock({
  content,
  language,
  filename,
}: {
  content: string;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Code copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className='relative group'>
      {filename && (
        <div className='flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg border-b border-gray-700'>
          <span className='font-mono'>{filename}</span>
          <Badge variant='secondary' className='text-xs'>
            {language}
          </Badge>
        </div>
      )}
      <div className='relative'>
        <pre
          className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm ${
            filename ? 'rounded-t-none' : ''
          } rounded-lg`}
        >
          <code className={`language-${language}`}>{content}</code>
        </pre>
        <Button
          variant='ghost'
          size='sm'
          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className='h-4 w-4' />
          ) : (
            <Copy className='h-4 w-4' />
          )}
        </Button>
      </div>
    </div>
  );
}

// Content renderer component
function ContentRenderer({ sections }: { sections: any[] }) {
  return (
    <div className='space-y-6'>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'header':
            const HeaderTag =
              `h${section.level}` as keyof JSX.IntrinsicElements;
            const headerClasses = {
              1: 'text-4xl font-bold mb-6 border-b border-border pb-4',
              2: 'text-2xl font-bold mb-4 mt-8',
              3: 'text-xl font-semibold mb-3 mt-6',
            };
            return (
              <HeaderTag
                key={index}
                className={
                  headerClasses[section.level as keyof typeof headerClasses]
                }
              >
                {section.content}
              </HeaderTag>
            );

          case 'paragraph':
            return (
              <p key={index} className='text-muted-foreground leading-relaxed'>
                {section.content}
              </p>
            );

          case 'list':
            const ListTag = section.ordered ? 'ol' : 'ul';
            return (
              <ListTag
                key={index}
                className={`space-y-2 ${
                  section.ordered ? 'list-decimal' : 'list-disc'
                } list-inside ml-4`}
              >
                {section.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className='text-muted-foreground'>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ListTag>
            );

          case 'code':
            return (
              <CodeBlock
                key={index}
                content={section.content}
                language={section.language}
                filename={section.filename}
              />
            );

          case 'links':
            return (
              <div key={index} className='space-y-2'>
                {section.items.map((link: any, linkIndex: number) => (
                  <div key={linkIndex} className='flex items-center gap-2'>
                    <ExternalLink className='h-4 w-4 text-primary' />
                    <a
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline'
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// Related posts component
function RelatedPosts({
  currentPostId,
  currentPostTags,
}: {
  currentPostId: number;
  currentPostTags: string[];
}) {
  const relatedPosts = blogPosts
    .filter((post) => post.id !== currentPostId)
    .filter((post) => post.tags.some((tag) => currentPostTags.includes(tag)))
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className='mt-16'>
      <h2 className='text-2xl font-bold mb-8'>Related Posts</h2>
      <div className='grid md:grid-cols-3 gap-6'>
        {relatedPosts.map((post) => (
          <Card
            key={post.id}
            className='overflow-hidden group hover:shadow-lg transition-shadow'
          >
            <div className='relative aspect-video overflow-hidden'>
              <img
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <CardContent className='p-4'>
              <Badge variant='secondary' className='mb-2'>
                {post.category}
              </Badge>
              <h3 className='font-bold mb-2 group-hover:text-primary transition-colors'>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              <p className='text-sm text-muted-foreground mb-3'>
                {post.excerpt.slice(0, 100)}...
              </p>
              <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                <Calendar className='h-3 w-3' />
                {new Date(post.date).toLocaleDateString()}
                <Clock className='h-3 w-3 ml-2' />
                {post.readTime}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<(typeof blogPosts)[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const foundPost = blogPosts.find(
        (p) => p.id === Number.parseInt(params.id as string)
      );
      setPost(foundPost || null);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <div className='pt-16 flex items-center justify-center min-h-[50vh]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <div className='pt-16 flex items-center justify-center min-h-[50vh]'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold mb-4'>Post Not Found</h1>
            <p className='text-muted-foreground mb-6'>
              The blog post you're looking for doesn't exist.
            </p>
            <div className='flex gap-4 justify-center'>
              <Button asChild>
                <Link href='/blog'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Blog
                </Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/'>Back to Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      <div className='pt-16'>
        <article className='py-12 px-4'>
          <div className='container max-w-4xl mx-auto'>
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className='mb-8 flex gap-4'
            >
              <Button variant='ghost' asChild>
                <Link href='/blog'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Blog
                </Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/'>Portfolio</Link>
              </Button>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='mb-8'
            >
              <Badge variant='secondary' className='mb-4'>
                {post.category}
              </Badge>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                {post.title}
              </h1>

              <div className='flex flex-wrap items-center gap-6 text-muted-foreground mb-6'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  <span>{post.author}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span>{post.readTime}</span>
                </div>
                <Button variant='ghost' size='sm'>
                  <Share2 className='h-4 w-4 mr-2' />
                  Share
                </Button>
              </div>

              <div className='flex flex-wrap gap-2 mb-8'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'
                  >
                    <Tag className='h-3 w-3' />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='mb-12'
            >
              <div className='relative aspect-video rounded-lg overflow-hidden'>
                <img
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  className='object-cover w-full h-full'
                />
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='mb-12'
            >
              <ContentRenderer sections={post.content.sections} />
            </motion.div>

            <Separator className='my-12' />

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='mb-12'
            >
              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-16 h-16 rounded-full overflow-hidden flex-shrink-0'>
                      <img
                        src='/placeholder.svg?height=64&width=64'
                        alt={post.author}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold mb-2'>
                        About {post.author}
                      </h3>
                      <p className='text-muted-foreground'>
                        A passionate web developer with expertise in modern web
                        technologies. I love sharing knowledge and helping
                        others learn through practical examples and tutorials.
                      </p>
                      <div className='flex gap-2 mt-3'>
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href='https://github.com'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Github className='h-4 w-4 mr-2' />
                            GitHub
                          </a>
                        </Button>
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href='https://twitter.com'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='h-4 w-4 mr-2' />
                            Twitter
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <RelatedPosts
                currentPostId={post.id}
                currentPostTags={post.tags}
              />
            </motion.div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
