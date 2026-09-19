import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import PRODUCTS from '../data/products'

const TOTAL = PRODUCTS.length

const SWING_POOL = [
  { duration: '4.2s', delay: '0s'    },
  { duration: '3.6s', delay: '-1.4s' },
  { duration: '4.8s', delay: '-0.7s' },
  { duration: '3.9s', delay: '-2.1s' },
  { duration: '4.5s', delay: '-1.8s' },
  { duration: '3.7s', delay: '-0.3s' },
]

const AUTO_MS = 3600

/* ─── Dangler Card — ONE unified card (image + info) ─────────── */
function DanglerCard({ product, slotIndex, onSelectProduct }) {
  const [hovered, setHovered] = useState(false)
  const swing = SWING_POOL[slotIndex % SWING_POOL.length]

  return (
    <div className="dangler-item" style={{ '--item-index': slotIndex }}>
      {/* String from wire to card */}
      <div className="dangler-string-top" />

      {/* Swinging assembly — pivot from top center */}
      <div
        className={`dangler-assembly${hovered ? ' dangler-paused' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelectProduct(product)}
        style={{
          animationDuration: swing.duration,
          animationDelay: swing.delay,
          animationPlayState: hovered ? 'paused' : 'running',
        }}
      >
        {/* ── SINGLE unified card ── */}
        <div className={`dangler-card${hovered ? ' dangler-card-hovered' : ''}`}>
          {/* Golden pin at top */}
          <div className="dangler-pin" />

          {/* Product image area */}
          <div className="dangler-card-img-wrap">
            <img src={product.img} alt={product.name} className="dangler-card-img" />

            {/* Hover overlay on image */}
            <div className={`dangler-card-overlay${hovered ? ' dangler-overlay-visible' : ''}`}>
              <button className="dangler-quickview-btn">
                Quick View
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Product info — below the image, inside the same card */}
          <div className="dangler-card-info">
            {/* Tag badge */}
            <span className="dangler-card-badge">{product.tag}</span>

            {/* Name */}
            <p className="dangler-card-name">
              {product.name.length > 24 ? product.name.slice(0, 24) + '…' : product.name}
            </p>

            {/* Price row */}
            <div className="dangler-card-price-row">
              <span className="dangler-card-price">₹{product.price}</span>
              <span className="dangler-card-unit"> / pc</span>
            </div>

            {/* Meta row: MOQ + rating */}
            <div className="dangler-card-meta">
              <span className="dangler-card-moq">Min {product.minOrderQty} pcs</span>
              <span className="dangler-card-rating">
                <span className="dangler-star">★</span> {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spotlight glow on hover */}
      <div className={`dangler-spotlight${hovered ? ' dangler-spotlight-visible' : ''}`} />
    </div>
  )
}

/* ─── Arrow Button ──────────────────────────────────────────── */
function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      className={`dangler-arrow dangler-arrow-${direction}${disabled ? ' dangler-arrow-disabled' : ''}`}
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous product' : 'Next product'}
      disabled={disabled}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev'
          ? <path d="M15 18l-6-6 6-6"/>
          : <path d="M9 18l6-6-6-6"/>}
      </svg>
    </button>
  )
}

/* ─── Main Component ────────────────────────────────────────── */
export default function DanglerPrevail({ onSelectProduct }) {
  const [ipp, setIpp] = useState(5)           // visible items per page
  const [startIdx, setStartIdx] = useState(0) // index of leftmost visible card
  const [locked, setLocked] = useState(false) // prevent rapid clicking
  const [pendingPrev, setPendingPrev] = useState(false) // trigger prev layout effect

  const rowRef  = useRef(null)
  const autoRef = useRef(null)

  /* ── Responsive ipp ── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setIpp(w < 480 ? 2 : w < 900 ? 3 : 5)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* ── Measure one card slot width (card + gap) ── */
  const getStep = useCallback(() => {
    const row = rowRef.current
    if (!row) return 214
    const items = row.querySelectorAll('.dangler-item')
    if (items.length < 2) return 214
    const r0 = items[0].getBoundingClientRect()
    const r1 = items[1].getBoundingClientRect()
    return Math.round(r1.left - r0.left)
  }, [])

  /* ── NEXT: row slides LEFT by one card slot ── */
  const slideNext = useCallback(() => {
    if (locked) return
    setLocked(true)
    const row = rowRef.current
    if (!row) return
    const step = getStep()
    row.style.transition = 'transform 0.42s cubic-bezier(0.22,1,0.36,1)'
    row.style.transform   = `translateX(-${step}px)`

    setTimeout(() => {
      /* Snap back instantly, then advance startIdx */
      row.style.transition = 'none'
      row.style.transform   = 'translateX(0)'
      setStartIdx(prev => (prev + 1) % TOTAL)
      setLocked(false)
    }, 440)
  }, [locked, getStep])

  /* ── PREV: decrement startIdx first, then layout effect slides ROW RIGHT ── */
  const slidePrev = useCallback(() => {
    if (locked) return
    setLocked(true)
    setStartIdx(prev => (prev - 1 + TOTAL) % TOTAL)
    setPendingPrev(true)
  }, [locked])

  /*
   * useLayoutEffect fires synchronously after React applies the DOM update
   * caused by setStartIdx above. At this point the row already has the new
   * card at slot-0. We snap the row to -step (hiding slot-0 to the left)
   * then immediately start the CSS transition back to 0 — slot-0 slides in.
   */
  useLayoutEffect(() => {
    if (!pendingPrev || !rowRef.current) return
    setPendingPrev(false)
    const row  = rowRef.current
    const step = getStep()
    /* Snap to offset without transition */
    row.style.transition = 'none'
    row.style.transform   = `translateX(-${step}px)`
    /* Force reflow so the transition isn't skipped */
    void row.offsetHeight
    /* Now animate back to zero — new card slides in from left */
    row.style.transition = 'transform 0.42s cubic-bezier(0.22,1,0.36,1)'
    row.style.transform   = 'translateX(0)'
    setTimeout(() => setLocked(false), 440)
  }, [pendingPrev, getStep])

  /* ── Auto-play ── */
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(slideNext, AUTO_MS)
  }, [slideNext])

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [startAuto])

  const pauseAuto  = () => clearInterval(autoRef.current)
  const resumeAuto = () => startAuto()

  /*
   * Render ipp + 1 cards (one extra, hidden by viewport overflow:hidden).
   * Keys are SLOT-based ("slot-0"…"slot-N") so React reuses the same DOM
   * node when startIdx changes — the swing animation never restarts.
   * Only the product DATA changes per slot.
   */
  const visibleProducts = Array.from(
    { length: ipp + 1 },
    (_, i) => PRODUCTS[(startIdx + i) % TOTAL]
  )

  /* Progress fraction based on startIdx */
  const progress = ((startIdx + 1) / TOTAL) * 100

  return (
    <section
      className="dangler-section"
      aria-label="Signature Prevails Product Carousel"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
    >
      {/* BG orbs */}
      <div className="dangler-bg-orb dangler-bg-orb-1" />
      <div className="dangler-bg-orb dangler-bg-orb-2" />

      {/* Header */}
      <header className="dangler-header">
        <p className="dangler-eyebrow">
          <span className="dangler-eyebrow-line" />
          Our Curated Favourites
          <span className="dangler-eyebrow-line" />
        </p>
        <h2 className="dangler-title">✦ Signature Prevails</h2>
        <p className="dangler-subtitle">Handpicked gifting for every cherished occasion</p>
      </header>

      {/* Stage */}
      <div className="dangler-stage">
        {/* Hanging wire SVG */}
        <div className="dangler-wire-container">
          <svg className="dangler-wire-svg" viewBox="0 0 1200 30" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shadow */}
            <path d="M 0 26 Q 600 30 1200 26" stroke="rgba(0,0,0,0.3)" strokeWidth="3.5" strokeLinecap="round"/>
            {/* Main golden rope */}
            <path d="M 0 22 Q 600 26 1200 22" stroke="url(#ropeGC)" strokeWidth="3" strokeLinecap="round"/>
            {/* Rope texture */}
            <path d="M 0 22 Q 600 26 1200 22" stroke="rgba(255,235,160,0.45)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="8 6"/>
            {/* Wall screws */}
            <circle cx="12" cy="22" r="6" fill="#c9a84c"/><circle cx="12" cy="22" r="3" fill="#8b6914"/>
            <circle cx="1188" cy="22" r="6" fill="#c9a84c"/><circle cx="1188" cy="22" r="3" fill="#8b6914"/>
            <defs>
              <linearGradient id="ropeGC" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#a07830"/>
                <stop offset="30%"  stopColor="#e8c66a"/>
                <stop offset="60%"  stopColor="#c9a84c"/>
                <stop offset="80%"  stopColor="#f0d882"/>
                <stop offset="100%" stopColor="#a07830"/>
              </linearGradient>
            </defs>
          </svg>

        </div>

        {/* Carousel: arrows + clipping viewport + sliding row */}
        <div className="dangler-carousel-wrapper">
          <ArrowButton direction="prev" onClick={() => { slidePrev(); pauseAuto() }} disabled={locked} />

          {/* Overflow clip — hides the extra (ipp+1) card */}
          <div className="dangler-carousel-viewport">
            {/* Sliding row — keyed by slot so swing continues */}
            <div ref={rowRef} className="dangler-products-row">
              {visibleProducts.map((product, i) => (
                <DanglerCard
                  key={`slot-${i}`}
                  product={product}
                  slotIndex={i}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>

          <ArrowButton direction="next" onClick={() => { slideNext(); pauseAuto() }} disabled={locked} />
        </div>

        {/* Dot indicators — one per product (12 total) */}
        <div className="dangler-dots" role="tablist">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === startIdx}
              aria-label={`Product ${i + 1}`}
              className={`dangler-dot${i === startIdx ? ' dangler-dot-active' : ''}`}
              onClick={() => {
                if (locked) return
                const diff = i - startIdx
                if (diff === 0) return
                // Determine direction and animate to target
                if (diff > 0 || (diff < -(TOTAL / 2))) {
                  // Going forward
                  setLocked(true)
                  const row = rowRef.current
                  row.style.transition = 'transform 0.42s cubic-bezier(0.22,1,0.36,1)'
                  row.style.transform = `translateX(-${getStep() * (diff > 0 ? 1 : -1)}px)`
                  setTimeout(() => {
                    row.style.transition = 'none'
                    row.style.transform = 'translateX(0)'
                    setStartIdx(i)
                    setLocked(false)
                  }, 440)
                } else {
                  setStartIdx(i)
                  setPendingPrev(true)
                }
                pauseAuto()
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="dangler-progress-bar">
          <div className="dangler-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Counter */}
        <p className="dangler-counter">
          <span className="dangler-counter-current">{String(startIdx + 1).padStart(2, '0')}</span>
          <span className="dangler-counter-sep"> / </span>
          <span className="dangler-counter-total">{String(TOTAL).padStart(2, '0')}</span>
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="dangler-footer-cta">
        <button
          className="dangler-view-all-btn"
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span>View All Gifts</span>
          <span className="dangler-btn-arrow">↓</span>
        </button>
      </div>
    </section>
  )
}
