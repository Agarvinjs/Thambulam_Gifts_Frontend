import { useState, useEffect, useCallback } from 'react'
import { CartProvider } from './context/CartContext'
import PRODUCTS from './data/products'

import Navbar            from './components/Navbar'
import SearchBar         from './components/SearchBar'
import HeroSignature     from './components/HeroSignature'
import MovingRibbon      from './components/MovingRibbon'
import CategoryRow       from './components/CategoryRow'
import FeatureCards      from './components/FeatureCards'
import ProductShelf      from './components/ProductShelf'
import ProductDetailPage from './components/ProductDetailPage'
import Editorial         from './components/Editorial'
import DanglerPrevail    from './components/DanglerPrevail'
import BudgetSection     from './components/BudgetSection'
import OccasionSection   from './components/OccasionSection'
import BulkQuoteSection  from './components/BulkQuoteSection'
import ReviewsSection    from './components/ReviewsSection'
import Newsletter        from './components/Newsletter'
import Footer            from './components/Footer'
import CartDrawer        from './components/CartDrawer'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Parse product ID from hash (supports #product-1 or #product/1)
  const getProductFromHash = useCallback(() => {
    const hash = window.location.hash
    const match = hash.match(/^#product[-/](\d+)/)
    if (match) {
      const id = parseInt(match[1], 10)
      return PRODUCTS.find(p => p.id === id) || null
    }
    return null
  }, [])

  // Sync state on hash change (browser back/forward & direct links)
  useEffect(() => {
    const initialProduct = getProductFromHash()
    if (initialProduct) {
      setSelectedProduct(initialProduct)
    }

    const handleHashChange = () => {
      const prod = getProductFromHash()
      setSelectedProduct(prod)
      if (!prod && window.location.hash.startsWith('#product')) {
        // If invalid product hash, reset
        setSelectedProduct(null)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [getProductFromHash])

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    window.location.hash = `product-${product.id}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToCatalog = () => {
    setSelectedProduct(null)
    window.location.hash = 'products'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchToggle = () => {
    setSearchVisible(v => !v)
    if (searchVisible) setSearchQuery('')
  }

  const handleSearch = (q) => {
    setSearchQuery(q)
    if (selectedProduct && q.trim()) {
      // If user searches while on product detail, return to shelf
      setSelectedProduct(null)
      window.location.hash = 'products'
    }
  }

  return (
    <CartProvider>
      <Navbar
        onCartOpen={() => { setCartOpen(true); document.body.style.overflow = 'hidden' }}
        onSearchToggle={handleSearchToggle}
        onNavigateHome={handleBackToCatalog}
      />

      <SearchBar visible={searchVisible} onSearch={handleSearch} />

      {selectedProduct ? (
        <main>
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => { setCartOpen(true); document.body.style.overflow = 'hidden' }}
          />
          <Newsletter />
        </main>
      ) : (
        <main id="shop">
          <HeroSignature />
          <MovingRibbon />
          <CategoryRow />
          <FeatureCards />
          <ProductShelf searchQuery={searchQuery} onSelectProduct={handleSelectProduct} />
          <Editorial />
          <DanglerPrevail onSelectProduct={handleSelectProduct} />
          <BudgetSection />
          <OccasionSection />
          <BulkQuoteSection />
          <ReviewsSection />
          <Newsletter />
        </main>
      )}

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => { setCartOpen(false); document.body.style.overflow = '' }}
        onSelectProduct={handleSelectProduct}
      />
    </CartProvider>
  )
}
