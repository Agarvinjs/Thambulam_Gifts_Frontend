import { useState } from 'react'
import { useCart } from '../context/CartContext'

function BrandMark() {
  return (
    <svg className="w-[30px] h-[30px]" viewBox="0 0 30 30" fill="none">
      <path d="M15 2C9 6.6 5.5 11.2 5.5 16 5.5 21.3 9.6 25 15 25s9.5-3.7 9.5-9c0-4.8-3.5-9.4-9.5-14Z" fill="#B58B51" />
      <path d="M15 24V10" stroke="#234735" strokeWidth="1.5" />
    </svg>
  )
}

export default function Navbar({ onCartOpen, onSearchToggle }) {
  const { cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => setMobileOpen(prev => !prev)

  return (
    <header className="sticky top-0 z-[1000] bg-paper/96 backdrop-blur-[14px] border-b border-line">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto h-[74px] grid grid-cols-[auto_1fr_auto] md:grid-cols-[175px_minmax(0,1fr)_175px] items-center gap-[18px] min-w-0">
        <button
          className="w-[35px] h-[35px] border-0 bg-transparent text-green grid place-items-center relative md:hidden"
          onClick={toggleMobile}
          aria-label="Menu"
        >
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <a href="#" className="flex items-center gap-[10px] text-green">
          <BrandMark />
          <span className="font-serif text-[31px]">Ilai</span>
        </a>

        <nav
          id="mainNav"
          className={`
            ${mobileOpen
              ? 'flex flex-col items-start absolute top-[62px] left-[14px] right-[14px] p-[18px] bg-white border border-line rounded-[10px] z-[999]'
              : 'hidden md:flex'
            }
            md:flex-row md:static md:p-0 md:bg-transparent md:border-none md:items-center md:justify-center gap-[22px] min-w-0 flex-nowrap whitespace-nowrap
          `}
        >
          <div className="group relative flex items-center h-[74px] shrink-0">
            <a href="#shop" className="text-[11.5px] font-bold text-[#39443c] whitespace-nowrap inline-flex items-center shrink-0 after:content-['⌄'] after:ml-[5px] after:text-[10px]">
              Return Gifts
            </a>
            <div className="hidden group-hover:grid absolute left-1/2 -translate-x-1/2 top-[66px] w-[720px] bg-white border border-line rounded-[14px] p-[24px] shadow-custom grid-cols-[1fr_1fr_1fr_1.15fr] gap-[24px] z-[1001]">
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">By price</h5>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Under ₹99</a>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">₹100–149</a>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">₹150–249</a>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Premium gifts</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">By type</h5>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Potli bags</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Utility gifts</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Gift boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Eco-friendly</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">By occasion</h5>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Wedding</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Housewarming</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Birthday</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Pooja &amp; festivals</a>
              </div>
              <div className="bg-gradient-to-br from-[#315d45] to-[#193a2a] text-white rounded-[12px] p-[20px] min-h-[145px] flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.13em] font-bold text-[#e9c687] mb-[8px]">The Ilai Edit</span>
                <h4 className="font-serif text-[24px] leading-[1.05]">Gifts that feel considered.</h4>
              </div>
            </div>
          </div>

          <div className="group relative flex items-center h-[74px] shrink-0">
            <a href="#products" className="text-[11.5px] font-bold text-[#39443c] whitespace-nowrap inline-flex items-center shrink-0 after:content-['⌄'] after:ml-[5px] after:text-[10px]">
              Favour Bags
            </a>
            <div className="hidden group-hover:grid absolute left-1/2 -translate-x-1/2 top-[66px] w-[720px] bg-white border border-line rounded-[14px] p-[24px] shadow-custom grid-cols-[1fr_1fr_1fr_1.15fr] gap-[24px] z-[1001]">
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Styles</h5>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Potli</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Drawstring</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Jute</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Cloth</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Popular</h5>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Thamboolam bags</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Wedding bags</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Festive bags</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Kids favours</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Shop by budget</h5>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Under ₹49</a>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Under ₹99</a>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Under ₹149</a>
                <a href="#budget" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Premium</a>
              </div>
              <div className="bg-gradient-to-br from-[#315d45] to-[#193a2a] text-white rounded-[12px] p-[20px] min-h-[145px] flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.13em] font-bold text-[#e9c687] mb-[8px]">Bestseller</span>
                <h4 className="font-serif text-[24px] leading-[1.05]">Potlis, dressed up.</h4>
              </div>
            </div>
          </div>

          <div className="group relative flex items-center h-[74px] shrink-0">
            <a href="#products" className="text-[11.5px] font-bold text-[#39443c] whitespace-nowrap inline-flex items-center shrink-0 after:content-['⌄'] after:ml-[5px] after:text-[10px]">
              Gift Boxes
            </a>
            <div className="hidden group-hover:grid absolute left-1/2 -translate-x-1/2 top-[66px] w-[720px] bg-white border border-line rounded-[14px] p-[24px] shadow-custom grid-cols-[1fr_1fr_1fr_1.15fr] gap-[24px] z-[1001]">
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Materials</h5>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Kora grass</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Jute</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Banana fibre</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Screwpine</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Styles</h5>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Round boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Jewel boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Magnetic boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Curated sets</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">For weddings</h5>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Seer boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Saree boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Bakshanam boxes</a>
                <a href="#products" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Premium gifting</a>
              </div>
              <div className="bg-gradient-to-br from-[#315d45] to-[#193a2a] text-white rounded-[12px] p-[20px] min-h-[145px] flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.13em] font-bold text-[#e9c687] mb-[8px]">New</span>
                <h4 className="font-serif text-[24px] leading-[1.05]">Natural textures, modern forms.</h4>
              </div>
            </div>
          </div>

          <div className="group relative flex items-center h-[74px] shrink-0">
            <a href="#occasions" className="text-[11.5px] font-bold text-[#39443c] whitespace-nowrap inline-flex items-center shrink-0 after:content-['⌄'] after:ml-[5px] after:text-[10px]">
              By Occasion
            </a>
            <div className="hidden group-hover:grid absolute left-1/2 -translate-x-1/2 top-[66px] w-[720px] bg-white border border-line rounded-[14px] p-[24px] shadow-custom grid-cols-[1fr_1fr_1fr_1.15fr] gap-[24px] z-[1001]">
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Weddings</h5>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Wedding</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Engagement</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Mehendi</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Sangeeth</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Family</h5>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Housewarming</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Birthday</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Baby shower</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Thank you</a>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.1em] text-terracotta mb-[12px] font-bold">Festivals</h5>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Navaratri</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Varalakshmi</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Diwali</a>
                <a href="#occasions" className="block text-[11px] py-[6px] text-[#50534d] hover:text-green">Pooja</a>
              </div>
              <div className="bg-gradient-to-br from-[#315d45] to-[#193a2a] text-white rounded-[12px] p-[20px] min-h-[145px] flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.13em] font-bold text-[#e9c687] mb-[8px]">Celebrations</span>
                <h4 className="font-serif text-[24px] leading-[1.05]">One place. Every reason to gift.</h4>
              </div>
            </div>
          </div>

          <a href="#budget" className="text-[11.5px] font-bold text-[#39443c] whitespace-nowrap inline-flex items-center shrink-0">By Budget</a>
          <a href="#bulk" className="text-[11.5px] font-bold text-[#39443c] whitespace-nowrap inline-flex items-center shrink-0">Bulk Orders</a>
        </nav>

        <div className="flex justify-end gap-[8px]">
          <button className="w-[35px] h-[35px] border-0 bg-transparent text-green grid place-items-center relative" aria-label="Search" onClick={onSearchToggle}>
            <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>
          <button className="w-[35px] h-[35px] border-0 bg-transparent text-green grid place-items-center relative" aria-label="Wishlist">
            <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M20.8 8.7c0-2.8-2.2-5-5-5-1.8 0-3.2.8-4 2.2-.8-1.4-2.2-2.2-4-2.2-2.8 0-5 2.2-5 5 0 5 9 10.3 9 10.3s9-5.3 9-10.3Z" />
            </svg>
          </button>
          <button className="w-[35px] h-[35px] border-0 bg-transparent text-green grid place-items-center relative" aria-label="Cart" onClick={onCartOpen}>
            <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 4h2l2.3 11.5a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H6" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
            <span className="absolute top-0 -right-[2px] w-[15px] h-[15px] rounded-full grid place-items-center bg-terracotta text-white text-[8px] font-bold">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
