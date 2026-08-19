const CATS = [
  {
    tag: 'BEST SELLER',
    name: 'Potli Bags',
    price: 'From ₹49',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85',
  },
  {
    tag: 'ECO-FRIENDLY',
    name: 'Jute Bags',
    price: 'From ₹55',
    img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=85',
  },
  {
    tag: 'GIFT READY',
    name: 'Gift Boxes',
    price: 'From ₹99',
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85',
  },
  {
    tag: 'SOMETHING USEFUL',
    name: 'Utility Gifts',
    price: 'From ₹85',
    img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=85',
  },
  {
    tag: 'NEW ARRIVALS',
    name: 'Kora Grass',
    price: 'From ₹79',
    img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=85',
  },
  {
    tag: 'TRADITIONAL',
    name: 'Thamboolam',
    price: 'From ₹99',
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=85',
  },
]

export default function CategoryRow() {
  return (
    <section className="py-[60px]" id="shop-by-need">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[18px] mb-[28px]">
          <div>
            <span className="uppercase tracking-[0.14em] text-[10px] font-bold text-terracotta mb-[6px] block">
              START HERE
            </span>
            <h2 className="font-serif text-green text-[38px] md:text-[44px] leading-tight">
              Shop by what you need
            </h2>
          </div>
          <p className="max-w-[360px] text-muted text-[12.5px] leading-snug">
            Instead of scrolling forever, choose the gifting route that matches your celebration.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[14px]">
          {CATS.map((c, i) => (
            <a
              key={i}
              href="#products"
              className="group relative aspect-[0.72] rounded-[16px] overflow-hidden bg-[#e6e0d3] block transition-all duration-300 hover:-translate-y-1 hover:shadow-custom after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgba(17,32,24,0.88)] after:via-[rgba(17,32,24,0.25)] after:to-transparent"
            >
              <img
                src={c.img}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-[16px] right-[12px] bottom-[16px] text-white z-10">
                <span className="uppercase tracking-[0.12em] text-[8.5px] font-bold text-[#e6c994] block mb-[4px]">
                  {c.tag}
                </span>
                <h3 className="font-serif text-[22px] leading-tight text-white mb-[2px]">
                  {c.name}
                </h3>
                <span className="text-[11px] text-white/85 font-medium block">
                  {c.price}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
