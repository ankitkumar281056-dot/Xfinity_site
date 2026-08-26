import {
  Home,
  ChevronRight,
  Clock,
  ArrowRight,
  Phone,
  BookOpen,
} from 'lucide-react';
import { blogPosts, type Page, type BlogPost } from '@/data/supportData';

interface BlogListPageProps {
  onNavigate: (page: Page) => void;
  onBlogPostSelect: (postId: string) => void;
}

export function BlogListPage({ onNavigate, onBlogPostSelect }: BlogListPageProps) {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-xfinity-gray-700 bg-xfinity-gray-950">
        <div className="section-container flex items-center gap-2 py-3 text-sm text-xfinity-gray-400">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            Support
          </button>
          <ChevronRight className="h-4 w-4 text-xfinity-gray-600" />
          <span className="text-white">Blog</span>
        </div>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />
        </div>
        <div className="section-container relative py-12 md:py-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 px-4 py-1.5 text-xs font-medium text-xfinity-gray-300">
            <BookOpen className="h-3.5 w-3.5 text-brand-red" />
            Xfinity Support Blog
          </span>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Guides, tips, and answers from the Xfinity support team
          </h1>
          <p className="mt-4 max-w-xl text-base text-xfinity-gray-300">
            Practical advice on troubleshooting, billing, account management, and getting the most out of your Xfinity services.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="section-container py-10">
        <button
          onClick={() => onBlogPostSelect(featured.id)}
          className="card card-hover group flex w-full flex-col overflow-hidden text-left md:flex-row animate-slide-up"
        >
          <div className="flex shrink-0 items-center justify-center bg-gradient-to-br from-brand-red/20 to-xfinity-gray-900 p-12 md:w-2/5 md:p-16">
            <div className="rounded-2xl bg-gradient-to-br from-brand-red to-brand-red-dark p-5">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center p-6 md:p-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-brand-red/15 px-3 py-1 text-xs font-medium text-brand-red-light">
                Featured
              </span>
              <span className="text-xs text-xfinity-gray-500">{featured.category}</span>
            </div>
            <h2 className="text-xl font-bold text-white transition-colors group-hover:text-brand-red-light md:text-2xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-xfinity-gray-400">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs text-xfinity-gray-500">
              <span className="font-medium text-xfinity-gray-300">{featured.author}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {featured.readTime}
              </span>
              <span>{featured.date}</span>
            </div>
          </div>
        </button>
      </section>

      {/* All posts grid */}
      <section className="section-container pb-12">
        <h2 className="mb-6 text-xl font-bold text-white">All articles</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post: BlogPost, idx) => (
            <button
              key={post.id}
              onClick={() => onBlogPostSelect(post.id)}
              className="card card-hover group flex flex-col p-6 text-left animate-slide-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-xfinity-gray-800 px-3 py-1 text-xs font-medium text-xfinity-gray-400">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-xfinity-gray-500">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white transition-colors group-hover:text-brand-red-light">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-xfinity-gray-400">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-xfinity-gray-700 pt-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.avatarColor} text-xs font-bold text-white`}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-white">{post.author}</p>
                  <p className="text-xs text-xfinity-gray-500">{post.date}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-red">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Call CTA */}
      <section className="section-container pb-16">
        <div className="card flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-lg font-semibold text-white">Still need help?</h2>
          <p className="max-w-md text-sm text-xfinity-gray-400">
            Our support team is available 24/7 to help with any issue you are facing.
          </p>
          <a
            href="tel:+18662403377"
            className="btn-primary"
          >
            <Phone className="h-4 w-4" />
            Call (+1) 866-240-3377
          </a>
        </div>
      </section>
    </div>
  );
}
