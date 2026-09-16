export default function Editorial() {
  return (
    <section className="py-[78px]">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-[45px] items-center">
          <div className="min-h-[430px] rounded-[16px] bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.7),transparent_19%),linear-gradient(145deg,#d7c29d,#9faf92_52%,#526c5b)] relative overflow-hidden">
            <div className="absolute border border-white/50 rounded-full w-[350px] h-[350px] -right-[80px] -top-[60px]" />
            <div className="absolute border border-white/50 rounded-full w-[180px] h-[180px] left-[45px] bottom-[55px]" />
            <div className="absolute left-[23%] bottom-0 w-[52%] h-[63%] rounded-t-[14px] bg-gradient-to-br from-[#ece0c7] to-[#b89061] shadow-[0_35px_45px_rgba(39,51,40,0.2)] after:content-['SSS'] after:absolute after:left-1/2 after:top-[40%] after:-translate-x-1/2 after:-translate-y-1/2 after:font-serif after:text-[#355541] after:text-[34px] after:tracking-[0.1em]" />
          </div>
          <div>
            <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[10px] block">Our story</span>
            <h2 className="font-serif text-green text-[47px] leading-none">Return gifts that feel like they were chosen.</h2>
            <p className="max-w-[500px] text-muted text-[13px] my-[16px]">SSS started with a simple observation: most return gifts feel like afterthoughts. We set out to change that — with craft, care and the kind of attention to detail that makes a guest feel genuinely seen.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[9px_20px] mt-[20px] mb-[25px]">
              <div className="text-[10.5px] text-[#4d544f] flex gap-[7px]"><b className="text-terracotta font-bold">✦</b> Handpicked collections</div>
              <div className="text-[10.5px] text-[#4d544f] flex gap-[7px]"><b className="text-terracotta font-bold">✦</b> Artisan-sourced materials</div>
              <div className="text-[10.5px] text-[#4d544f] flex gap-[7px]"><b className="text-terracotta font-bold">✦</b> Bulk support included</div>
              <div className="text-[10.5px] text-[#4d544f] flex gap-[7px]"><b className="text-terracotta font-bold">✦</b> Pan-India delivery</div>
            </div>
            <a className="rounded-[7px] px-[19px] py-[13px] text-[12px] font-bold border border-transparent inline-flex items-center gap-[8px] bg-green text-white cursor-pointer" href="#products">Explore the collection →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
