'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  FileText,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMobile();

  // Simulate authentication check
  useEffect(() => {
    // In a real app, this would check for a valid session/token
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('cms_authenticated') === 'true';
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);

      if (!isLoggedIn && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('cms_authenticated');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className='h-5 w-5' />,
    },
    {
      name: 'Profile',
      href: '/admin/profile',
      icon: <User className='h-5 w-5' />,
    },
    {
      name: 'Content',
      href: '#',
      icon: <FileText className='h-5 w-5' />,
      children: [
        { name: 'Hero Section', href: '/admin/content/hero' },
        { name: 'About Section', href: '/admin/content/about' },
        { name: 'Projects', href: '/admin/content/projects' },
        { name: 'Skills', href: '/admin/content/skills' },
        { name: 'Blog Posts', href: '/admin/content/blog' },
      ],
    },
    {
      name: 'Contact',
      href: '/admin/contact',
      icon: <Mail className='h-5 w-5' />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings className='h-5 w-5' />,
    },
  ];

  // If loading or on login page, just render children
  if (isLoading || pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Router will redirect to login
  }

  return (
    <div className='min-h-screen bg-background flex'>
      {/* Sidebar for desktop */}
      <aside
        className={`
        fixed top-0 left-0 z-40 h-screen transition-transform bg-muted/50 border-r
        ${
          isMobile
            ? isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            : 'w-64 translate-x-0'
        }
      `}
      >
        <div className='h-full px-3 py-4 overflow-y-auto'>
          <div className='flex items-center justify-between mb-6 px-2'>
            <Link href='/admin' className='text-xl font-bold'>
              Portfolio CMS
            </Link>
            {isMobile && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className='h-5 w-5' />
              </Button>
            )}
          </div>

          <nav className='space-y-1'>
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='w-full justify-between'>
                      <span className='flex items-center'>
                        {item.icon}
                        <span className='ml-3'>{item.name}</span>
                      </span>
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className='w-56'
                    align='start'
                    side='right'
                  >
                    <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link
                          href={child.href}
                          className={`w-full ${
                            pathname === child.href
                              ? 'text-primary font-medium'
                              : ''
                          }`}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-2 py-2 rounded-md hover:bg-accent
                    ${
                      pathname === item.href
                        ? 'bg-accent text-primary font-medium'
                        : ''
                    }
                  `}
                >
                  {item.icon}
                  <span className='ml-3'>{item.name}</span>
                </Link>
              )
            )}
          </nav>

          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <Separator className='my-4' />
            <Button
              variant='ghost'
              className='w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/20'
              onClick={handleLogout}
            >
              <LogOut className='h-5 w-5 mr-2' />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${isMobile ? 'w-full' : 'ml-64'}`}>
        {/* Top bar */}
        <header className='bg-background border-b p-4 flex items-center justify-between sticky top-0 z-30'>
          {isMobile && (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className='h-5 w-5' />
            </Button>
          )}

          <div className='flex-1'>
            {isMobile && <h1 className='text-lg font-medium'>Portfolio CMS</h1>}
          </div>

          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <Button variant='outline' size='sm' asChild>
              <Link href='/' target='_blank'>
                View Site
              </Link>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
}
