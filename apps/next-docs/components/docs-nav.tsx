'use client';

import { Github, Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

import SearchDialog from '@/components/search';

export default function DocsNav() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const params = useParams();
  const pathname = usePathname();
  const currentLang = (params?.lang as string) || 'en';

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const switchLanguage = (lang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    window.location.href = newPath;
  };

  const navItems = [
    {
      label: currentLang === 'cn' ? '首页' : 'Home',
      href: `/${currentLang}`
    },
    {
      label: currentLang === 'cn' ? '文档' : 'Documentation',
      href: `/${currentLang}/docs`
    },
    {
      label: currentLang === 'cn' ? '组件' : 'Components',
      href: `/${currentLang}/docs/components`
    }
  ];

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              className="flex items-center space-x-2"
              href={`/${currentLang}`}
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-lg from-blue-500 to-purple-600 bg-gradient-to-br">
                <span className="text-sm text-white font-bold">N</span>
              </div>
              <span className="text-xl text-foreground font-bold">Nova UI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map(item => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <select
                className="border border-border rounded-md bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={currentLang}
                onChange={e => switchLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="cn">中文</option>
              </select>
            </div>

            {/* Search */}
            <button
              className="border border-border rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
              onClick={() => setOpen(true)}
            >
              {currentLang === 'cn' ? '搜索...' : 'Search...'}
            </button>

            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              className="rounded-md p-2 transition-colors hover:bg-accent"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* GitHub Link */}
            <Link
              aria-label="GitHub"
              className="rounded-md p-2 transition-colors hover:bg-accent"
              href="https://github.com/Rascal-Coder/Novaui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </Link>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              className="rounded-md p-2 transition-colors md:hidden hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="border-t px-2 pb-3 pt-2 space-y-1 sm:px-3">
              {navItems.map(item => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
      />
    </nav>
  );
}
