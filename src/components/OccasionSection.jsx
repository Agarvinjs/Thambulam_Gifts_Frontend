const OCCASIONS = [
  { label: 'The big one', name: 'Wedding', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=85' },
  { label: 'New beginnings', name: 'Housewarming', img: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=700&q=85' },
  { label: 'Celebrate', name: 'Birthday', img: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=700&q=85' },
  { label: 'Welcome', name: 'Baby Shower', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=85' },
  { label: 'Festivals', name: 'Pooja & Festive', img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=85' },
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
