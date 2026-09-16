import { useState, useMemo } from 'react'
import PRODUCTS from '../data/products'
import ProductCard from './ProductCard'

const CATEGORIES = ['All', 'Potli Bags', 'Gift Boxes', 'Jute & Fibre', 'Utility Gifts', 'Traditional Sets']

export default function ProductShelf({ searchQuery = '', onSelectProduct }) {
  const [activeCat, setActiveCat] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCat === 'All' || (p.category && p.category.toLowerCase() === activeCat.toLowerCase())
      const q = searchQuery.toLowerCase().trim()
      const matchSearch = !q ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q))
      return matchCat && matchSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0)
      return 0
    })
  }, [activeCat, searchQuery, sortBy])

  return (
    <section className="pb-[78px]" id="products">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-[20px] items-start md:items-end mb-[28px]">
          <div>
            <div className="flex items-center gap-[8px] mb-[7px]">
              <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta block">
                Curated Collection
              </span>
              <span className="text-muted text-[11px] font-medium">
                ({filteredProducts.length} items)
              </span>
            </div>
            <h2 className="font-serif text-green text-[38px] leading-none">Thoughtful Return Gifts</h2>
          </div>

          <div className="flex flex-wrap items-center gap-[10px] w-full md:w-auto">
            <div className="flex bg-[#e6e0d3]/60 p-[3px] rounded-[8px] overflow-x-auto w-full sm:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-[12px] py-[6px] text-[11px] font-bold rounded-[6px] border-0 cursor-pointer transition-colors whitespace-nowrap ${
                    activeCat === cat ? 'bg-green text-white' : 'bg-transparent text-ink hover:text-green'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-paper border border-line rounded-[8px] px-[10px] py-[6px] text-[11px] font-bold text-ink outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-[60px] text-center text-muted font-sans text-[13px] bg-cream/40 rounded-[16px] border border-line">
            No return gifts found matching your criteria. Try another filter or clear search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} p={p} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
