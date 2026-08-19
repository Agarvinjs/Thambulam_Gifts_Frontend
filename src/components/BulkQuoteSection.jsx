import { useState } from 'react'

export default function BulkQuoteSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thanks — your bulk enquiry is captured. Connect this form to your backend, WhatsApp or email endpoint.")
    e.target.reset()
  }

  return (
    <section className="py-[78px] bg-paper" id="bulk">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[40px] items-center">

        {/* Left: pitch copy */}
        <div>
          <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[10px] block">For weddings, events &amp; large celebrations</span>
          <h2 className="font-serif text-green text-[50px] leading-[1.05] mt-[10px] mb-[16px]">Got a guest list?<br />We'll help with the gifts.</h2>
          <p className="text-[13px] text-muted max-w-[520px] mb-[24px] leading-[1.65]">Share your occasion, approximate quantity and budget. We'll help you narrow down products, combinations and personalisation — without the spreadsheet headache.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px_18px]">
            <div className="flex items-center gap-[9px] text-[11px] text-[#4a5249] font-medium"><b className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-green text-white text-[10px] shrink-0 font-normal">✓</b>Quantity-based pricing</div>
            <div className="flex items-center gap-[9px] text-[11px] text-[#4a5249] font-medium"><b className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-green text-white text-[10px] shrink-0 font-normal">✓</b>Custom tags &amp; monograms</div>
            <div className="flex items-center gap-[9px] text-[11px] text-[#4a5249] font-medium"><b className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-green text-white text-[10px] shrink-0 font-normal">✓</b>Product shortlisting</div>
            <div className="flex items-center gap-[9px] text-[11px] text-[#4a5249] font-medium"><b className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-green text-white text-[10px] shrink-0 font-normal">✓</b>Dedicated order support</div>
          </div>
        </div>

        {/* Right: premium form card */}
        <div className="bg-white rounded-[20px] p-[34px_30px] shadow-[0_20px_60px_rgba(35,71,53,0.10),0_2px_8px_rgba(35,71,53,0.05)] border border-[rgba(35,71,53,0.08)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[4px] before:bg-gradient-to-r before:from-green before:via-gold before:to-terracotta before:rounded-t-[20px]">
          <div className="mb-[20px]">
            <div className="inline-flex items-center gap-[6px] bg-[rgba(35,71,53,0.07)] text-green text-[9.5px] font-bold tracking-[0.08em] uppercase px-[10px] py-[4px] rounded-full mb-[10px]">✦ Quick Quote</div>
            <h3 className="font-serif text-[28px] text-green leading-[1.1] mb-[4px]">Tell us about<br />your event</h3>
            <p className="text-muted text-[11px]">We'll follow up within one business day with gifting options.</p>
          </div>
          <form className="grid gap-[10px]" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
              <div className="flex items-center border-[1.5px] border-line rounded-[9px] bg-[#fafaf8] transition-colors focus-within:border-green focus-within:bg-white focus-within:ring-3 focus-within:ring-[rgba(35,71,53,0.08)] overflow-hidden">
                <span className="pl-[13px] pr-[6px] text-[14px] leading-none shrink-0 opacity-65 pointer-events-none flex items-center font-sans">👤</span>
                <input required placeholder="Your name" className="flex-1 border-0 rounded-none py-[11px] pl-[4px] pr-[12px] text-[11.5px] outline-none bg-transparent text-ink min-w-0 placeholder:text-[#b0b8b4]" />
              </div>
              <div className="flex items-center border-[1.5px] border-line rounded-[9px] bg-[#fafaf8] transition-colors focus-within:border-green focus-within:bg-white focus-within:ring-3 focus-within:ring-[rgba(35,71,53,0.08)] overflow-hidden">
                <span className="pl-[13px] pr-[6px] text-[14px] leading-none shrink-0 opacity-65 pointer-events-none flex items-center font-sans">📱</span>
                <input required type="tel" placeholder="WhatsApp number" className="flex-1 border-0 rounded-none py-[11px] pl-[4px] pr-[12px] text-[11.5px] outline-none bg-transparent text-ink min-w-0 placeholder:text-[#b0b8b4]" />
              </div>
            </div>
            <div className="flex items-center border-[1.5px] border-line rounded-[9px] bg-[#fafaf8] transition-colors focus-within:border-green focus-within:bg-white focus-within:ring-3 focus-within:ring-[rgba(35,71,53,0.08)] overflow-hidden">
              <span className="pl-[13px] pr-[6px] text-[14px] leading-none shrink-0 opacity-65 pointer-events-none flex items-center font-sans">🎉</span>
              <select required className="flex-1 border-0 rounded-none py-[11px] pl-[4px] pr-[32px] text-[11.5px] outline-none bg-transparent text-ink min-w-0 appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2712%27_height=%278%27_viewBox=%270_0_12_8%27%3E%3Cpath_d=%27M1_1l5_5_5-5%27_stroke=%27%23607068%27_stroke-width=%271.5%27_fill=%27none%27_stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] cursor-pointer">
                <option value="">Select occasion</option>
                <option>Wedding</option>
                <option>Housewarming</option>
                <option>Birthday</option>
                <option>Baby Shower</option>
                <option>Pooja / Festival</option>
                <option>Corporate Event</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
              <div className="flex items-center border-[1.5px] border-line rounded-[9px] bg-[#fafaf8] transition-colors focus-within:border-green focus-within:bg-white focus-within:ring-3 focus-within:ring-[rgba(35,71,53,0.08)] overflow-hidden">
                <span className="pl-[13px] pr-[6px] text-[14px] leading-none shrink-0 opacity-65 pointer-events-none flex items-center font-sans">👥</span>
                <input required type="number" min="1" placeholder="Guest count" className="flex-1 border-0 rounded-none py-[11px] pl-[4px] pr-[12px] text-[11.5px] outline-none bg-transparent text-ink min-w-0 placeholder:text-[#b0b8b4]" />
              </div>
              <div className="flex items-center border-[1.5px] border-line rounded-[9px] bg-[#fafaf8] transition-colors focus-within:border-green focus-within:bg-white focus-within:ring-3 focus-within:ring-[rgba(35,71,53,0.08)] overflow-hidden">
                <span className="pl-[13px] pr-[6px] text-[14px] leading-none shrink-0 opacity-65 pointer-events-none flex items-center font-sans">₹</span>
                <select required className="flex-1 border-0 rounded-none py-[11px] pl-[4px] pr-[32px] text-[11.5px] outline-none bg-transparent text-ink min-w-0 appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2712%27_height=%278%27_viewBox=%270_0_12_8%27%3E%3Cpath_d=%27M1_1l5_5_5-5%27_stroke=%27%23607068%27_stroke-width=%271.5%27_fill=%27none%27_stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] cursor-pointer">
                  <option value="">Budget per gift</option>
                  <option>Under ₹99</option>
                  <option>₹100–149</option>
                  <option>₹150–249</option>
                  <option>₹250+</option>
                </select>
              </div>
            </div>
            <button type="submit" className="border-0 rounded-[10px] bg-gradient-to-br from-green to-[#2a5e40] text-white py-[13px] text-[12px] font-bold tracking-[0.03em] cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(35,71,53,0.28)] mt-[2px]">Request a Custom Quote →</button>
          </form>
          <p className="text-center text-[9.5px] text-muted mt-[8px] opacity-70">🔒 No spam. We only reach out with relevant options.</p>
        </div>

      </div>
    </section>
  )
}
