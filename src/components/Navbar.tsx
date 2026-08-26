import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Menu, Phone } from 'lucide-react';
import type { Page } from '@/data/supportData';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'Support', page: 'home' },
  { label: 'Blog', page: 'blog' },
  { label: 'Outage Status', page: 'outage' },
  { label: 'My Account', page: 'account' },
  { label: 'Billing', page: 'billing' },
];

export function Navbar({ currentPage, onNavigate, onSearch, searchQuery }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    setSearchOpen(false);
    if (currentPage !== 'home') onNavigate('home');
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-xfinity-gray-700 bg-xfinity-black/95 backdrop-blur-md">
      <nav className="section-container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex shrink-0 items-center"
          aria-label="Xfinity Support Home"
        >
          <span className="text-2xl font-bold tracking-tight text-white">
            <span className="text-brand-red">x</span>finity
          </span>
          <span className="ml-1.5 text-xs font-medium uppercase tracking-wider text-xfinity-gray-400">
            Support
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                currentPage === link.page
                  ? 'bg-xfinity-gray-800 text-white'
                  : 'text-xfinity-gray-300 hover:bg-xfinity-gray-850 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side: phone + search + sign in */}
        <div className="flex items-center gap-2">
          {/* Toll-free number */}
          <a
            href="tel:+18662403377"
            className="hidden items-center gap-1.5 rounded-full border border-xfinity-gray-600 px-3 py-2 text-sm font-medium text-white transition-all hover:border-brand-red hover:text-brand-red-light xl:flex"
          >
            <Phone className="h-4 w-4 text-brand-red" />
            (+1) 866-240-3377
          </a>
          {/* Search button - expands inline */}
          <div className="hidden md:block">
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-xfinity-gray-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search support..."
                    className="w-56 rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 py-2 pl-9 pr-4 text-sm text-white placeholder-xfinity-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-2 text-xfinity-gray-400 hover:text-white"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-xfinity-gray-300 transition-colors hover:bg-xfinity-gray-850 hover:text-white"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </button>
            )}
          </div>

          {/* Sign In */}
          <button
            onClick={() => handleNavClick('account')}
            className="hidden rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-red-hover hover:shadow-lg hover:shadow-brand-red/30 active:scale-95 sm:block"
          >
            Sign In
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-xfinity-gray-300 transition-colors hover:bg-xfinity-gray-850 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="animate-slide-down border-t border-xfinity-gray-700 bg-xfinity-gray-950 lg:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            {/* Mobile search */}
            <form onSubmit={handleSearchSubmit} className="mb-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-xfinity-gray-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search support..."
                  className="w-full rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 py-2.5 pl-9 pr-4 text-sm text-white placeholder-xfinity-gray-400 focus:border-brand-red focus:outline-none"
                />
              </div>
            </form>

            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-xfinity-gray-800 text-white'
                    : 'text-xfinity-gray-300 hover:bg-xfinity-gray-850'
                }`}
              >
                {link.label}
              </button>
            ))}

            <a
              href="tel:+18662403377"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-xfinity-gray-600 py-3 text-sm font-medium text-white transition-colors hover:border-brand-red"
            >
              <Phone className="h-4 w-4 text-brand-red" />
              (+1) 866-240-3377
            </a>

            <button
              onClick={() => handleNavClick('account')}
              className="mt-2 rounded-lg bg-brand-red px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
