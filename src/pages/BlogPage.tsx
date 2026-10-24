import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  X,
  Tag,
} from 'lucide-react';
import { blogPosts } from '../data/blog';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Scroll detection on the blog cards grid
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsGridRef, { once: true, amount: 0.12 });

  const categories = [
    { key: 'All', label: 'All' },
    { key: 'Real Estate Updates', label: 'Real Estate Updates' },
    { key: 'Company News', label: 'Company News' },
    { key: 'Home Buying Guides', label: 'Home Buying Guides' },
    { key: 'Architecture & Design', label: 'Architecture & Design' },
  ];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative bg-[#141515] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Sayba Architecture & Insights"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141515] via-[#141515]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#80B3AD] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#80B3AD] font-medium">News & Insights</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              News & Insights
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
              Discover company news, expert home-buying guides, infrastructure updates, and
              architectural innovations across Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: FEATURED SPOTLIGHT (WIDE, COMPACT HEIGHT, OUTSIDE HEADER)
          ======================================================== */}
      {featuredPost && (
        <section className="pt-8 sm:pt-10 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onClick={() => setActiveArticle(featuredPost)}
            className="group bg-white rounded-2xl overflow-hidden border border-[#DCE1DF] hover:border-[#80B3AD] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 md:grid-cols-12"
          >
            {/* Image Column (Sleek, Compact Height) */}
            <div className="md:col-span-4 lg:col-span-4 relative h-48 sm:h-52 md:h-56 md:min-h-full overflow-hidden bg-neutral-900">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content Column (Wide & Compact) */}
            <div className="md:col-span-8 lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between space-y-3 bg-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-[11px] text-neutral-500">
                  <span className="text-[#80B3AD] font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-brand-dark group-hover:text-[#80B3AD] transition-colors leading-snug line-clamp-2">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author & Read CTA */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#80B3AD]/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-dark leading-tight">
                      {featuredPost.author.name}
                    </h4>
                    <span className="text-[10px] text-neutral-500">
                      {featuredPost.date}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#80B3AD] group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ========================================================
          FILTER & SEARCH BAR + BLOG CARDS GRID
          ======================================================== */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#DCE1DF]">
          {/* Categories with Sliding Indicator */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer select-none ${
                    isActive ? 'text-[#141515]' : 'text-neutral-600 hover:text-brand-dark'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBlogCategoryPill"
                      className="absolute inset-0 bg-[#80B3AD] rounded-full shadow-md -z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Search updates or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#DCE1DF] text-brand-dark text-xs font-medium rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#80B3AD] shadow-sm"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Blog Posts Grid with Sequential One-by-One Entrance */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#DCE1DF]">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="font-serif text-xl text-neutral-600">
              No articles match your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold uppercase tracking-wider text-[#80B3AD] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div ref={cardsGridRef}>
            <div
              key={`${selectedCategory}-${searchQuery}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 45 }}
                  animate={
                    isCardsInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 45 }
                  }
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: idx * 0.55,
                  }}
                  onClick={() => setActiveArticle(post)}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#DCE1DF] hover:border-[#80B3AD] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                {/* Cover Image */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-[#141515]/90 text-[#80B3AD] backdrop-blur-sm border border-[#80B3AD]/30">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-[#80B3AD] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer with Author and Read Arrow */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#80B3AD]/30"
                      />
                      <span className="text-xs font-medium text-neutral-700">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#80B3AD] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          FULL ARTICLE READER MODAL
          ======================================================== */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Article Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#DCE1DF] overflow-hidden z-10 text-brand-dark my-8 max-h-[90vh] flex flex-col"
            >
              {/* Floating Close Button - Always accessible */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2.5 text-white bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full shadow-lg transition-colors cursor-pointer z-30"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Unified Scrollable Container: Image and Content scroll together */}
              <div className="overflow-y-auto flex-1">
                {/* Top Banner Image with Category Pill (Scrolls up and out of view on scroll) */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 overflow-hidden">
                  <img
                    src={activeArticle.coverImage}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute bottom-4 left-4 sm:left-8">
                    <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#80B3AD] text-[#141515] font-bold shadow">
                      {activeArticle.category}
                    </span>
                  </div>
                </div>

                {/* Article Body Content (Expands to take full pop-up on scroll) */}
                <div className="p-6 sm:p-10 space-y-6">
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark leading-snug">
                      {activeArticle.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-4 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={activeArticle.author.avatar}
                          alt={activeArticle.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#80B3AD]/40"
                        />
                        <span className="font-medium text-brand-dark">
                          {activeArticle.author.name} ({activeArticle.author.role})
                        </span>
                      </div>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {activeArticle.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Excerpt Lead */}
                  <div className="p-4 sm:p-5 rounded-xl bg-brand-cream border-l-4 border-[#80B3AD] text-sm sm:text-base italic text-neutral-700">
                    {activeArticle.excerpt}
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                    {activeArticle.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-[#80B3AD]" />
                    {activeArticle.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#EFF3F2] text-neutral-700 border border-[#DCE1DF]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="p-4 px-6 sm:px-8 bg-[#EFF3F2] border-t border-neutral-200 flex items-center justify-between shrink-0">
                <span className="text-xs text-neutral-500 font-medium">
                  Sayba Group Real Estate Insights
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-lg bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
