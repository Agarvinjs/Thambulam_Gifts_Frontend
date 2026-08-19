export default function FeatureCards() {
  return (
    <section className="pb-[78px]">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-[15px]">
          <div className="min-h-[265px] rounded-[15px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-[rgba(29,61,44,0.86)] after:to-[rgba(29,61,44,0.05)]">
            <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85" alt="Potli collection" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 p-[32px] text-white max-w-[490px]">
              <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-[#f0d39a] block">Most loved</span>
              <h3 className="font-serif text-[33px] leading-[1.03] my-[7px]">The potli collection.</h3>
              <p className="text-[11px] opacity-85 mb-[17px]">Over 60 styles of handcrafted potli bags, from everyday favours to wedding keepsakes.</p>
              <a className="rounded-[7px] px-[19px] py-[13px] text-[12px] font-bold border border-transparent inline-flex items-center gap-[8px] bg-white text-green cursor-pointer" href="#products">Shop potlis →</a>
            </div>
          </div>
          <div className="min-h-[265px] rounded-[15px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgba(29,61,44,0.82)] after:to-[rgba(29,61,44,0.08)]">
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85" alt="Gift boxes" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 p-[26px] text-white absolute left-0 right-0 bottom-0">
              <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-[#f0d39a] block">New</span>
              <h3 className="font-serif text-[25px] leading-[1.03] my-[7px]">Gift boxes.</h3>
              <p className="text-[11px] opacity-85 mb-[17px]">Natural textures, premium feel.</p>
              <a className="rounded-[7px] px-[19px] py-[13px] text-[12px] font-bold border border-transparent inline-flex items-center gap-[8px] bg-white text-green cursor-pointer mt-[8px]" href="#products">Explore →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
