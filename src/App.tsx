import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { HomePage } from '@/pages/HomePage';
import { TopicPage } from '@/pages/TopicPage';
import { OutagePage } from '@/pages/OutagePage';
import { AccountPage } from '@/pages/AccountPage';
import { BillingPage } from '@/pages/BillingPage';
import { SearchPage } from '@/pages/SearchPage';
import { BlogListPage } from '@/pages/BlogListPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { blogPosts, type Page } from '@/data/supportData';

const VALID_PAGES: Page[] = ['home', 'topic', 'outage', 'account', 'billing', 'search', 'blog', 'blog-post'];
const BLOG_IDS = blogPosts.map((p) => p.id);
const CATEGORY_IDS = ['internet', 'tv', 'mobile', 'home-phone', 'billing', 'assistant'];

interface RouteState {
  page: Page;
  category: string;
  blogPost: string;
  searchQuery: string;
}

function parsePath(pathname: string, search: string): RouteState {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath ? cleanPath.split('/') : [];

  if (segments.length === 0) {
    return { page: 'home', category: '', blogPost: '', searchQuery: '' };
  }

  if (segments[0] === 'outage') {
    return { page: 'outage', category: '', blogPost: '', searchQuery: '' };
  }
  if (segments[0] === 'account') {
    return { page: 'account', category: '', blogPost: '', searchQuery: '' };
  }
  if (segments[0] === 'billing') {
    return { page: 'billing', category: '', blogPost: '', searchQuery: '' };
  }
  if (segments[0] === 'blog') {
    if (segments.length >= 2 && BLOG_IDS.includes(segments[1])) {
      return { page: 'blog-post', category: '', blogPost: segments[1], searchQuery: '' };
    }
    return { page: 'blog', category: '', blogPost: '', searchQuery: '' };
  }
  if (segments[0] === 'topic' && segments.length >= 2 && CATEGORY_IDS.includes(segments[1])) {
    return { page: 'topic', category: segments[1], blogPost: '', searchQuery: '' };
  }
  if (segments[0] === 'search') {
    const params = new URLSearchParams(search);
    return {
      page: 'search',
      category: '',
      blogPost: '',
      searchQuery: params.get('q') || '',
    };
  }

  return { page: 'home', category: '', blogPost: '', searchQuery: '' };
}

function buildPath(page: Page, category: string, blogPost: string, searchQuery: string): string {
  switch (page) {
    case 'home':
      return '/';
    case 'outage':
      return '/outage';
    case 'account':
      return '/account';
    case 'billing':
      return '/billing';
    case 'blog':
      return '/blog';
    case 'blog-post':
      return blogPost ? `/blog/${blogPost}` : '/blog';
    case 'topic':
      return category ? `/topic/${category}` : '/';
    case 'search':
      return searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : '/search';
    default:
      return '/';
  }
}

function App() {
  const initial = parsePath(window.location.pathname, window.location.search);
  const [currentPage, setCurrentPage] = useState<Page>(initial.page);
  const [selectedCategory, setSelectedCategory] = useState<string>(initial.category);
  const [searchQuery, setSearchQuery] = useState(initial.searchQuery);
  const [selectedBlogPost, setSelectedBlogPost] = useState<string>(initial.blogPost);

  const updateUrl = useCallback(
    (page: Page, category: string, blogPost: string, query: string) => {
      const path = buildPath(page, category, blogPost, query);
      if (path !== window.location.pathname + window.location.search) {
        window.history.pushState({ page, category, blogPost, query }, '', path);
      }
    },
    [],
  );

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state
        ? (e.state as RouteState)
        : parsePath(window.location.pathname, window.location.search);
      setCurrentPage(state.page);
      setSelectedCategory(state.category);
      setSelectedBlogPost(state.blogPost);
      setSearchQuery(state.searchQuery);
    };
    window.addEventListener('popstate', handlePopState);
    window.history.replaceState(
      { page: currentPage, category: selectedCategory, blogPost: selectedBlogPost, searchQuery },
      '',
      buildPath(currentPage, selectedCategory, selectedBlogPost, searchQuery),
    );
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback(
    (page: Page) => {
      setCurrentPage(page);
      if (page !== 'topic') setSelectedCategory('');
      if (page !== 'blog-post') setSelectedBlogPost('');
      if (page !== 'search') setSearchQuery('');
      updateUrl(page, page === 'topic' ? selectedCategory : '', '', '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedCategory, updateUrl],
  );

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      setCurrentPage('topic');
      updateUrl('topic', categoryId, '', '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateUrl],
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        setCurrentPage('search');
        updateUrl('search', '', '', query);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [updateUrl],
  );

  const handleBlogPostSelect = useCallback(
    (postId: string) => {
      setSelectedBlogPost(postId);
      setCurrentPage('blog-post');
      updateUrl('blog-post', '', postId, '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateUrl],
  );

  return (
    <div className="flex min-h-screen flex-col bg-xfinity-black">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onCategorySelect={handleCategorySelect}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
        )}
        {currentPage === 'topic' && (
          <TopicPage
            categoryId={selectedCategory}
            onNavigate={handleNavigate}
            onCategorySelect={handleCategorySelect}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        )}
        {currentPage === 'outage' && <OutagePage onNavigate={handleNavigate} />}
        {currentPage === 'account' && <AccountPage onNavigate={handleNavigate} />}
        {currentPage === 'billing' && <BillingPage onNavigate={handleNavigate} />}
        {currentPage === 'search' && (
          <SearchPage
            query={searchQuery}
            onNavigate={handleNavigate}
            onCategorySelect={handleCategorySelect}
            onSearch={handleSearch}
          />
        )}
        {currentPage === 'blog' && (
          <BlogListPage
            onNavigate={handleNavigate}
            onBlogPostSelect={handleBlogPostSelect}
          />
        )}
        {currentPage === 'blog-post' && (
          <BlogPostPage
            postId={selectedBlogPost}
            onNavigate={handleNavigate}
            onBlogPostSelect={handleBlogPostSelect}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <ChatWidget />
    </div>
  );
}

export default App;
