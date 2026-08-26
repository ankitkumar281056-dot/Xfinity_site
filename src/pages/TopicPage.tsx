import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Home,
  ThumbsUp,
  ThumbsDown,
  Check,
  ArrowLeft,
  Search,
} from 'lucide-react';
import {
  categories,
  supportTopics,
  type Page,
  type HelpArticle,
} from '@/data/supportData';

interface TopicPageProps {
  categoryId: string;
  onNavigate: (page: Page) => void;
  onCategorySelect: (categoryId: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export function TopicPage({
  categoryId,
  onNavigate,
  onCategorySelect,
  searchQuery,
  onSearch,
}: TopicPageProps) {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'yes' | 'no'>>({});
  const [localSearch, setLocalSearch] = useState('');

  const category = categories.find((c) => c.id === categoryId);
  const topics = supportTopics.filter((t) => t.categoryId === categoryId);

  const activeTopic = activeTopicId
    ? supportTopics.find((t) => t.id === activeTopicId)
    : topics[0];

  const filteredArticles = activeTopic
    ? localSearch
      ? activeTopic.articles.filter((a) =>
          a.question.toLowerCase().includes(localSearch.toLowerCase())
        )
      : activeTopic.articles
    : [];

  const handleArticleClick = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const handleFeedback = (articleId: string, response: 'yes' | 'no') => {
    setFeedback((prev) => ({ ...prev, [articleId]: response }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    onNavigate('home');
  };

  if (!category) {
    return (
      <div className="section-container flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-xfinity-gray-300">Category not found.</p>
        <button onClick={() => onNavigate('home')} className="btn-primary mt-4">
          Back to Support
        </button>
      </div>
    );
  }

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
          <span className="text-white">{category.title}</span>
        </div>
      </div>

      {/* Category Header */}
      <section className={`relative overflow-hidden bg-gradient-to-r ${category.color}`}>
        <div className="section-container relative py-10">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
              <category.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">{category.title}</h1>
              <p className="mt-1 text-sm text-white/80">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content with sidebar */}
      <div className="section-container grid grid-cols-1 gap-8 py-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
            Topics
          </h2>
          <div className="flex flex-col gap-1">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setActiveTopicId(topic.id);
                  setExpandedArticle(null);
                }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  activeTopic?.id === topic.id
                    ? 'bg-xfinity-gray-800 text-white'
                    : 'text-xfinity-gray-300 hover:bg-xfinity-gray-850 hover:text-white'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          {/* Sidebar category switcher */}
          <div className="mt-8 border-t border-xfinity-gray-700 pt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
              Other Categories
            </h2>
            <div className="flex flex-col gap-1">
              {categories
                .filter((c) => c.id !== categoryId)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onCategorySelect(cat.id);
                      setActiveTopicId(null);
                      setExpandedArticle(null);
                    }}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-xfinity-gray-300 transition-colors hover:bg-xfinity-gray-850 hover:text-white"
                  >
                    <cat.icon className="h-4 w-4 text-xfinity-gray-500" />
                    {cat.title}
                  </button>
                ))}
            </div>
          </div>
        </aside>

        {/* Article list */}
        <div className="min-w-0">
          {activeTopic && (
            <>
              {/* Topic title and search */}
              <div className="mb-6">
                <button
                  onClick={() => onNavigate('home')}
                  className="mb-3 flex items-center gap-1 text-sm text-xfinity-gray-400 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Support
                </button>
                <h2 className="text-xl font-bold text-white md:text-2xl">{activeTopic.title}</h2>
                <p className="mt-1 text-sm text-xfinity-gray-400">{activeTopic.description}</p>

                {/* Search within topic */}
                <form onSubmit={handleSearchSubmit} className="mt-4">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-xfinity-gray-400" />
                    <input
                      type="text"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      placeholder="Search within this topic..."
                      className="w-full rounded-xl border border-xfinity-gray-600 bg-xfinity-gray-850 py-3 pl-10 pr-4 text-sm text-white placeholder-xfinity-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    />
                  </div>
                </form>
              </div>

              {/* Articles */}
              <div className="flex flex-col gap-3">
                {filteredArticles.length === 0 ? (
                  <div className="card p-8 text-center">
                    <p className="text-sm text-xfinity-gray-400">
                      No articles found matching "{localSearch}". Try a different search term.
                    </p>
                  </div>
                ) : (
                  filteredArticles.map((article: HelpArticle, idx) => (
                    <div
                      key={article.id}
                      className="card overflow-hidden animate-slide-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {/* Article header - clickable */}
                      <button
                        onClick={() => handleArticleClick(article.id)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-xfinity-gray-850"
                      >
                        <span className="text-sm font-medium text-white md:text-base">
                          {article.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-xfinity-gray-400 transition-transform duration-300 ${
                            expandedArticle === article.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Article content - expandable */}
                      {expandedArticle === article.id && (
                        <div className="animate-slide-down border-t border-xfinity-gray-700 px-5 pb-5 pt-4">
                          <div className="space-y-3">
                            {article.answer.map((paragraph, pIdx) => (
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

                          {/* Feedback section */}
                          <div className="mt-6 flex items-center gap-4 border-t border-xfinity-gray-700 pt-4">
                            <span className="text-sm text-xfinity-gray-400">
                              Was this helpful?
                            </span>
                            {feedback[article.id] ? (
                              <span className="flex items-center gap-1.5 text-sm font-medium text-accent-green-light">
                                <Check className="h-4 w-4" />
                                Thanks for your feedback!
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleFeedback(article.id, 'yes')}
                                  className="flex items-center gap-1.5 rounded-lg border border-xfinity-gray-600 px-3 py-1.5 text-xs font-medium text-xfinity-gray-300 transition-all hover:border-accent-green hover:text-accent-green-light"
                                >
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  Yes
                                </button>
                                <button
                                  onClick={() => handleFeedback(article.id, 'no')}
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
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
