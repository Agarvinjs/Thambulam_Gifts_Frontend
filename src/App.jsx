import { useState } from 'react'
import { CartProvider } from './context/CartContext'


import Navbar            from './components/Navbar'
import SearchBar         from './components/SearchBar'
import HeroSignature     from './components/HeroSignature'
import MovingRibbon      from './components/MovingRibbon'
import CategoryRow       from './components/CategoryRow'
import FeatureCards      from './components/FeatureCards'
import ProductShelf      from './components/ProductShelf'
import Editorial         from './components/Editorial'
import BudgetSection     from './components/BudgetSection'
import OccasionSection   from './components/OccasionSection'
import BulkQuoteSection  from './components/BulkQuoteSection'
import ReviewsSection    from './components/ReviewsSection'
import Newsletter        from './components/Newsletter'
import Footer            from './components/Footer'
import CartDrawer        from './components/CartDrawer'

export default function App() {
  const [cartOpen, setCartOpen]       = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchToggle = () => {
    setSearchVisible(v => !v)
    if (searchVisible) setSearchQuery('')
  }

  const handleSearch = (q) => setSearchQuery(q)

  return (
    <CartProvider>


      <Navbar
        onCartOpen={() => { setCartOpen(true); document.body.style.overflow = 'hidden' }}
        onSearchToggle={handleSearchToggle}
      />

      <SearchBar visible={searchVisible} onSearch={handleSearch} />

      <main id="shop">
        <HeroSignature />
        <MovingRibbon />
        <CategoryRow />
        <FeatureCards />
        <ProductShelf searchQuery={searchQuery} />
        <Editorial />
        <BudgetSection />
        <OccasionSection />
        <BulkQuoteSection />
        <ReviewsSection />
        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => { setCartOpen(false); document.body.style.overflow = '' }}
      />
    </CartProvider>
  )
}
