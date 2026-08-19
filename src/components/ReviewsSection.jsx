import { useState } from 'react'

const CATEGORIES = ['All Stories', 'Weddings', 'Return Gifts', 'Bulk Orders', 'Housewarming']

const REVIEWS = [
  {
    id: 1,
    initials: 'GR',
    color: 'from-[#234735] to-[#3f654f]',
    quote: '"The potlis looked beautiful on every table. Guests genuinely wanted to know where we\'d found them."',
    detail: 'We ordered 350 customized brass & silk potlis for our wedding in Bengaluru. The craftsmanship was immaculate and every guest was touched by the traditional fragrance sachet inside.',
    name: 'Gayathri R.',
    city: 'Bengaluru',
    tag: 'Weddings',
    guests: '350 Guests',
    date: 'Dec 2025',
    rating: 5,
    helpful: 42,
    verified: true
  },
  {
    id: 2,
    initials: 'KS',
    color: 'from-[#b86b4f] to-[#d48467]',
    quote: '"We had a tight per-piece budget and the team helped us find something that still looked special."',
    detail: 'Finding 200 return gift sets under ₹350 that didn\'t look cheap was tough until we found Thambulam. The custom jute bags with brass diya sets were an absolute hit.',
    name: 'Kothai S.',
    city: 'Chennai',
    tag: 'Return Gifts',
    guests: '200 Sets',
    date: 'Jan 2026',
    rating: 5,
    helpful: 29,
    verified: true
  },
  {
    id: 3,
    initials: 'VS',
    color: 'from-[#b58b51] to-[#d4a86a]',
    quote: '"The bulk process was easy, communication was clear, and everything reached us packed beautifully."',
    detail: 'Coordinating 500 corporate gift hampers for our annual celebration across 3 cities was seamless. Zero breakage, on-time delivery, and glowing feedback from executives.',
    name: 'Vijay S.',
    city: 'Coimbatore',
    tag: 'Bulk Orders',
    guests: '500 Hampers',
    date: 'Nov 2025',
    rating: 5,
    helpful: 38,
    verified: true
  },
  {
    id: 4,
    initials: 'AM',
    color: 'from-[#2a5240] to-[#4a7a60]',
    quote: '"Our Griha Pravesham guests are still messaging us about the traditional bronze lamps!"',
    detail: 'The packaging had a custom welcome card with our house name. The attention to detail in wrapping each item made it feel so personal and grand.',
    name: 'Ananya M.',
    city: 'Hyderabad',
    tag: 'Housewarming',
    guests: '120 Guests',
    date: 'Feb 2026',
    rating: 5,
    helpful: 19,
    verified: true
  },
  {
    id: 5,
    initials: 'PR',
    color: 'from-[#9e553b] to-[#c4775c]',
    quote: '"Finest eco-friendly thambulam sets! Sustainable yet luxurious."',
    detail: 'We wanted zero plastic for our daughter\'s Seemantham ceremony. The handwoven palm leaf boxes with organic turmeric, kumkum, and dry fruits were so elegant.',
    name: 'Priya R.',
    city: 'Madurai',
    tag: 'Return Gifts',
    guests: '180 Sets',
    date: 'Jan 2026',
    rating: 5,
    helpful: 24,
    verified: true
  },
  {
    id: 6,
    initials: 'DN',
    color: 'from-[#8f6932] to-[#b88c4a]',
    quote: '"The custom engraving on the silverware added such a regal touch to our sangeet favors."',
    detail: 'From initial sample approval to final delivery in Mumbai, the concierge team was super responsive. Delivered 2 days ahead of schedule!',
    name: 'Dev N.',
    city: 'Mumbai',
    tag: 'Weddings',
    guests: '400 Guests',
    date: 'Dec 2025',
    rating: 5,
    helpful: 31,
    verified: true
  }
]

export default function ReviewsSection() {
  const [activeTab, setActiveTab] = useState('All Stories')
  const [helpfulCounts, setHelpfulCounts] = useState(
    REVIEWS.reduce((acc, r) => ({ ...acc, [r.id]: r.helpful }), {})
  )
  const [likedMap, setLikedMap] = useState({})

  const filteredReviews = activeTab === 'All Stories'
    ? REVIEWS
    : REVIEWS.filter(r => r.tag === activeTab)

  const handleLike = (id) => {
    setLikedMap(prev => {
      const isLiked = prev[id]
      setHelpfulCounts(c => ({
        ...c,
        [id]: isLiked ? c[id] - 1 : c[id] + 1
      }))
      return { ...prev, [id]: !isLiked }
    })
  }

  return (
    <section className="py-[84px] bg-gradient-to-b from-[#faf6ef] via-[#fffdf9] to-[#faf6ef] relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] h-full pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[320px] h-[320px] bg-sage/20 rounded-full blur-[90px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[360px] h-[360px] bg-gold/15 rounded-full blur-[100px]" />
      </div>

      <div className="w-[min(1280px,calc(100%-48px))] mx-auto relative z-10 flex flex-col gap-[48px]">

        {/* Section Header & Rating Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[28px] border-b border-line pb-[32px]">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-[8px] bg-cream border border-gold/30 px-[14px] py-[5px] rounded-full mb-[14px]">
              <span className="w-[6px] h-[6px] rounded-full bg-terracotta animate-pulse" />
              <span className="uppercase tracking-[0.14em] text-[10.5px] font-bold text-terracotta">
                Kind Words & Real Host Stories
              </span>
            </div>
            <h2 className="font-serif text-green text-[36px] md:text-[44px] leading-[1.1] mb-[14px]">
              Loved by hosts.<br />
              <span className="italic font-normal text-terracotta">Remembered by guests.</span>
            </h2>
            <p className="text-[14px] text-muted leading-[1.6]">
              Real celebrations, thoughtful details, and handcrafted gifts that did not end up left behind on the table.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="flex flex-wrap items-center gap-[16px] shrink-0">
            <div className="bg-white border border-line shadow-sm rounded-[16px] p-[18px_22px] flex items-center gap-[16px]">
              <div className="text-center border-r border-line pr-[16px]">
                <div className="text-gold text-[16px] tracking-[2px] mb-[2px]">★★★★★</div>
                <div className="text-[20px] font-bold text-green font-serif leading-none">4.9 / 5.0</div>
                <span className="text-[10px] text-muted font-medium">450+ Host Reviews</span>
              </div>
              <div className="flex flex-col gap-[4px] text-[11.5px]">
                <div className="flex items-center gap-[6px] text-green font-medium">
                  <span className="text-gold">✓</span> 99.4% On-time Delivery
                </div>
                <div className="flex items-center gap-[6px] text-green font-medium">
                  <span className="text-gold">✓</span> 5,000+ Celebrations
                </div>
                <div className="flex items-center gap-[6px] text-green font-medium">
                  <span className="text-gold">✓</span> 100% Artisanal Quality
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-[16px]">
          <div className="flex items-center gap-[8px] overflow-x-auto pb-[4px] scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-[18px] py-[9px] rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-green text-paper shadow-md font-bold'
                    : 'bg-white border border-line text-ink hover:border-gold hover:text-green'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[12px] text-muted font-medium">
            Showing <strong className="text-green">{filteredReviews.length}</strong> real host reviews
          </span>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {filteredReviews.map((r) => (
            <article
              key={r.id}
              className="bg-white border border-line rounded-[18px] p-[28px_24px] flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-[6px] hover:border-gold hover:shadow-custom group"
            >
              {/* Card Top Details */}
              <div>
                <div className="flex items-center justify-between mb-[16px]">
                  <div className="text-gold text-[13px] tracking-[2px]">★★★★★</div>
                  <span className="text-[10px] font-bold text-terracotta uppercase tracking-[0.08em] bg-[#f9f1ee] border border-terracotta/20 px-[8px] py-[3px] rounded-full">
                    {r.tag}
                  </span>
                </div>

                <blockquote className="font-serif text-[#20251f] text-[16.5px] leading-[1.5] not-italic mb-[12px] group-hover:text-green transition-colors">
                  {r.quote}
                </blockquote>

                <p className="text-[12.5px] text-muted leading-[1.6] mb-[20px]">
                  {r.detail}
                </p>
              </div>

              {/* Card Footer Host Profile */}
              <div className="border-t border-line/80 pt-[16px] flex items-center justify-between gap-[12px]">
                <div className="flex items-center gap-[12px]">
                  <div className={`w-[40px] h-[40px] rounded-full bg-gradient-to-br ${r.color} text-white font-bold grid place-items-center text-[12px] shrink-0 shadow-sm`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-[6px]">
                      <strong className="text-green text-[13px] font-bold">{r.name}</strong>
                      {r.verified && (
                        <span className="text-gold text-[11px]" title="Verified Buyer">✓</span>
                      )}
                    </div>
                    <div className="text-muted text-[11px] flex items-center gap-[6px]">
                      <span>{r.city}</span>
                      <span>•</span>
                      <span className="text-terracotta font-medium">{r.guests}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(r.id)}
                  className={`flex items-center gap-[4px] text-[11px] font-medium px-[10px] py-[5px] rounded-full border transition-all ${
                    likedMap[r.id]
                      ? 'bg-gold/15 border-gold text-green font-bold'
                      : 'border-line text-muted hover:border-gold hover:text-green bg-cream/40'
                  }`}
                >
                  <span>👍</span>
                  <span>{helpfulCounts[r.id]}</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Engagement Banner */}
        <div className="bg-cream border border-gold/30 rounded-[18px] p-[24px_30px] flex flex-col md:flex-row items-center justify-between gap-[20px]">
          <div className="flex items-center gap-[16px]">
            <div className="w-[44px] h-[44px] rounded-full bg-gold/20 text-gold grid place-items-center text-[20px] shrink-0">
              🎁
            </div>
            <div>
              <h4 className="font-serif text-[18px] text-green font-bold">Planning a celebration or bulk event?</h4>
              <p className="text-[13px] text-muted">Get sample boxes delivered to your doorstep before placing your final order.</p>
            </div>
          </div>
          <a
            href="#bulk-quote"
            className="bg-green hover:bg-green2 text-paper font-bold text-[13px] px-[22px] py-[11px] rounded-full transition-all duration-200 shadow-sm shrink-0 hover:scale-[1.02]"
          >
            Request Sample Box →
          </a>
        </div>

      </div>
    </section>
  )
}

