import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ p }) {
  const { addToCart } = useCart()
  const [liked, setLiked] = useState(false)

  return (
    <article className="group bg-paper border border-line rounded-[14px] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-custom hover:border-green">
      <div>
        <div className="relative aspect-square overflow-hidden bg-[#e6e0d3]">
          <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <button
            onClick={() => setLiked(!liked)}
            className={`absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-full border-0 grid place-items-center cursor-pointer transition-colors ${liked ? 'bg-terracotta text-white' : 'bg-white/80 text-ink hover:bg-white'}`}
          >
            ♥
          </button>
          {p.badge && (
            <span className="absolute bottom-[10px] left-[10px] bg-green text-white text-[9px] font-bold px-[8px] py-[3px] rounded-[4px] uppercase tracking-[0.05em]">
              {p.badge}
            </span>
          )}
        </div>
        <div className="p-[16px]">
          <span className="text-[9.5px] uppercase tracking-[0.1em] font-bold text-terracotta block mb-[4px]">{p.category}</span>
          <h3 className="font-serif text-[18px] text-green mb-[6px] leading-snug">{p.name}</h3>
          <p className="text-[11px] text-muted line-clamp-2 leading-relaxed mb-[12px]">{p.desc}</p>
        </div>
      </div>
      <div className="px-[16px] pb-[16px] flex items-center justify-between border-t border-line/60 pt-[12px]">
        <div>
          <span className="font-serif text-[18px] font-bold text-green">₹{p.price}</span>
          {p.originalPrice && <span className="text-[11px] text-muted line-through ml-[6px]">₹{p.originalPrice}</span>}
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
