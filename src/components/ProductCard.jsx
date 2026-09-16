import { useCart } from '../context/CartContext'

function StarRating({ rating }) {
  const full = Math.floor(Number(rating))
  const half = Number(rating) - full >= 0.5
  return (
    <span className="inline-flex items-center gap-[1px]">
      {[...Array(5)].map((_, i) => {
        if (i < full) return <span key={i} className="text-gold text-[13px] leading-none">★</span>
        if (i === full && half) return <span key={i} className="text-gold text-[13px] leading-none opacity-60">★</span>
        return <span key={i} className="text-muted/30 text-[13px] leading-none">★</span>
      })}
    </span>
  )
}

export default function ProductCard({ p, onSelectProduct }) {
  const { addToCart } = useCart()

  // Calculate discount %
  const discountPct = p.mrp && p.price
    ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
    : null

  const handleClickCard = () => {
    if (onSelectProduct) {
      onSelectProduct(p)
    }
  }

  const minQty = p.minOrderQty || 15

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(p, minQty)
  }

  return (
    <article
      onClick={handleClickCard}
      className="group bg-paper border border-line rounded-[16px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-custom cursor-pointer"
    >
      <div>
        {/* Product Image with Discount + Badge overlays */}
        <div className="relative aspect-square overflow-hidden bg-[#e6e0d3]">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount badge — top left */}
          {discountPct > 0 && (
            <span className="absolute top-[10px] left-[10px] bg-terracotta text-white text-[10px] font-bold px-[8px] py-[3px] rounded-[5px] uppercase tracking-[0.04em] shadow-sm">
              {discountPct}% OFF
            </span>
          )}

          {/* Tag badge — top right (Bestseller, New, etc.) */}
          {p.tag && (
            <span className="absolute top-[10px] right-[10px] bg-green text-white text-[9px] font-bold px-[8px] py-[3px] rounded-[4px] uppercase tracking-[0.05em] shadow-sm">
              {p.tag}
            </span>
          )}

          {/* Subtle View Details overlay hint on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-[11px] font-bold text-white tracking-wide flex items-center justify-center gap-[4px]">
              View Details & Bulk Pricing →
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-[16px]">
          <div className="flex items-center justify-between mb-[4px]">
            <span className="text-[9.5px] uppercase tracking-[0.1em] font-bold text-terracotta">
              {p.category || p.type}
            </span>
            {p.bulkTiers && (
              <span className="text-[9px] text-muted font-medium bg-cream px-[6px] py-[2px] rounded">
                Bulk from ₹{p.bulkTiers[p.bulkTiers.length - 1].price}
              </span>
            )}
          </div>

          <h3 className="font-serif text-[18px] text-green mb-[6px] leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
            {p.name}
          </h3>

          {/* Star Rating + Review Count */}
          {p.rating && (
            <div className="flex items-center gap-[5px] mb-[6px]">
              <StarRating rating={p.rating} />
              <span className="text-[11px] font-bold text-gold">{p.rating}</span>
              {p.count && (
                <span className="text-[10.5px] text-muted">({p.count})</span>
              )}
            </div>
          )}

          {p.desc && (
            <p className="text-[11.5px] text-muted line-clamp-2 leading-relaxed">
              {p.desc}
            </p>
          )}

          {/* Stock Availability & Minimum Order Info */}
          <div className="flex items-center justify-between text-[10.5px] mt-[8px] pt-[8px] border-t border-line/40">
            <span className="flex items-center gap-[4px] text-[#2e7d32] font-semibold">
              <span className="w-[6px] h-[6px] rounded-full bg-[#2e7d32]"></span>
              {p.availableStock || 450} in stock
            </span>
            <span className="font-bold text-terracotta bg-terracotta/10 px-[6px] py-[1.5px] rounded text-[9.5px]">
              Min: {minQty} pcs
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Price + CTA */}
      <div className="px-[16px] pb-[16px] pt-[8px] flex items-center justify-between border-t border-line/40">
        <div className="flex items-baseline gap-[6px]">
          <span className="font-serif text-[19px] font-bold text-green">₹{p.price}</span>
          {p.mrp && (
            <span className="text-[11px] text-muted line-through">₹{p.mrp}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-green text-white text-[11px] font-bold px-[13px] py-[8px] rounded-[8px] border-0 cursor-pointer hover:bg-[#1a382a] transition-all flex items-center gap-[4px] hover:scale-105"
          title={`Add minimum ${minQty} pieces`}
        >
          <span>+</span>
          <span>Add {minQty}</span>
        </button>
      </div>
    </article>
  )
}
