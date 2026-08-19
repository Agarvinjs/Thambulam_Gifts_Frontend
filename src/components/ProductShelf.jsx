import { useState, useMemo } from 'react'
import PRODUCTS from '../data/products'
import ProductCard from './ProductCard'

const CATEGORIES = ['All', 'Potli Bags', 'Gift Boxes', 'Jute & Fibre', 'Utility Gifts']

export default function ProductShelf({ searchQuery = '' }) {
  const [activeCat, setActiveCat] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCat === 'All' || p.category.toLowerCase() === activeCat.toLowerCase()
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })
  }, [activeCat, searchQuery, sortBy])

  return (
    <section className="pb-[78px]" id="products">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-[20px] items-start md:items-end mb-[28px]">
          <div>
            <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[7px] block">Curated collection</span>
            <h2 className="font-serif text-green text-[38px] leading-none">Thoughtful Return Gifts</h2>
          </div>
          <div className="flex flex-wrap items-center gap-[10px] w-full md:w-auto">
            <div className="flex bg-[#e6e0d3]/60 p-[3px] rounded-[8px] overflow-x-auto w-full sm:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-[12px] py-[6px] text-[11px] font-bold rounded-[6px] border-0 cursor-pointer transition-colors whitespace-nowrap ${activeCat === cat ? 'bg-green text-white' : 'bg-transparent text-ink hover:text-green'}`}
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
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-[60px] text-center text-muted font-sans text-[13px]">
            No return gifts found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
