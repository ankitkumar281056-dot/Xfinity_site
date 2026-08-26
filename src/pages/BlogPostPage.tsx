import {
  Home,
  ChevronRight,
  Clock,
  ArrowLeft,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { blogPosts, type Page, type BlogSection } from '@/data/supportData';

interface BlogPostPageProps {
  postId: string;
  onNavigate: (page: Page) => void;
  onBlogPostSelect: (postId: string) => void;
}

export function BlogPostPage({ postId, onNavigate, onBlogPostSelect }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="section-container flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Article not found</h1>
        <p className="mt-2 text-sm text-xfinity-gray-400">
          The article you are looking for may have been moved or removed.
        </p>
        <button onClick={() => onNavigate('blog')} className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const renderSection = (section: BlogSection, idx: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <h2 key={idx} className="mt-8 mb-3 text-xl font-bold text-white md:text-2xl">
            {section.text}
          </h2>
        );
      case 'paragraph':
        return (
          <p key={idx} className="mb-4 leading-relaxed text-xfinity-gray-300">
            {section.text}
          </p>
        );
      case 'list':
        return (
          <ul key={idx} className="mb-4 space-y-2">
            {section.items?.map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-xfinity-gray-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                {item}
              </li>
            ))}
          </ul>
        );
      case 'numbered':
        return (
          <ol key={idx} className="mb-4 space-y-3">
            {section.items?.map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-xfinity-gray-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-xs font-bold text-brand-red-light">
                  {i + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        );
      case 'callout':
        return (
          <div
            key={idx}
            className="my-6 flex items-start gap-3 rounded-xl border border-brand-red/30 bg-brand-red/10 p-5"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
            <p className="text-sm leading-relaxed text-white">{section.text}</p>
          </div>
        );
      case 'quote':
        return (
          <blockquote
            key={idx}
            className="my-6 border-l-4 border-brand-red bg-xfinity-gray-850 py-4 pl-5 pr-4"
          >
            <p className="text-base italic leading-relaxed text-xfinity-gray-200">
              {section.text}
            </p>
          </blockquote>
        );
      default:
        return null;
    }
  };

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
          <button
            onClick={() => onNavigate('blog')}
            className="transition-colors hover:text-white"
          >
            Blog
          </button>
          <ChevronRight className="h-4 w-4 text-xfinity-gray-600" />
          <span className="line-clamp-1 text-white">{post.title}</span>
        </div>
      </div>

      {/* Article header */}
      <section className="border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        <div className="section-container py-10 md:py-14">
          <button
            onClick={() => onNavigate('blog')}
            className="mb-6 flex items-center gap-1.5 text-sm text-xfinity-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </button>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-red/15 px-3 py-1 text-xs font-medium text-brand-red-light">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-xfinity-gray-500">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            <span className="text-xs text-xfinity-gray-500">{post.date}</span>
          </div>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-xfinity-gray-300">{post.excerpt}</p>

          {/* Author */}
          <div className="mt-8 flex items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.avatarColor} text-base font-bold text-white`}
            >
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-xfinity-gray-500">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-container py-10 md:py-14">
        <article className="mx-auto max-w-3xl">
          {post.content.map((section, idx) => renderSection(section, idx))}
        </article>
      </section>

      {/* CTA */}
      <section className="section-container pb-12">
        <div className="card mx-auto flex max-w-3xl flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-lg font-semibold text-white">Need help right now?</h2>
          <p className="max-w-md text-sm text-xfinity-gray-400">
            Call our support team — we are available 24/7 to resolve your issue.
          </p>
          <a href="tel:+18662403377" className="btn-primary">
            <Phone className="h-4 w-4" />
            Call (+1) 866-240-3377
          </a>
        </div>
      </section>

      {/* Related posts */}
      <section className="section-container pb-16">
        <h2 className="mb-6 text-xl font-bold text-white">Related articles</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {relatedPosts.map((rel) => (
            <button
              key={rel.id}
              onClick={() => onBlogPostSelect(rel.id)}
              className="card card-hover group flex flex-col p-5 text-left"
            >
              <span className="mb-3 rounded-full bg-xfinity-gray-800 px-3 py-1 text-xs font-medium text-xfinity-gray-400">
                {rel.category}
              </span>
              <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-brand-red-light">
                {rel.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-xfinity-gray-400">
                {rel.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-red">
                Read
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
