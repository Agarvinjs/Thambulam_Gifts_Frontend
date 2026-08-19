function BrandMark({ strokeColor = '#dbe4dd' }) {
  return (
    <svg className="w-[28px] h-[28px]" viewBox="0 0 30 30" fill="none">
      <path d="M15 2C9 6.6 5.5 11.2 5.5 16 5.5 21.3 9.6 25 15 25s9.5-3.7 9.5-9c0-4.8-3.5-9.4-9.5-14Z" fill="#B58B51" />
      <path d="M15 24V10" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#173628] text-[#cbd6ce] pt-[55px] pb-0">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1.1fr] gap-[30px] pb-[38px]">
          <div>
            <a className="inline-flex items-center gap-[9px] font-serif text-[24px] tracking-[-0.01em] text-white">
              <BrandMark />
              <span>Ilai</span>
            </a>
            <p className="text-[10.5px] max-w-[260px] leading-[1.7] mt-[10px]">Curated return gifts, favour bags and celebration gifting with a little more thought in every detail.</p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.1em] uppercase text-white mb-[12px]">Shop</h4>
            <ul className="list-none p-0 m-0 grid gap-[8px]">
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#products">Bestsellers</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#products">Potli Bags</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#products">Gift Boxes</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#products">Favour Bags</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#budget">By Budget</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.1em] uppercase text-white mb-[12px]">Occasions</h4>
            <ul className="list-none p-0 m-0 grid gap-[8px]">
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#occasions">Wedding</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#occasions">Housewarming</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#occasions">Birthday</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#occasions">Baby Shower</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#occasions">Festivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.1em] uppercase text-white mb-[12px]">Help</h4>
            <ul className="list-none p-0 m-0 grid gap-[8px]">
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#bulk">Bulk Orders</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#">Shipping</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#">Returns</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#">Track Order</a></li>
              <li><a className="text-[10.5px] text-[#cbd6ce] hover:text-white transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.1em] uppercase text-white mb-[12px]">Contact</h4>
            <ul className="list-none p-0 m-0 grid gap-[8px]">
              <li className="text-[10.5px]">hello@ilai.co.in</li>
              <li className="text-[10.5px]">+91 98765 43210</li>
              <li className="text-[10.5px]">Chennai, Tamil Nadu</li>
              <li className="text-[10.5px]">Mon–Sat · 10am–6pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-[17px] flex justify-between items-center text-[9.5px] flex-wrap gap-2">
          <span>© 2026 Ilai. All rights reserved.</span>
          <div className="flex gap-[7px]">
            <a className="w-[26px] h-[26px] border border-white/18 rounded-full grid place-items-center text-[10.5px] text-[#cbd6ce] hover:text-white hover:border-white transition-colors" href="#">◎</a>
            <a className="w-[26px] h-[26px] border border-white/18 rounded-full grid place-items-center text-[10.5px] text-[#cbd6ce] hover:text-white hover:border-white transition-colors" href="#">f</a>
            <a className="w-[26px] h-[26px] border border-white/18 rounded-full grid place-items-center text-[10.5px] text-[#cbd6ce] hover:text-white hover:border-white transition-colors" href="#">𝕏</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
