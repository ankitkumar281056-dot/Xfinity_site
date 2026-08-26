import { useState, useMemo } from 'react';
import {
  Search,
  Home,
  ChevronRight,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Check,
  ArrowLeft,
  FileQuestion,
} from 'lucide-react';
import {
  categories,
  supportTopics,
  type Page,
  type HelpArticle,
  type SupportTopic,
} from '@/data/supportData';

interface SearchPageProps {
  query: string;
  onNavigate: (page: Page) => void;
  onCategorySelect: (categoryId: string) => void;
  onSearch: (query: string) => void;
}

interface SearchResult {
  article: HelpArticle;
  topic: SupportTopic;
  categoryTitle: string;
}

export function SearchPage({
  query,
  onNavigate,
  onCategorySelect,
  onSearch,
}: SearchPageProps) {
  const [localQuery, setLocalQuery] = useState(query);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'yes' | 'no'>>({});

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    const found: SearchResult[] = [];
    for (const topic of supportTopics) {
      const cat = categories.find((c) => c.id === topic.categoryId);
      for (const article of topic.articles) {
        const inQuestion = article.question.toLowerCase().includes(lower);
        const inAnswer = article.answer.some((a) => a.toLowerCase().includes(lower));
        if (inQuestion || inAnswer) {
          found.push({ article, topic, categoryTitle: cat?.title ?? topic.categoryId });
        }
      }
    }
    return found;
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleFeedback = (id: string, response: 'yes' | 'no') => {
    setFeedback((prev) => ({ ...prev, [id]: response }));
  };

  const handleResultClick = (categoryId: string) => {
    onCategorySelect(categoryId);
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
          <span className="text-white">Search Results</span>
        </div>
      </div>

      {/* Search header */}
      <section className="border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        <div className="section-container py-10">
          <button
            onClick={() => onNavigate('home')}
            className="mb-4 flex items-center gap-1 text-sm text-xfinity-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support
          </button>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-xfinity-gray-400" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search support articles..."
                className="w-full rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 py-4 pl-14 pr-32 text-base text-white placeholder-xfinity-gray-400 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-red-hover active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-xfinity-gray-400">
            {results.length > 0
              ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
              : `No results found for "${query}"`}
          </p>
        </div>
      </section>

      {/* Results */}
      <div className="section-container py-8">
        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="rounded-2xl bg-xfinity-gray-850 p-6">
              <FileQuestion className="h-12 w-12 text-xfinity-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">No articles found</h2>
              <p className="mt-2 max-w-md text-sm text-xfinity-gray-400">
                We couldn't find anything matching "{query}". Try different keywords or browse
                categories below.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleResultClick(cat.id)}
                  className="flex items-center gap-2 rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 px-4 py-2 text-sm font-medium text-xfinity-gray-300 transition-all hover:border-brand-red hover:text-brand-red-light"
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((result, idx) => (
              <div
                key={`${result.topic.id}-${result.article.id}`}
                className="card overflow-hidden animate-slide-up"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {/* Article header */}
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <button
                    onClick={() => setExpandedId(
                      expandedId === result.article.id ? null : result.article.id
                    )}
                    className="flex-1 text-left"
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="rounded-full bg-xfinity-gray-800 px-2.5 py-0.5 text-xs font-medium text-xfinity-gray-400">
                        {result.categoryTitle}
                      </span>
                      <span className="text-xs text-xfinity-gray-500">{result.topic.title}</span>
                    </div>
                    <p className="text-sm font-medium text-white md:text-base">
                      {result.article.question}
                    </p>
                  </button>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => handleResultClick(result.topic.categoryId)}
                      className="rounded-lg border border-xfinity-gray-600 px-3 py-1.5 text-xs font-medium text-xfinity-gray-300 transition-colors hover:border-xfinity-gray-400 hover:text-white"
                    >
                      View Topic
                    </button>
                    <button
                      onClick={() => setExpandedId(
                        expandedId === result.article.id ? null : result.article.id
                      )}
                      className="rounded-lg p-1.5 text-xfinity-gray-400 transition-colors hover:text-white"
                      aria-label="Expand article"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          expandedId === result.article.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded content */}
                {expandedId === result.article.id && (
                  <div className="animate-slide-down border-t border-xfinity-gray-700 px-5 pb-5 pt-4">
                    <div className="space-y-3">
                      {result.article.answer.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className={`text-sm leading-relaxed ${
                            paragraph.match(/^\d+\./)
                              ? 'text-xfinity-gray-200 pl-4'
                              : 'text-xfinity-gray-300'
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Feedback */}
                    <div className="mt-6 flex items-center gap-4 border-t border-xfinity-gray-700 pt-4">
                      <span className="text-sm text-xfinity-gray-400">Was this helpful?</span>
                      {feedback[result.article.id] ? (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-accent-green-light">
                          <Check className="h-4 w-4" />
                          Thanks for your feedback!
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFeedback(result.article.id, 'yes')}
                            className="flex items-center gap-1.5 rounded-lg border border-xfinity-gray-600 px-3 py-1.5 text-xs font-medium text-xfinity-gray-300 transition-all hover:border-accent-green hover:text-accent-green-light"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            Yes
                          </button>
                          <button
                            onClick={() => handleFeedback(result.article.id, 'no')}
                            className="flex items-center gap-1.5 rounded-lg border border-xfinity-gray-600 px-3 py-1.5 text-xs font-medium text-xfinity-gray-300 transition-all hover:border-brand-red hover:text-brand-red-light"
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
