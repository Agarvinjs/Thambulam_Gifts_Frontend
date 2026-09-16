import { useState, useMemo, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import PRODUCTS from '../data/products'

function StarRating({ rating }) {
  const full = Math.floor(Number(rating))
  const half = Number(rating) - full >= 0.5
  return (
    <span className="inline-flex items-center gap-[2px]">
      {[...Array(5)].map((_, i) => {
        if (i < full) return <span key={i} className="text-gold text-[15px] leading-none">★</span>
        if (i === full && half) return <span key={i} className="text-gold text-[15px] leading-none opacity-70">★</span>
        return <span key={i} className="text-muted/30 text-[15px] leading-none">★</span>
      })}
    </span>
  )
}

const AVATAR_GRADIENTS = [
  'from-[#234735] to-[#3f654f]',
  'from-[#b86b4f] to-[#d48467]',
  'from-[#b58b51] to-[#d4a86a]',
  'from-[#2a5240] to-[#4a7a60]',
  'from-[#8f6932] to-[#b88c4a]',
]

function getInitials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'H'
  )
}

// Available festive and celebration coupons
const CELEBRATION_COUPONS = [
  {
    code: 'THAMBOOLAM10',
    title: 'Festive 10% Off',
    type: 'percent',
    value: 10,
    badge: '10% OFF',
    description: '10% instant discount on celebration return gifts',
    minQty: 1,
    minAmount: 0,
  },
  {
    code: 'UTSAV15',
    title: 'Grand Bulk 15% Off',
    type: 'percent',
    value: 15,
    badge: '15% OFF (50+ pcs)',
    description: '15% celebration discount for bulk orders of 50+ pieces',
    minQty: 50,
    minAmount: 0,
  },
  {
    code: 'FIRSTGIFT',
    title: 'New Host Welcome',
    type: 'flat',
    value: 250,
    badge: '₹250 OFF',
    description: 'Flat ₹250 off on orders above ₹1,000',
    minQty: 1,
    minAmount: 1000,
  },
  {
    code: 'WEDDING500',
    title: 'Wedding Gifting Bonus',
    type: 'flat',
    value: 500,
    badge: '₹500 OFF (₹5k+)',
    description: 'Flat ₹500 off on grand wedding orders above ₹5,000',
    minQty: 1,
    minAmount: 5000,
  },
]

export default function ProductDetailPage({ product, onBack, onSelectProduct, onOpenCart }) {
  const { addToCart } = useCart()

  // Gallery state
  const galleryImages = useMemo(() => {
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery
    }
    return [product.img]
  }, [product])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const minOrderQty = product.minOrderQty || 15
  const availableStock = product.availableStock || 450

  // Quantity and bulk selection state
  const [quantity, setQuantity] = useState(product.minOrderQty || 25)
  const [qtyError, setQtyError] = useState(null)
  const [activeTab, setActiveTab] = useState('story')

  // Personalization state
  const [enablePersonalization, setEnablePersonalization] = useState(false)
  const [coupleNames, setCoupleNames] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [selectedRibbon, setSelectedRibbon] = useState('Marigold Gold')

  // Coupon state
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponMessage, setCouponMessage] = useState(null) // { type: 'success' | 'error', text: string }

  // Pincode checker state
  const [pincode, setPincode] = useState('')
  const [pincodeStatus, setPincodeStatus] = useState(null)

  // Added to cart feedback state
  const [addedNotice, setAddedNotice] = useState(false)

  // Reviews state
  const [reviewsList, setReviewsList] = useState(product.reviews || [])
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [newReviewAuthor, setNewReviewAuthor] = useState('')
  const [newReviewCity, setNewReviewCity] = useState('')
  const [newReviewEvent, setNewReviewEvent] = useState('Wedding')
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [newReviewComment, setNewReviewComment] = useState('')

  // Scroll to top and reset on product switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveImageIndex(0)
    setQuantity(product.minOrderQty || 25)
    setQtyError(null)
    setReviewsList(product.reviews || [])
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponMessage(null)
  }, [product.id, product.reviews, product.minOrderQty])

  // Calculate effective unit price based on current quantity and bulk tiers
  const effectiveUnitPrice = useMemo(() => {
    if (!product.bulkTiers || product.bulkTiers.length === 0) return product.price
    const tier = product.bulkTiers.slice().reverse().find(t => quantity >= t.min)
    return tier ? tier.price : product.price
  }, [product, quantity])

  // Active bulk tier index
  const activeTierIndex = useMemo(() => {
    if (!product.bulkTiers) return 0
    return product.bulkTiers.findIndex(t => quantity >= t.min && quantity <= t.max)
  }, [product, quantity])

  // Base calculations
  const totalPrice = effectiveUnitPrice * quantity
  const totalMrp = (product.mrp || product.price) * quantity
  const baseSavings = Math.max(0, totalMrp - totalPrice)

  // Coupon discount calculation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.type === 'percent') {
      return Math.round((totalPrice * appliedCoupon.value) / 100)
    }
    if (appliedCoupon.type === 'flat') {
      return Math.min(appliedCoupon.value, totalPrice)
    }
    return 0
  }, [appliedCoupon, totalPrice])

  const finalPrice = Math.max(0, totalPrice - couponDiscount)
  const grandTotalSavings = baseSavings + couponDiscount
  const savingPct = product.mrp
    ? Math.round(((totalMrp - finalPrice) / totalMrp) * 100)
    : couponDiscount > 0 && totalPrice > 0
    ? Math.round((couponDiscount / totalPrice) * 100)
    : 0

  // Auto-validate applied coupon if quantity or total price changes
  useEffect(() => {
    if (!appliedCoupon) return
    if (appliedCoupon.minQty && quantity < appliedCoupon.minQty) {
      setAppliedCoupon(null)
      setCouponMessage({
        type: 'error',
        text: `Coupon "${appliedCoupon.code}" was removed because it requires at least ${appliedCoupon.minQty} pieces.`,
      })
    } else if (appliedCoupon.minAmount && totalPrice < appliedCoupon.minAmount) {
      setAppliedCoupon(null)
      setCouponMessage({
        type: 'error',
        text: `Coupon "${appliedCoupon.code}" was removed because it requires an order value of at least ₹${appliedCoupon.minAmount.toLocaleString('en-IN')}.`,
      })
    }
  }, [quantity, totalPrice, appliedCoupon])

  // Coupon actions
  const handleApplyCoupon = (codeToApply) => {
    const rawCode = typeof codeToApply === 'string' ? codeToApply : couponInput
    const code = (rawCode || '').trim().toUpperCase()

    if (!code) {
      setCouponMessage({ type: 'error', text: 'Please enter a coupon code.' })
      return
    }

    const matchedCoupon = CELEBRATION_COUPONS.find(c => c.code.toUpperCase() === code)
    if (!matchedCoupon) {
      setCouponMessage({
        type: 'error',
        text: `Invalid coupon "${code}". Try THAMBOOLAM10 or UTSAV15.`,
      })
      return
    }

    if (matchedCoupon.minQty && quantity < matchedCoupon.minQty) {
      setCouponMessage({
        type: 'error',
        text: `Coupon "${matchedCoupon.code}" requires a minimum order of ${matchedCoupon.minQty} pieces. (Current: ${quantity} pcs)`,
      })
      return
    }

    if (matchedCoupon.minAmount && totalPrice < matchedCoupon.minAmount) {
      setCouponMessage({
        type: 'error',
        text: `Coupon "${matchedCoupon.code}" requires an order value of at least ₹${matchedCoupon.minAmount.toLocaleString('en-IN')}. (Current: ₹${totalPrice.toLocaleString('en-IN')})`,
      })
      return
    }

    setAppliedCoupon(matchedCoupon)
    setCouponInput(matchedCoupon.code)
    setCouponMessage({
      type: 'success',
      text: `Coupon "${matchedCoupon.code}" applied! ${matchedCoupon.description}`,
    })
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponMessage(null)
  }

  // Related products from the same category or overall collection
  const relatedProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.id !== product.id && (p.category === product.category || p.type === product.type))
      .slice(0, 4)
  }, [product])

  // Complementary bundle recommendation
  const complementaryBundle = useMemo(() => {
    const diya = PRODUCTS.find(p => p.id === 12) || PRODUCTS[1]
    const box = PRODUCTS.find(p => p.id === 2) || PRODUCTS[2]
    const items = [product, diya, box].filter(Boolean)
    const combinedPrice = items.reduce((acc, curr) => acc + curr.price, 0)
    const discountedPrice = Math.round(combinedPrice * 0.88) // extra 12% off for bundle
    return { items, combinedPrice, discountedPrice, bundleSavings: combinedPrice - discountedPrice }
  }, [product])

  const handleAddBundle = () => {
    complementaryBundle.items.forEach(item => {
      addToCart(item, 1)
    })
    if (onOpenCart) onOpenCart()
  }

  const handleAddToCart = () => {
    if (quantity < minOrderQty) {
      setQtyError(`Minimum order for ${product.name} is ${minOrderQty} pieces.`)
      setQuantity(minOrderQty)
      return
    }
    if (quantity > availableStock) {
      setQtyError(`Only ${availableStock} pieces currently available in stock.`)
      setQuantity(availableStock)
      return
    }
    setQtyError(null)

    const options = {
      minOrderQty,
      availableStock,
      ...(enablePersonalization && {
        customTag: coupleNames.trim() || 'Complimentary Gold Monogram',
        eventDate: eventDate.trim() || '',
      }),
      ribbonColor: selectedRibbon,
      ...(appliedCoupon && {
        appliedCoupon: appliedCoupon.code,
        couponDiscount: couponDiscount,
        originalTotalPrice: totalPrice,
        finalPrice: finalPrice,
      }),
    }

    addToCart(product, quantity, options)
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2800)
    if (onOpenCart) onOpenCart()
  }

  const handleCheckPincode = (e) => {
    e.preventDefault()
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        valid: true,
        message: `Delivery available for ${pincode}! Standard dispatch in 48 hrs. Estimated arrival: 3-5 business days.`,
      })
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      })
    }
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return

    const newRev = {
      id: Date.now(),
      author: newReviewAuthor.trim(),
      city: newReviewCity.trim() || 'Verified Buyer',
      event: newReviewEvent,
      rating: Number(newReviewRating),
      date: 'Just now',
      comment: newReviewComment.trim(),
    }
    setReviewsList(prev => [newRev, ...prev])
    setReviewModalOpen(false)
    setNewReviewAuthor('')
    setNewReviewCity('')
    setNewReviewComment('')
  }

  const RIBBONS = [
    { name: 'Marigold Gold', color: '#b58b51' },
    { name: 'Emerald Green', color: '#234735' },
    { name: 'Crimson Vermilion', color: '#b86b4f' },
    { name: 'Royal Navy', color: '#2a4365' },
  ]

  return (
    <div className="bg-paper min-h-screen pb-[100px] text-ink animate-fadeIn">

      {/* ── Breadcrumbs & Back Navigation Bar ── */}
      <div className="border-b border-line bg-cream/40 sticky top-[56px] z-[40] backdrop-blur-md">
        <div className="w-[min(1280px,calc(100%-48px))] mx-auto h-[48px] flex items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[12px] overflow-x-auto text-[11.5px] whitespace-nowrap py-[6px]">
            <button
              onClick={onBack}
              className="flex items-center gap-[6px] font-bold text-green hover:text-terracotta transition-colors border-0 bg-transparent cursor-pointer"
            >
              <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Back to Collection</span>
            </button>
            <span className="text-muted/40">/</span>
            <span className="text-muted hover:text-green cursor-pointer" onClick={onBack}>Home</span>
            <span className="text-muted/40">/</span>
            <span className="text-muted hover:text-green cursor-pointer" onClick={onBack}>{product.category}</span>
            <span className="text-muted/40">/</span>
            <span className="font-bold text-ink truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>

          {/* Quick Actions (Share, Wishlist) */}
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                alert('Product link copied to clipboard!')
              }}
              title="Copy share link"
              className="text-[11px] font-bold text-muted hover:text-green flex items-center gap-[4px] border border-line rounded-[6px] px-[9px] py-[5px] bg-white transition-colors cursor-pointer"
            >
              <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Hero Section (Gallery + Purchase Console) ── */}
      <section className="pt-[36px] pb-[60px]">
        <div className="w-[min(1280px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[40px] xl:gap-[56px] items-start">

          {/* LEFT: Visual Showcase & Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-[20px] sticky top-[120px]">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[22px] overflow-hidden bg-[#ebe4d8] border border-line shadow-sm group">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />

              {/* Floating Badges */}
              <div className="absolute top-[16px] left-[16px] flex flex-col gap-[6px] pointer-events-none">
                {savingPct > 0 && (
                  <span className="bg-terracotta text-white text-[11px] font-bold px-[10px] py-[4px] rounded-[6px] uppercase tracking-[0.05em] shadow-md">
                    {savingPct}% OFF
                  </span>
                )}
                {product.tag && (
                  <span className="bg-green text-white text-[10.5px] font-bold px-[10px] py-[4px] rounded-[6px] uppercase tracking-[0.06em] shadow-md">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Click to zoom indicator */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-[16px] right-[16px] bg-white/90 backdrop-blur-sm text-green hover:bg-white text-[11px] font-bold px-[12px] py-[7px] rounded-full border border-line shadow-sm flex items-center gap-[6px] transition-all"
              >
                <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>View Fullscreen</span>
              </button>
            </div>

            {/* Thumbnails strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-[12px] overflow-x-auto pb-[6px]">
                {galleryImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-[78px] h-[78px] rounded-[12px] overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-[#e6e0d3] ${
                      activeImageIndex === idx
                        ? 'border-green ring-2 ring-green/20 scale-105 shadow-sm'
                        : 'border-line opacity-75 hover:opacity-100 hover:border-gold'
                    }`}
                  >
                    <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Artisanal Assurances Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px] pt-[8px]">
              <div className="bg-cream/60 border border-line rounded-[14px] p-[14px] text-center">
                <span className="text-[20px] block mb-[4px]">🌿</span>
                <strong className="text-[11.5px] text-green block font-bold">100% Eco Craft</strong>
                <span className="text-[10px] text-muted">Natural river grass & silk</span>
              </div>
              <div className="bg-cream/60 border border-line rounded-[14px] p-[14px] text-center">
                <span className="text-[20px] block mb-[4px]">⚡</span>
                <strong className="text-[11.5px] text-green block font-bold">Express Dispatch</strong>
                <span className="text-[10px] text-muted">Ships in 48-72 hours</span>
              </div>
              <div className="bg-cream/60 border border-line rounded-[14px] p-[14px] text-center">
                <span className="text-[20px] block mb-[4px]">🛡️</span>
                <strong className="text-[11.5px] text-green block font-bold">Safe Transit</strong>
                <span className="text-[10px] text-muted">Zero breakage guarantee</span>
              </div>
              <div className="bg-cream/60 border border-line rounded-[14px] p-[14px] text-center">
                <span className="text-[20px] block mb-[4px]">🏷️</span>
                <strong className="text-[11.5px] text-green block font-bold">Free Monograms</strong>
                <span className="text-[10px] text-muted">On bulk orders 100+ pcs</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Order & Customization Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-[24px]">

            {/* Header / Titles */}
            <div>
              <div className="flex items-center gap-[8px] mb-[6px]">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-terracotta bg-terracotta/10 px-[8px] py-[3px] rounded-[4px]">
                  {product.category}
                </span>
                <span className="text-[10.5px] text-muted font-medium">SKU: IL-{product.id}00{product.id}</span>
              </div>

              <h1 className="font-serif text-green text-[32px] sm:text-[38px] leading-[1.15] mb-[10px]">
                {product.name}
              </h1>

              {/* Star rating & reviews link */}
              <div className="flex items-center gap-[10px]">
                <div className="flex items-center gap-[4px]">
                  <StarRating rating={product.rating} />
                  <span className="text-[12.5px] font-bold text-gold ml-[2px]">{product.rating}</span>
                </div>
                <span className="text-muted/40">•</span>
                <a
                  href="#reviews"
                  className="text-[11.5px] font-bold text-green underline decoration-green/40 hover:decoration-green transition-all"
                >
                  {reviewsList.length} Verified Customer Reviews
                </a>
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-cream/40 border border-line rounded-[16px] p-[18px] flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-[10px]">
                  <span className="font-serif text-green text-[34px] font-bold leading-none">
                    ₹{effectiveUnitPrice}
                  </span>
                  {product.mrp && (
                    <span className="text-[15px] text-muted line-through font-medium">
                      ₹{product.mrp}
                    </span>
                  )}
                  {savingPct > 0 && (
                    <span className="text-terracotta text-[12px] font-bold bg-terracotta/10 px-[6px] py-[2px] rounded">
                      {savingPct}% OFF
                    </span>
                  )}
                </div>
                <span className="text-[10.5px] text-muted block mt-[5px]">
                  Per piece • Inclusive of all taxes & luxury packing
                </span>
              </div>

              <div className="flex flex-col items-end gap-[4px]">
                <span className="inline-flex items-center gap-[6px] text-[11.5px] font-bold text-[#2e7d32] bg-[#2e7d32]/10 px-[10px] py-[4px] rounded-full border border-[#2e7d32]/25 shadow-2xs">
                  <span className="w-[6.5px] h-[6.5px] rounded-full bg-[#2e7d32] animate-pulse" />
                  <span>{availableStock} Pieces in Stock</span>
                </span>
                <span className="text-[10px] font-bold text-terracotta bg-cream px-[7px] py-[1.5px] rounded border border-gold/30">
                  Min. Order: {minOrderQty} pcs
                </span>
              </div>
            </div>

            {/* Bulk Order Tier Pricing Table */}
            {product.bulkTiers && product.bulkTiers.length > 0 && (
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-terracotta">
                    Bulk Celebration Pricing Tiers
                  </span>
                  <span className="text-[10.5px] text-muted">
                    Click tier to auto-select
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px]">
                  {product.bulkTiers.map((tier, idx) => {
                    const isSelected = activeTierIndex === idx
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setQuantity(Math.max(minOrderQty, tier.min))
                          setQtyError(null)
                        }}
                        className={`p-[10px_12px] rounded-[12px] text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-green bg-green/5 ring-2 ring-green/20 shadow-sm'
                            : 'border-line bg-white hover:border-gold/60'
                        }`}
                      >
                        <span className="text-[10px] text-muted block font-medium">{tier.label}</span>
                        <strong className="text-[14px] text-green font-serif font-bold block mt-[2px]">
                          ₹{tier.price}
                        </strong>
                        <span className={`text-[9.5px] font-bold block mt-[2px] ${isSelected ? 'text-terracotta' : 'text-muted'}`}>
                          {tier.discount}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector, Validation & Quick Presets */}
            <div className="flex flex-col gap-[12px] border-t border-line pt-[18px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-terracotta">
                    Select Order Quantity
                  </label>
                  <span className="text-[10.5px] font-semibold text-muted">
                    (Min: <strong className="text-terracotta">{minOrderQty}</strong> | Stock: <strong className="text-green">{availableStock}</strong>)
                  </span>
                </div>
                <span className="text-[12px] font-bold text-green font-serif">
                  {quantity || minOrderQty} Pieces Selected
                </span>
              </div>

              {/* Stepper + Presets */}
              <div className="flex flex-wrap items-center gap-[10px]">
                <div className="inline-flex items-center border border-line rounded-[10px] bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    disabled={quantity <= minOrderQty}
                    onClick={() => {
                      if (quantity > minOrderQty) {
                        setQuantity(q => Math.max(minOrderQty, q - (q > 50 ? 25 : q > minOrderQty ? 5 : 1)))
                        setQtyError(null)
                      } else {
                        setQtyError(`Minimum order requirement is ${minOrderQty} pieces.`)
                      }
                    }}
                    className={`w-[38px] h-[38px] text-[18px] transition-colors border-0 bg-transparent grid place-items-center ${
                      quantity <= minOrderQty
                        ? 'text-muted/40 cursor-not-allowed bg-cream/30'
                        : 'text-green hover:bg-cream/60 cursor-pointer font-bold'
                    }`}
                    title={quantity <= minOrderQty ? `Minimum order is ${minOrderQty} pcs` : 'Decrease quantity'}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={minOrderQty}
                    max={availableStock}
                    value={quantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value)
                      if (isNaN(v)) {
                        setQuantity('')
                      } else {
                        setQuantity(v)
                        if (v >= minOrderQty && v <= availableStock) {
                          setQtyError(null)
                        }
                      }
                    }}
                    onBlur={() => {
                      if (!quantity || quantity < minOrderQty) {
                        setQuantity(minOrderQty)
                        setQtyError(`Minimum order for ${product.name} is ${minOrderQty} pieces.`)
                      } else if (quantity > availableStock) {
                        setQuantity(availableStock)
                        setQtyError(`Maximum available stock is ${availableStock} pieces.`)
                      } else {
                        setQtyError(null)
                      }
                    }}
                    className="w-[66px] text-center font-serif text-[15px] font-bold text-green border-0 outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    disabled={quantity >= availableStock}
                    onClick={() => {
                      if (quantity < availableStock) {
                        setQuantity(q => Math.min(availableStock, q + (q >= 50 ? 25 : q >= 10 ? 5 : 1)))
                        setQtyError(null)
                      } else {
                        setQtyError(`Maximum stock limit (${availableStock} pcs) reached.`)
                      }
                    }}
                    className={`w-[38px] h-[38px] text-[18px] transition-colors border-0 bg-transparent grid place-items-center ${
                      quantity >= availableStock
                        ? 'text-muted/40 cursor-not-allowed bg-cream/30'
                        : 'text-green hover:bg-cream/60 cursor-pointer font-bold'
                    }`}
                    title={quantity >= availableStock ? `Maximum stock is ${availableStock} pcs` : 'Increase quantity'}
                  >
                    +
                  </button>
                </div>

                {/* Preset Chips */}
                <div className="flex items-center gap-[6px] overflow-x-auto">
                  {[minOrderQty, 25, 50, 100, 250, 500]
                    .filter((cnt, i, arr) => arr.indexOf(cnt) === i && cnt <= availableStock)
                    .map(cnt => (
                      <button
                        type="button"
                        key={cnt}
                        onClick={() => {
                          setQuantity(cnt)
                          setQtyError(null)
                        }}
                        className={`px-[11px] py-[8px] text-[11px] font-bold rounded-[8px] border transition-colors cursor-pointer ${
                          quantity === cnt
                            ? 'bg-green text-white border-green shadow-sm'
                            : 'bg-cream/50 text-ink border-line hover:border-green'
                        }`}
                      >
                        {cnt} {cnt === minOrderQty ? '(Min)' : ''}
                      </button>
                    ))}
                </div>
              </div>

              {/* Validation error message if below min or above stock */}
              {qtyError && (
                <div className="bg-terracotta/10 border border-terracotta/25 text-terracotta text-[11px] font-bold px-[12px] py-[6px] rounded-[8px] flex items-center gap-[6px]">
                  <span>⚠️</span>
                  <span>{qtyError}</span>
                </div>
              )}

              {/* Interactive Quantity Range Slider with filled horizontal line before the dot */}
              <div className="flex flex-col gap-[6px] pt-[2px]">
                {(() => {
                  const sliderMax = Math.min(availableStock, 500)
                  const currentQ = typeof quantity === 'number' ? quantity : minOrderQty
                  const qtySliderPct = Math.min(
                    100,
                    Math.max(0, ((currentQ - minOrderQty) / (sliderMax - minOrderQty)) * 100)
                  )
                  return (
                    <input
                      type="range"
                      min={minOrderQty}
                      max={sliderMax}
                      step={currentQ >= 100 ? 25 : 5}
                      value={currentQ}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        setQuantity(val)
                        setQtyError(null)
                      }}
                      style={{
                        background: `linear-gradient(to right, #234735 0%, #234735 ${qtySliderPct}%, #e2d9c8 ${qtySliderPct}%, #e2d9c8 100%)`,
                      }}
                      className="w-full h-[7px] rounded-lg appearance-none cursor-pointer luxury-range accent-green transition-all"
                    />
                  )
                })()}
                <div className="flex items-center justify-between text-[10px] text-muted font-medium select-none">
                  <span>{minOrderQty} pcs (Min)</span>
                  <span>50 pcs</span>
                  <span>100 pcs</span>
                  <span>250 pcs</span>
                  <span>{Math.min(availableStock, 500)}+ pcs</span>
                </div>
              </div>

              {/* Stock and Dispatch info strip */}
              <div className="flex items-center justify-between text-[10.5px] pt-[4px] text-muted border-t border-line/40">
                <span className="flex items-center gap-[4px] text-[#2e7d32] font-semibold">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#2e7d32]"></span>
                  <span>{availableStock} pieces available in dispatch hub</span>
                </span>
                <span className="text-terracotta font-semibold">
                  Min. order: {minOrderQty} pieces
                </span>
              </div>

              {/* Live Subtotal & Savings Calculation Banner */}
              <div className="bg-gradient-to-r from-cream to-[#f4ede0] border border-gold/40 rounded-[14px] p-[14px] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted uppercase font-bold tracking-[0.08em] block">Order Subtotal ({quantity} pcs)</span>
                  <div className="flex items-baseline gap-[6px] mt-[2px]">
                    <span className="font-serif text-[22px] font-bold text-green leading-none">
                      ₹{finalPrice.toLocaleString('en-IN')}
                    </span>
                    {appliedCoupon ? (
                      <span className="text-[12px] text-muted line-through">
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    ) : (totalMrp > totalPrice) ? (
                      <span className="text-[11.5px] text-muted line-through">
                        ₹{totalMrp.toLocaleString('en-IN')}
                      </span>
                    ) : null}
                  </div>
                  {appliedCoupon && (
                    <span className="inline-flex items-center gap-[4px] text-[10.5px] text-[#2e7d32] font-bold mt-[4px]">
                      🏷️ Extra ₹{couponDiscount.toLocaleString('en-IN')} saved with {appliedCoupon.code}
                    </span>
                  )}
                </div>

                {grandTotalSavings > 0 && (
                  <div className="text-right">
                    <span className="text-[9.5px] uppercase font-bold text-terracotta block">
                      {appliedCoupon ? 'Total Savings' : 'You Save'}
                    </span>
                    <strong className="text-[13px] text-terracotta font-bold">
                      ₹{grandTotalSavings.toLocaleString('en-IN')}{savingPct > 0 ? ` (${savingPct}%)` : ''}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {/* Customization & Personalization (Event Name Tag) */}
            <div className="border border-line rounded-[16px] p-[18px] bg-white flex flex-col gap-[14px]">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-[10px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enablePersonalization}
                    onChange={(e) => setEnablePersonalization(e.target.checked)}
                    className="w-[16px] h-[16px] accent-green cursor-pointer"
                  />
                  <div>
                    <span className="text-[12px] font-bold text-green block">
                      Add Custom Event Tag / Monogram
                    </span>
                    <span className="text-[10px] text-muted block">
                      Personalized with host names & event date {quantity >= 100 ? '(FREE for 100+ pcs)' : '(Complimentary)'}
                    </span>
                  </div>
                </label>
                <span className="text-[10.5px] font-bold text-gold uppercase tracking-wider">
                  ✦ Custom
                </span>
              </div>

              {enablePersonalization && (
                <div className="flex flex-col gap-[10px] pt-[8px] border-t border-line/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted block mb-[4px]">
                        Couple / Host Names
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya & Rahul"
                        value={coupleNames}
                        onChange={(e) => setCoupleNames(e.target.value)}
                        className="w-full bg-paper border border-line rounded-[8px] px-[10px] py-[8px] text-[12px] text-ink outline-none focus:border-green"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted block mb-[4px]">
                        Event Date (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 14th Dec 2026"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-paper border border-line rounded-[8px] px-[10px] py-[8px] text-[12px] text-ink outline-none focus:border-green"
                      />
                    </div>
                  </div>

                  {/* Ribbon accent selector */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted block mb-[6px]">
                      Accent Ribbon & Tassel Shade
                    </label>
                    <div className="flex items-center gap-[8px]">
                      {RIBBONS.map((rib) => (
                        <button
                          type="button"
                          key={rib.name}
                          onClick={() => setSelectedRibbon(rib.name)}
                          className={`flex items-center gap-[6px] px-[9px] py-[5px] rounded-[6px] text-[10.5px] font-medium border cursor-pointer transition-all ${
                            selectedRibbon === rib.name
                              ? 'border-green bg-cream text-green font-bold shadow-xs'
                              : 'border-line text-muted hover:border-gold'
                          }`}
                        >
                          <span className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: rib.color }} />
                          <span>{rib.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Celebration Coupon & Festive Offers Section */}
            <div className="border border-line rounded-[16px] p-[16px] bg-white flex flex-col gap-[12px] shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[28px] h-[28px] rounded-full bg-gold/15 text-gold flex items-center justify-center text-[13px]">
                    🏷️
                  </span>
                  <div>
                    <h4 className="text-[12.5px] font-bold text-green leading-tight">
                      Celebration Coupon & Offers
                    </h4>
                    <p className="text-[10px] text-muted">
                      Apply festive promo code for instant savings
                    </p>
                  </div>
                </div>
                {appliedCoupon && (
                  <span className="inline-flex items-center gap-[4px] px-[8px] py-[3px] rounded-full text-[10px] font-bold bg-[#2e7d32]/10 text-[#2e7d32] border border-[#2e7d32]/30">
                    ✓ Applied
                  </span>
                )}
              </div>

              {/* Input Form or Applied Banner */}
              {!appliedCoupon ? (
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. THAMBOOLAM10)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase())
                          if (couponMessage) setCouponMessage(null)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleApplyCoupon()
                          }
                        }}
                        className="w-full uppercase tracking-wider font-semibold bg-cream/40 border border-line rounded-[10px] px-[12px] py-[9.5px] text-[12px] text-ink placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-muted outline-none focus:border-green focus:bg-white transition-all"
                      />
                      {couponInput && (
                        <button
                          type="button"
                          onClick={() => { setCouponInput(''); setCouponMessage(null) }}
                          className="absolute right-[8px] top-1/2 -translate-y-1/2 text-muted hover:text-ink text-[12px] cursor-pointer p-[4px]"
                          title="Clear code"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="bg-green hover:bg-[#193a2a] text-white text-[12px] font-bold px-[18px] py-[10px] rounded-[10px] transition-all cursor-pointer shadow-xs shrink-0 active:scale-95"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Quick Offer Chips */}
                  <div className="flex flex-col gap-[5px] pt-[2px]">
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.06em] text-muted">
                      Available Celebration Offers:
                    </span>
                    <div className="flex flex-wrap gap-[6px]">
                      {CELEBRATION_COUPONS.map(c => {
                        const isEligible = (!c.minQty || quantity >= c.minQty) && (!c.minAmount || totalPrice >= c.minAmount)
                        return (
                          <button
                            type="button"
                            key={c.code}
                            onClick={() => handleApplyCoupon(c.code)}
                            className={`text-[10.5px] font-semibold px-[9px] py-[5px] rounded-[8px] border transition-all cursor-pointer flex items-center gap-[5px] ${
                              isEligible
                                ? 'bg-cream/70 border-gold/40 text-green hover:bg-gold/20 hover:border-gold shadow-2xs'
                                : 'bg-paper border-line text-muted opacity-70 hover:opacity-100'
                            }`}
                            title={c.description}
                          >
                            <span className="font-bold font-mono tracking-wider">{c.code}</span>
                            <span className="text-[9.5px] text-terracotta font-medium">({c.badge})</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Active Applied Coupon Card */
                <div className="bg-[#2e7d32]/8 border border-[#2e7d32]/30 rounded-[12px] p-[12px] flex items-center justify-between gap-[10px]">
                  <div className="flex items-center gap-[10px] min-w-0">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#2e7d32]/15 text-[#2e7d32] grid place-items-center shrink-0 text-[15px] font-bold">
                      ✓
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-[6px] flex-wrap">
                        <span className="font-mono text-[11.5px] font-bold bg-[#2e7d32] text-white px-[7px] py-[1.5px] rounded-[5px] tracking-wider">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[12px] font-bold text-[#2e7d32]">
                          Saved ₹{couponDiscount.toLocaleString('en-IN')}!
                        </span>
                      </div>
                      <p className="text-[10.5px] text-green/80 mt-[2px] truncate">
                        {appliedCoupon.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-[11px] font-bold text-terracotta hover:text-red-700 bg-white border border-line hover:border-terracotta px-[10px] py-[5px] rounded-[8px] cursor-pointer transition-all shrink-0 shadow-2xs"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}

              {/* Inline Feedback / Error message */}
              {couponMessage && (
                <div
                  className={`text-[11px] font-medium px-[10px] py-[6px] rounded-[8px] flex items-center gap-[6px] transition-all ${
                    couponMessage.type === 'success'
                      ? 'bg-[#2e7d32]/10 text-[#2e7d32] border border-[#2e7d32]/25'
                      : 'bg-terracotta/10 text-terracotta border border-terracotta/25'
                  }`}
                >
                  <span>{couponMessage.type === 'success' ? '✓' : '⚠️'}</span>
                  <span>{couponMessage.text}</span>
                </div>
              )}
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-col gap-[10px]">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-green hover:bg-[#193a2a] text-white text-[14px] font-bold py-[16px] px-[24px] rounded-[14px] transition-all shadow-custom flex items-center justify-center gap-[10px] cursor-pointer hover:scale-[1.01]"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4h2l2.3 11.5a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H6" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="18" cy="21" r="1" />
                </svg>
                <span className="flex items-center gap-[6px]">
                  <span>Add {quantity} Pieces to Bag • ₹{finalPrice.toLocaleString('en-IN')}</span>
                  {appliedCoupon && (
                    <span className="line-through text-white/65 font-normal text-[12px]">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </span>
              </button>

              {/* Added to bag feedback notification */}
              {addedNotice && (
                <div className="bg-[#2e7d32]/10 border border-[#2e7d32]/30 text-[#2e7d32] text-[12px] font-bold p-[10px] rounded-[10px] text-center flex items-center justify-center gap-[6px]">
                  <span>✓</span> Added {quantity} × {product.name} to your bag!
                </div>
              )}

              <div className="grid grid-cols-2 gap-[10px]">
                <a
                  href="#bulk"
                  className="w-full border border-green text-green hover:bg-green hover:text-white text-[12px] font-bold py-[12px] px-[14px] rounded-[12px] transition-colors text-center block"
                >
                  Custom Bulk Quote →
                </a>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20SSS%20Team%2C%20I%20am%20interested%20in%20ordering%20${quantity}%20pieces%20of%20${encodeURIComponent(product.name)}${appliedCoupon ? `%20with%20coupon%20${appliedCoupon.code}` : ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full border border-line bg-white hover:border-[#25D366] text-[#128c7e] hover:bg-[#25D366]/5 text-[12px] font-bold py-[12px] px-[14px] rounded-[12px] transition-colors flex items-center justify-center gap-[6px]"
                >
                  <span className="text-[14px]">💬</span> WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* Pincode checker */}
            <div className="border-t border-line pt-[16px]">
              <form onSubmit={handleCheckPincode} className="flex flex-col gap-[6px]">
                <label className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted">
                  Check Delivery & Dispatch to Your City
                </label>
                <div className="flex items-center gap-[8px]">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code (e.g. 600001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-line rounded-[8px] px-[12px] py-[8px] text-[12px] text-ink outline-none focus:border-green"
                  />
                  <button
                    type="submit"
                    className="bg-cream hover:bg-[#e8decb] text-green text-[11px] font-bold px-[14px] py-[9px] rounded-[8px] border border-line cursor-pointer transition-colors"
                  >
                    Check
                  </button>
                </div>
                {pincodeStatus && (
                  <p className={`text-[11px] mt-[4px] ${pincodeStatus.valid ? 'text-[#2e7d32]' : 'text-terracotta'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* ── Tabs Section (Story, Specs, What Fits, Care) ── */}
      <section className="py-[60px] bg-white border-y border-line">
        <div className="w-[min(1280px,calc(100%-48px))] mx-auto">

          {/* Tab Navigation */}
          <div className="flex items-center gap-[8px] border-b border-line pb-[12px] overflow-x-auto">
            {[
              { id: 'story', label: 'Story & Artisanal Craft' },
              { id: 'specs', label: 'Specifications & Sizing' },
              { id: 'packing', label: 'Thamboolam Packing Guide' },
              { id: 'care', label: 'Care & Preservation' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-[18px] py-[9px] text-[12px] font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-green text-white shadow-sm'
                    : 'bg-paper text-muted hover:text-green hover:bg-cream/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-[32px]">
            {activeTab === 'story' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] items-center">
                <div className="md:col-span-7 flex flex-col gap-[16px]">
                  <span className="uppercase tracking-[0.14em] text-[10px] font-bold text-terracotta">
                    Rooted in Indian Heritage
                  </span>
                  <h3 className="font-serif text-[28px] text-green leading-snug">
                    Crafted with purpose, weaving tradition into modern celebrations.
                  </h3>
                  <p className="text-[13.5px] text-[#4f534c] leading-[1.7]">
                    {product.longDesc || product.desc}
                  </p>
                  {product.features && product.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[10px]">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-[8px]">
                          <span className="text-gold font-bold text-[14px]">✦</span>
                          <span className="text-[12px] text-[#333a34] font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:col-span-5 rounded-[20px] overflow-hidden bg-[#e6e0d3] aspect-[4/3] border border-line">
                  <img
                    src={galleryImages[1] || product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-[800px]">
                <h4 className="font-serif text-[22px] text-green mb-[18px]">Product Dimensions & Material Details</h4>
                <div className="border border-line rounded-[14px] overflow-hidden">
                  <table className="w-full text-left text-[12.5px] border-collapse">
                    <tbody>
                      {product.specs && Object.entries(product.specs).map(([k, v], idx) => (
                        <tr key={k} className={idx % 2 === 0 ? 'bg-cream/40' : 'bg-white'}>
                          <th className="py-[12px] px-[16px] text-muted font-bold capitalize border-b border-line/60 w-[35%]">
                            {k}
                          </th>
                          <td className="py-[12px] px-[16px] text-ink border-b border-line/60 font-medium">
                            {v}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-white">
                        <th className="py-[12px] px-[16px] text-muted font-bold border-b border-line/60">
                          Recommended For
                        </th>
                        <td className="py-[12px] px-[16px] text-ink border-b border-line/60">
                          {product.occasions ? product.occasions.join(', ') : 'All Indian Festivities'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'packing' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                <div className="bg-paper border border-line rounded-[16px] p-[22px]">
                  <span className="text-[26px] block mb-[8px]">🥥</span>
                  <h4 className="font-serif text-[18px] text-green mb-[6px]">Standard Thamboolam</h4>
                  <p className="text-[12px] text-muted leading-relaxed">
                    Accommodates 1 full ritual coconut, 2 fresh betel leaves, supari (pakku), and a turmeric knot effortlessly.
                  </p>
                </div>
                <div className="bg-paper border border-line rounded-[16px] p-[22px]">
                  <span className="text-[26px] block mb-[8px]">🥜</span>
                  <h4 className="font-serif text-[18px] text-green mb-[6px]">Dry Fruits & Mithai</h4>
                  <p className="text-[12px] text-muted leading-relaxed">
                    Fits two 100g airtight glass jars with cashews and almonds, or a 250g traditional Mysore Pak/Laddu box.
                  </p>
                </div>
                <div className="bg-paper border border-line rounded-[16px] p-[22px]">
                  <span className="text-[26px] block mb-[8px]">🪔</span>
                  <h4 className="font-serif text-[18px] text-green mb-[6px]">Brass Keepsake Sets</h4>
                  <p className="text-[12px] text-muted leading-relaxed">
                    Pairs comfortably with our mini brass lotus diya or kumkum holder, plus sacred prasadam packets.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-[700px] flex flex-col gap-[14px]">
                <h4 className="font-serif text-[22px] text-green mb-[4px]">Preserving Handcrafted Fibers</h4>
                <p className="text-[13px] text-muted leading-relaxed">
                  Our products are woven with natural river grass, untreated jute, and authentic Varanasi silk brocades. To ensure they stay radiant:
                </p>
                <ul className="list-disc pl-[20px] text-[12.5px] text-[#4f534c] space-y-[8px]">
                  <li>Store in a clean, moisture-free ambient environment. Keep away from direct damp walls.</li>
                  <li>Spot clean gently with a slightly damp cotton swab if necessary. Do not machine wash or soak.</li>
                  <li>For silk brocade fabrics, use dry cleaning only if required.</li>
                  <li>Potlis can be folded flat without losing their bottom integrity.</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── Frequently Bought Together / Complementary Ensemble ── */}
      <section className="py-[60px]">
        <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
          <div className="bg-[#fcfaf5] border border-line rounded-[22px] p-[28px] md:p-[36px]">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-[16px] mb-[24px]">
              <div>
                <span className="uppercase tracking-[0.14em] text-[10px] font-bold text-terracotta block mb-[4px]">
                  Curated Coordination
                </span>
                <h3 className="font-serif text-green text-[26px] md:text-[32px] leading-tight">
                  Complete Your Thamboolam Ensemble
                </h3>
              </div>
              <p className="text-[12px] text-muted max-w-[340px]">
                Pair this bag with matching brass keepsakes & sweets box for a ready-to-handover return gift.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-center">
              {/* Product items cards */}
              <div className="md:col-span-8 flex flex-col sm:flex-row items-center gap-[14px]">
                {complementaryBundle.items.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-[14px] w-full sm:w-auto">
                    <div className="flex items-center gap-[12px] bg-white border border-line rounded-[14px] p-[12px] w-full sm:w-[200px]">
                      <img src={item.img} alt={item.name} className="w-[54px] h-[54px] rounded-[8px] object-cover bg-[#e6e0d3] shrink-0" />
                      <div>
                        <strong className="text-[11.5px] text-green font-bold block leading-snug line-clamp-1">{item.name}</strong>
                        <span className="text-[11px] text-muted font-serif">₹{item.price}</span>
                      </div>
                    </div>
                    {i < complementaryBundle.items.length - 1 && (
                      <span className="text-gold font-bold text-[18px] hidden sm:block">+</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bundle summary & CTA */}
              <div className="md:col-span-4 bg-white border border-line rounded-[16px] p-[18px] flex flex-col gap-[10px]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-muted">Ensemble Price:</span>
                  <div className="flex items-baseline gap-[6px]">
                    <span className="font-serif text-green text-[22px] font-bold">
                      ₹{complementaryBundle.discountedPrice}
                    </span>
                    <span className="text-[12px] text-muted line-through">
                      ₹{complementaryBundle.combinedPrice}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-terracotta font-bold">
                  Save ₹{complementaryBundle.bundleSavings} (12% Bundle Discount)
                </span>
                <button
                  type="button"
                  onClick={handleAddBundle}
                  className="w-full bg-gold hover:bg-gold/90 text-green font-bold text-[12px] py-[10px] rounded-[10px] transition-colors border-0 cursor-pointer shadow-xs"
                >
                  Add All 3 Items to Bag
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Customer Reviews: Direct & Clean Format ── */}
      <section className="py-[56px] border-t border-line bg-[#fcfaf6]" id="reviews">
        <div className="w-[min(1280px,calc(100%-48px))] mx-auto flex flex-col gap-[28px]">

          {/* Clean Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px] pb-[20px] border-b border-line">
            <div>
              <span className="uppercase tracking-[0.14em] text-[10px] font-bold text-terracotta block mb-[4px]">
                Host Feedback
              </span>
              <div className="flex items-center gap-[12px]">
                <h3 className="font-serif text-green text-[28px] sm:text-[34px] leading-none">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-[6px] bg-cream border border-gold/40 px-[11px] py-[4px] rounded-full">
                  <span className="text-gold text-[13px] leading-none">★</span>
                  <span className="font-serif font-bold text-[13px] text-green">{product.rating || '4.9'}</span>
                  <span className="text-[11px] text-muted">({reviewsList.length} verified)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="bg-green hover:bg-[#193a2a] text-white font-bold text-[12px] px-[20px] py-[10px] rounded-full transition-colors cursor-pointer self-start sm:self-auto shadow-xs flex items-center gap-[6px]"
            >
              <span>Write a Review</span>
              <span>✍️</span>
            </button>
          </div>

          {/* Direct Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-line rounded-[16px] p-[24px] flex flex-col justify-between shadow-xs hover:border-gold hover:shadow-custom hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  {/* Top: Stars + Date */}
                  <div className="flex items-center justify-between mb-[14px]">
                    <StarRating rating={rev.rating || 5} />
                    <span className="text-[11px] text-muted">{rev.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-[13px] text-[#2c332e] leading-[1.7] mb-[20px]">
                    “{rev.comment}”
                  </p>
                </div>

                {/* Footer: Author, Location & Event Badge */}
                <div className="border-t border-line/60 pt-[14px] flex items-center justify-between gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[34px] h-[34px] rounded-full bg-cream border border-gold/40 text-green font-serif font-bold text-[12px] grid place-items-center shrink-0">
                      {getInitials(rev.author)}
                    </div>
                    <div>
                      <div className="flex items-center gap-[6px]">
                        <strong className="text-green text-[13px] font-bold">
                          {rev.author}
                        </strong>
                        <span className="text-gold text-[11px]" title="Verified Buyer">✓</span>
                      </div>
                      {rev.city && (
                        <span className="text-[11px] text-muted block text-left">
                          {rev.city}
                        </span>
                      )}
                    </div>
                  </div>

                  {rev.event && (
                    <span className="text-[10px] font-bold bg-cream border border-gold/30 text-terracotta px-[9px] py-[3px] rounded-full shrink-0">
                      {rev.event}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Related Return Gifts Carousel/Grid ── */}
      {relatedProducts.length > 0 && (
        <section className="py-[60px]">
          <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
            <div className="flex items-center justify-between mb-[24px]">
              <div>
                <span className="uppercase tracking-[0.14em] text-[10px] font-bold text-terracotta block mb-[4px]">
                  More to Consider
                </span>
                <h3 className="font-serif text-green text-[28px] leading-tight">
                  Similar Gifts You May Like
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-[11.5px] font-bold text-green hover:underline cursor-pointer bg-transparent border-0"
              >
                View Full Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="group bg-paper border border-line rounded-[14px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-custom"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-[#e6e0d3]">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {p.tag && (
                        <span className="absolute top-[10px] right-[10px] bg-green text-white text-[9px] font-bold px-[8px] py-[3px] rounded-[4px] uppercase tracking-[0.05em]">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-[14px]">
                      <span className="text-[9px] uppercase tracking-[0.1em] font-bold text-terracotta block mb-[3px]">{p.type}</span>
                      <h4 className="font-serif text-[17px] text-green leading-snug group-hover:text-terracotta transition-colors">{p.name}</h4>
                      <div className="flex items-center gap-[4px] mt-[4px]">
                        <span className="text-gold text-[12px]">★</span>
                        <span className="text-[11px] font-bold text-gold">{p.rating}</span>
                        <span className="text-[10px] text-muted">({p.count})</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-[14px] pt-0 flex items-baseline justify-between">
                    <span className="font-serif text-[17px] font-bold text-green">₹{p.price}</span>
                    <span className="text-[11px] font-bold text-green hover:underline">View details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-[20px]"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-[900px] max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-[44px] right-0 text-white text-[28px] border-0 bg-transparent cursor-pointer"
            >
              ✕
            </button>
            <img
              src={galleryImages[activeImageIndex]}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain rounded-[14px] shadow-2xl"
            />
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-[8px] mt-[16px]">
                {galleryImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-[10px] h-[10px] rounded-full border-0 cursor-pointer transition-all ${
                      activeImageIndex === i ? 'bg-gold scale-125' : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Review Submission Modal ── */}
      {reviewModalOpen && (
        <div
          className="fixed inset-0 z-[3000] bg-black/50 backdrop-blur-xs flex items-center justify-center p-[16px]"
          onClick={() => setReviewModalOpen(false)}
        >
          <div
            className="bg-white rounded-[20px] max-w-[500px] w-full p-[28px] shadow-2xl border border-line"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-[14px] border-b border-line mb-[18px]">
              <h3 className="font-serif text-[22px] text-green">Write a Review</h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-[22px] text-muted border-0 bg-transparent cursor-pointer leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="flex flex-col gap-[14px]">
              <div>
                <label className="text-[11px] font-bold text-muted uppercase tracking-[0.05em] block mb-[4px]">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meera Raman"
                  value={newReviewAuthor}
                  onChange={e => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-paper border border-line rounded-[8px] px-[12px] py-[8px] text-[12.5px] outline-none focus:border-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-[10px]">
                <div>
                  <label className="text-[11px] font-bold text-muted uppercase tracking-[0.05em] block mb-[4px]">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai"
                    value={newReviewCity}
                    onChange={e => setNewReviewCity(e.target.value)}
                    className="w-full bg-paper border border-line rounded-[8px] px-[12px] py-[8px] text-[12.5px] outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted uppercase tracking-[0.05em] block mb-[4px]">
                    Celebration Event
                  </label>
                  <select
                    value={newReviewEvent}
                    onChange={e => setNewReviewEvent(e.target.value)}
                    className="w-full bg-paper border border-line rounded-[8px] px-[10px] py-[8px] text-[12.5px] outline-none focus:border-green cursor-pointer"
                  >
                    <option>Wedding</option>
                    <option>Housewarming</option>
                    <option>Upanayanam</option>
                    <option>Navaratri</option>
                    <option>Baby Shower</option>
                    <option>Birthday</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted uppercase tracking-[0.05em] block mb-[4px]">
                  Rating
                </label>
                <div className="flex items-center gap-[6px]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className={`text-[22px] border-0 bg-transparent cursor-pointer ${
                        star <= newReviewRating ? 'text-gold' : 'text-line'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-[12px] font-bold text-gold ml-[6px]">{newReviewRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted uppercase tracking-[0.05em] block mb-[4px]">
                  Your Experience / Feedback
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about the craftsmanship, guest reactions, packing, and delivery..."
                  value={newReviewComment}
                  onChange={e => setNewReviewComment(e.target.value)}
                  className="w-full bg-paper border border-line rounded-[8px] p-[12px] text-[12.5px] outline-none focus:border-green"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green hover:bg-[#1a382a] text-white font-bold text-[13px] py-[12px] rounded-[10px] transition-colors border-0 cursor-pointer mt-[6px]"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
