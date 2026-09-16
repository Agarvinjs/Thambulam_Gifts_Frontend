import { useState } from 'react'
import { useCart } from '../context/CartContext'

function BrandMark() {
  return (
    <svg className="w-[28px] h-[28px]" viewBox="0 0 30 30" fill="none">
      <path d="M15 2C9 6.6 5.5 11.2 5.5 16 5.5 21.3 9.6 25 15 25s9.5-3.7 9.5-9c0-4.8-3.5-9.4-9.5-14Z" fill="#B58B51" />
      <path d="M15 24V10" stroke="#234735" strokeWidth="1.5" />
    </svg>
  )
}

/* ── Megamenu data ─────────────────────────────── */
const NAV_ITEMS = [
  {
    label: 'Return Gifts',
    cols: [
      { heading: 'By Price', links: [{ label: 'Under ₹99', href: '#budget' }, { label: '₹100–149', href: '#budget' }, { label: '₹150–249', href: '#budget' }, { label: 'Premium gifts', href: '#budget' }] },
      { heading: 'By Type', links: [{ label: 'Potli bags', href: '#products' }, { label: 'Utility gifts', href: '#products' }, { label: 'Gift boxes', href: '#products' }, { label: 'Eco-friendly', href: '#products' }] },
      { heading: 'By Occasion', links: [{ label: 'Wedding', href: '#occasions' }, { label: 'Housewarming', href: '#occasions' }, { label: 'Birthday', href: '#occasions' }, { label: 'Pooja & festivals', href: '#occasions' }] },
      { promo: true, tag: 'The SSS Edit', title: 'Gifts that feel considered.' },
    ],
  },
  {
    label: 'Favour Bags',
    cols: [
      { heading: 'Styles', links: [{ label: 'Potli', href: '#products' }, { label: 'Drawstring', href: '#products' }, { label: 'Jute', href: '#products' }, { label: 'Cloth', href: '#products' }] },
      { heading: 'Popular', links: [{ label: 'Thamboolam bags', href: '#products' }, { label: 'Wedding bags', href: '#products' }, { label: 'Festive bags', href: '#products' }, { label: 'Kids favours', href: '#products' }] },
      { heading: 'Shop by Budget', links: [{ label: 'Under ₹49', href: '#budget' }, { label: 'Under ₹99', href: '#budget' }, { label: 'Under ₹149', href: '#budget' }, { label: 'Premium', href: '#budget' }] },
      { promo: true, tag: 'Bestseller', title: 'Potlis, dressed up.' },
    ],
  },
  {
    label: 'Gift Boxes',
    cols: [
      { heading: 'Materials', links: [{ label: 'Kora grass', href: '#products' }, { label: 'Jute', href: '#products' }, { label: 'Banana fibre', href: '#products' }, { label: 'Screwpine', href: '#products' }] },
      { heading: 'Styles', links: [{ label: 'Round boxes', href: '#products' }, { label: 'Jewel boxes', href: '#products' }, { label: 'Magnetic boxes', href: '#products' }, { label: 'Curated sets', href: '#products' }] },
      { heading: 'For Weddings', links: [{ label: 'Seer boxes', href: '#products' }, { label: 'Saree boxes', href: '#products' }, { label: 'Bakshanam boxes', href: '#products' }, { label: 'Premium gifting', href: '#products' }] },
      { promo: true, tag: 'New', title: 'Natural textures, modern forms.' },
    ],
  },
  {
    label: 'By Occasion',
    cols: [
      { heading: 'Weddings', links: [{ label: 'Wedding', href: '#occasions' }, { label: 'Engagement', href: '#occasions' }, { label: 'Mehendi', href: '#occasions' }, { label: 'Sangeeth', href: '#occasions' }] },
      { heading: 'Family', links: [{ label: 'Housewarming', href: '#occasions' }, { label: 'Birthday', href: '#occasions' }, { label: 'Baby shower', href: '#occasions' }, { label: 'Thank you', href: '#occasions' }] },
      { heading: 'Festivals', links: [{ label: 'Navaratri', href: '#occasions' }, { label: 'Varalakshmi', href: '#occasions' }, { label: 'Diwali', href: '#occasions' }, { label: 'Pooja', href: '#occasions' }] },
      { promo: true, tag: 'Celebrations', title: 'One place. Every reason to gift.' },
    ],
  },
  { label: 'By Budget', href: '#budget', simple: true },
  { label: 'Bulk Orders', href: '#bulk', simple: true },
]

export default function Navbar({ onCartOpen, onSearchToggle, onNavigateHome }) {
  const { cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (onNavigateHome) {
      onNavigateHome()
    } else {
      window.location.hash = ''
    }
  }

  const handleNavClick = () => {
    if (onNavigateHome) {
      onNavigateHome()
    }
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-[1000]">

      {/* ── Layer 1: Brand bar ── */}
      <div className="bg-paper/96 backdrop-blur-[14px] border-b border-line">
        <div className="w-[min(1440px,calc(100%-48px))] mx-auto h-[56px] flex items-center justify-between gap-[16px]">

          {/* LEFT — Logo + mobile hamburger */}
          <div className="flex items-center gap-[10px]">
            <button
              className="w-[34px] h-[34px] border-0 bg-transparent text-green grid place-items-center md:hidden"
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Menu"
            >
              <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <a href="#" onClick={handleLogoClick} className="flex items-center gap-[9px] text-green cursor-pointer">
              <BrandMark />
              <span className="font-serif text-[29px] leading-none">SSS</span>
            </a>
          </div>

          {/* RIGHT — Action icons */}
          <div className="flex items-center gap-[2px] justify-end">
            <button className="w-[36px] h-[36px] border-0 bg-transparent text-green grid place-items-center" aria-label="Search" onClick={onSearchToggle}>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />
              </svg>
            </button>
            <button className="w-[36px] h-[36px] border-0 bg-transparent text-green grid place-items-center" aria-label="Wishlist">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M20.8 8.7c0-2.8-2.2-5-5-5-1.8 0-3.2.8-4 2.2-.8-1.4-2.2-2.2-4-2.2-2.8 0-5 2.2-5 5 0 5 9 10.3 9 10.3s9-5.3 9-10.3Z" />
              </svg>
            </button>
            <button className="w-[36px] h-[36px] border-0 bg-transparent text-green grid place-items-center relative" aria-label="Cart" onClick={onCartOpen}>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 4h2l2.3 11.5a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H6" />
                <circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-[2px] right-[2px] w-[15px] h-[15px] rounded-full grid place-items-center bg-terracotta text-white text-[8px] font-bold">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Layer 2: Megamenu nav bar ── */}
      <div className="hidden md:block bg-[#3f654f]">
        <div className="w-[min(1440px,calc(100%-48px))] mx-auto">
          <nav className="flex items-center justify-center gap-[0px]">
            {NAV_ITEMS.map((item) =>
              item.simple ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="px-[18px] py-[11px] text-[11.5px] font-bold text-white/85 whitespace-nowrap hover:text-[#e9c687] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <div key={item.label} className="group relative">
                  <button className="px-[18px] py-[11px] text-[11.5px] font-bold text-white/85 whitespace-nowrap border-0 bg-transparent cursor-pointer flex items-center gap-[4px] hover:text-[#e9c687] transition-colors">
                    {item.label}
                    <svg className="w-[10px] h-[10px] opacity-50 group-hover:opacity-100 transition-all duration-200 group-hover:rotate-180" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 3.5 5 6.5 8 3.5" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div className="
                    invisible opacity-0 group-hover:visible group-hover:opacity-100
                    absolute left-1/2 -translate-x-1/2 top-[calc(100%+1px)]
                    w-[740px] bg-white border border-line rounded-[16px] p-[28px]
                    shadow-[0_20px_60px_rgba(35,71,53,0.13)]
                    grid grid-cols-[1fr_1fr_1fr_1.15fr] gap-[28px]
                    transition-all duration-200 ease-out
                    translate-y-[6px] group-hover:translate-y-0
                    z-[1001]
                  ">
                    {item.cols.map((col, ci) =>
                      col.promo ? (
                        <div key={ci} className="bg-gradient-to-br from-[#315d45] to-[#193a2a] text-white rounded-[12px] p-[20px] flex flex-col justify-end min-h-[160px]">
                          <span className="text-[9.5px] uppercase tracking-[0.15em] font-bold text-[#e9c687] mb-[8px]">{col.tag}</span>
                          <h4 className="font-serif text-[22px] leading-[1.1]">{col.title}</h4>
                        </div>
                      ) : (
                        <div key={ci}>
                          <h5 className="text-[9.5px] uppercase tracking-[0.12em] text-terracotta mb-[14px] font-bold">{col.heading}</h5>
                          {col.links.map(link => (
                            <a key={link.label} href={link.href} onClick={handleNavClick} className="block text-[11.5px] py-[5px] text-[#50534d] hover:text-green transition-colors">
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </nav>
        </div>
      </div>

      {/* ── Mobile slide-down nav ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-line px-[20px] py-[14px] flex flex-col gap-[4px]">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href || '#'}
              className="py-[9px] text-[12px] font-bold text-[#39443c] border-b border-line/50 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
