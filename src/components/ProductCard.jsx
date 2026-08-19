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

export default function ProductCard({ p }) {
  const { addToCart } = useCart()

  // Calculate discount %
  const discountPct = p.mrp && p.price
    ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
    : null

  return (
    <article className="group bg-paper border border-line rounded-[14px] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-custom">
      <div>
        {/* Product Image with Discount + Badge overlays */}
        <div className="relative aspect-square overflow-hidden bg-[#e6e0d3]">
          <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

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
        </div>

        {/* Card Body */}
        <div className="p-[16px]">
          <span className="text-[9.5px] uppercase tracking-[0.1em] font-bold text-terracotta block mb-[4px]">{p.type}</span>
          <h3 className="font-serif text-[18px] text-green mb-[5px] leading-snug">{p.name}</h3>

          {/* Star Rating + Review Count */}
          {p.rating && (
            <div className="flex items-center gap-[5px]">
              <StarRating rating={p.rating} />
              <span className="text-[11px] font-bold text-gold">{p.rating}</span>
              {p.count && (
                <span className="text-[10.5px] text-muted">({p.count} reviews)</span>
              )}
            </div>
          )}

          <p className="text-[11px] text-muted line-clamp-2 leading-relaxed" />
        </div>
      </div>

      {/* Footer: Price + CTA */}
      <div className="px-[16px] pb-[16px] flex items-center justify-between">
        <div className="flex items-baseline gap-[6px]">
          <span className="font-serif text-[18px] font-bold text-green">₹{p.price}</span>
          {p.mrp && (
            <span className="text-[11px] text-muted line-through">₹{p.mrp}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(p)}
          className="bg-green text-white text-[11px] font-bold px-[14px] py-[8px] rounded-[6px] border-0 cursor-pointer hover:bg-[#1a382a] transition-colors"
        >
          Add to bag
        </button>
      </div>
    </article>
  )
}
