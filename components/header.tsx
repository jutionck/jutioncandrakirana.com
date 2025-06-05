'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useMobile } from '@/hooks/use-mobile';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const pathname = usePathname();

  // Check if we're on the home page
  const isHomePage = pathname === '/';
  const isBlogPage = pathname?.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: isHomePage ? '#home' : '/' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Projects', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'Skills', href: isHomePage ? '#skills' : '/#skills' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If we're on home page and it's a hash link, use smooth scroll
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else if (!isHomePage && href.startsWith('/#')) {
      // If we're not on home page but link starts with /#, navigate to home then scroll
      // Let the default navigation happen, the home page will handle the scroll
      setIsMenuOpen(false);
    } else {
      // For regular navigation (like /blog), let default behavior happen
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b'
          : 'bg-transparent'
      }`}
    >
      <div className='container flex items-center justify-between h-16 px-4 md:px-6'>
        <Link
          href='/'
          className='text-xl font-bold hover:text-primary transition-colors'
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                (item.href === '/blog' && isBlogPage) ||
                (item.href === '/' && isHomePage && !isBlogPage)
                  ? 'text-primary'
                  : 'text-foreground/80'
              }`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-4 md:hidden'>
          <ThemeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className='fixed inset-0 top-16 bg-background/95 backdrop-blur-md z-40 p-6 border-t'>
          <nav className='flex flex-col gap-4'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium py-2 transition-colors hover:text-primary ${
                  (item.href === '/blog' && isBlogPage) ||
                  (item.href === '/' && isHomePage && !isBlogPage)
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
