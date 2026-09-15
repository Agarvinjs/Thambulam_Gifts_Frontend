const OCCASIONS = [
  { label: 'The big one', name: 'Wedding', img: '/assets/ig_product_30.jpg' },
  { label: 'New beginnings', name: 'Housewarming', img: '/assets/ig_product_31.jpg' },
  { label: 'Celebrate', name: 'Birthday', img: '/assets/ig_product_32.jpg' },
  { label: 'Welcome', name: 'Baby Shower', img: '/assets/ig_product_33.jpg' },
  { label: 'Festivals', name: 'Pooja & Festive', img: '/assets/ig_product_34.jpg' },
]

export default function OccasionSection() {
  return (
    <section className="pb-[78px]" id="occasions">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-[25px] items-start md:items-end mb-[28px]">
          <div>
            <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[7px] block">By occasion</span>
            <h2 className="font-serif text-green text-[38px] leading-none">One place for every reason to gift</h2>
          </div>
          <p className="max-w-[380px] text-muted text-[12px]">Wedding planning, pooja, housewarming, birthdays and all the beautiful little in-betweens.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[14px]">
          {OCCASIONS.map((o, i) => (
            <a
              className="group relative aspect-[0.9] rounded-[13px] overflow-hidden bg-[#e6e0d3] block after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:40% after:to-[rgba(17,32,24,0.78)]"
              href="#products"
              key={i}
            >
              <img src={o.img} alt={o.name} className="w-full h-full object-cover transition-transform duration-450 group-hover:scale-105" />
              <div className="absolute left-[16px] right-[10px] bottom-[16px] text-white z-10">
                <span className="uppercase tracking-[0.13em] text-[8px] font-bold text-[#e6c994] block mb-[4px]">{o.label}</span>
                <h3 className="font-serif text-[22px] leading-none">{o.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
