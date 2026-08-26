import { useState } from 'react';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  TrendingUp,
  ChevronRight,
  Phone,
  Star,
  Quote,
} from 'lucide-react';
import {
  categories,
  popularTopics,
  supportTopics,
  customerReviews,
  type Page,
  type SupportCategory,
  type CustomerReview,
} from '@/data/supportData';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onCategorySelect: (categoryId: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function HomePage({
  onNavigate,
  onCategorySelect,
  onSearch,
  searchQuery,
}: HomePageProps) {
  const [zipCode, setZipCode] = useState('');
  const [outageStatus, setOutageStatus] = useState<'idle' | 'checking' | 'clear' | 'outage'>('idle');
  const [heroSearch, setHeroSearch] = useState(searchQuery);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length < 5) return;
    setOutageStatus('checking');
    setTimeout(() => {
      setOutageStatus('clear');
    }, 2000);
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(heroSearch);
  };

  const handlePopularTopicClick = (topicId: string) => {
    const topic = supportTopics.find((t) => t.articles.some((a) => a.id === topicId));
    if (topic) {
      onCategorySelect(topic.categoryId);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        {/* Background glow effect */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
          <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-accent-blue/5 blur-3xl" />
        </div>

        <div className="section-container relative py-16 text-center md:py-24">
          <span className="mb-4 inline-block rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 px-4 py-1.5 text-xs font-medium text-xfinity-gray-300">
            24/7 Support & Troubleshooting
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            We're here to help
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-xfinity-gray-300">
            Find answers, troubleshoot issues, and manage your Xfinity services — all in one place.
          </p>

          {/* Large search bar */}
          <form onSubmit={handleHeroSearch} className="mx-auto mt-8 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-xfinity-gray-400" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="What can we help you with today?"
                className="w-full rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 py-4 pl-14 pr-32 text-base text-white placeholder-xfinity-gray-400 transition-all duration-200 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-red-hover active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-xfinity-gray-500">
            Try searching for "restart modem," "pay bill," or "WiFi password"
          </p>

          {/* Call us CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <span className="text-sm text-xfinity-gray-400">Prefer to talk to someone?</span>
            <a
              href="tel:+18662403377"
              className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-brand-red hover:bg-brand-red/20"
            >
              <Phone className="h-4 w-4 text-brand-red" />
              Call (+1) 866-240-3377
            </a>
          </div>
        </div>
      </section>

      {/* Outage Status Banner */}
      <section className="section-container py-8">
        <div className="card flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-xfinity-gray-800 p-3">
              <MapPin className="h-6 w-6 text-brand-red" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Check for service outages</h2>
              <p className="mt-1 text-sm text-xfinity-gray-400">
                Enter your ZIP code to see if there are any reported outages in your area.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <form onSubmit={handleZipCheck} className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="ZIP code"
                className="w-full rounded-xl border border-xfinity-gray-600 bg-xfinity-gray-850 px-4 py-2.5 text-sm text-white placeholder-xfinity-gray-400 focus:border-brand-red focus:outline-none md:w-32"
              />
              <button
                type="submit"
                disabled={zipCode.length < 5}
                className="shrink-0 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-red-hover disabled:opacity-50"
              >
                Check
              </button>
            </form>

            <button
              onClick={() => onNavigate('outage')}
              className="text-sm font-medium text-xfinity-gray-300 hover:text-white"
            >
              View map →
            </button>
          </div>
        </div>

        {/* Outage status result */}
        {outageStatus === 'checking' && (
          <div className="mt-4 animate-slide-down flex items-center gap-3 rounded-xl border border-xfinity-gray-600 bg-xfinity-gray-850 p-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-xfinity-gray-500 border-t-brand-red" />
            <span className="text-sm text-xfinity-gray-300">Checking your area for outages...</span>
          </div>
        )}
        {outageStatus === 'clear' && (
          <div className="mt-4 animate-slide-down flex items-center gap-3 rounded-xl border border-accent-green/30 bg-accent-green/10 p-4">
            <CheckCircle2 className="h-5 w-5 text-accent-green-light" />
            <span className="text-sm text-accent-green-light">
              No reported outages in ZIP {zipCode}. Your services should be working normally.
            </span>
          </div>
        )}
      </section>

      {/* Category Cards Grid */}
      <section className="section-container py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">How can we help?</h2>
            <p className="mt-2 text-sm text-xfinity-gray-400">
              Select a category below to find articles, guides, and troubleshooting steps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: SupportCategory, idx) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="card card-hover group flex flex-col items-start p-6 text-left animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div
                className={`mb-4 rounded-xl bg-gradient-to-br ${category.color} p-3 transition-transform duration-300 group-hover:scale-110`}
              >
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-brand-red-light">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-xfinity-gray-400">{category.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-red">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Topics */}
      <section className="section-container py-12">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-red" />
          <h2 className="text-2xl font-bold text-white">Popular topics</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {popularTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handlePopularTopicClick(topic.id)}
              className="card card-hover group flex items-center gap-4 p-4 text-left"
            >
              <div className="rounded-lg bg-xfinity-gray-800 p-2.5">
                <topic.icon className="h-5 w-5 text-xfinity-gray-300 group-hover:text-brand-red" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white transition-colors group-hover:text-brand-red-light">
                  {topic.title}
                </p>
                <p className="text-xs text-xfinity-gray-500">{topic.category}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-xfinity-gray-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-red" />
            </button>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-container py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-brand-red text-brand-red" />
            <h2 className="text-2xl font-bold text-white md:text-3xl">What our customers say</h2>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-accent-yellow text-accent-yellow" />
              ))}
            </div>
            <p className="text-sm text-xfinity-gray-400">
              4.7 out of 5 · Based on 12,847 customer reviews
            </p>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customerReviews.map((review: CustomerReview, idx) => (
            <div
              key={review.id}
              className="card card-hover flex flex-col p-6 animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Quote icon */}
              <Quote className="mb-3 h-7 w-7 text-xfinity-gray-700" />

              {/* Rating */}
              <div className="mb-3 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-accent-yellow text-accent-yellow'
                        : 'fill-xfinity-gray-700 text-xfinity-gray-700'
                    }`}
                  />
                ))}
                <span className="ml-2 rounded-full bg-xfinity-gray-800 px-2 py-0.5 text-xs font-medium text-xfinity-gray-400">
                  {review.serviceType}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-sm font-semibold text-white">{review.title}</h3>

              {/* Review text */}
              <p className="flex-1 text-sm leading-relaxed text-xfinity-gray-300">{review.text}</p>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 border-t border-xfinity-gray-700 pt-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.avatarColor} text-sm font-bold text-white`}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{review.name}</p>
                  <p className="text-xs text-xfinity-gray-500">
                    {review.location} · {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Status Legend */}
      <section className="section-container py-8">
        <div className="card p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Service Status Legend</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent-green-light" />
              <div>
                <p className="text-sm font-medium text-white">Good Service</p>
                <p className="text-xs text-xfinity-gray-500">No issues reported</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-accent-yellow" />
              <div>
                <p className="text-sm font-medium text-white">Degraded</p>
                <p className="text-xs text-xfinity-gray-500">Intermittent issues possible</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-brand-red" />
              <div>
                <p className="text-sm font-medium text-white">Outage</p>
                <p className="text-xs text-xfinity-gray-500">Service unavailable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
