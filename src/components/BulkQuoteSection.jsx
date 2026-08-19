import { useState } from 'react'

const OCCASIONS = [
  { id: 'wedding', label: 'Wedding', icon: '💍', sub: 'Traditional & Modern Sets' },
  { id: 'return-gifts', label: 'Return Gifts', icon: '🎁', sub: 'Compact & Elegant Favors' },
  { id: 'housewarming', label: 'Housewarming', icon: '🏡', sub: 'Brass & Eco-friendly Keepsakes' },
  { id: 'pooja', label: 'Pooja / Festival', icon: '🪔', sub: 'Sacred & Artisanal Items' },
  { id: 'corporate', label: 'Corporate Event', icon: '💼', sub: 'Premium Branded Hampers' },
  { id: 'other', label: 'Other', icon: '✨', sub: 'Custom Celebration & Events' }
]

const BUDGET_OPTIONS = [
  { label: 'Under ₹150 / piece', value: '₹150' },
  { label: '₹150 – ₹300 / piece', value: '₹150-300' },
  { label: '₹300 – ₹500 / piece', value: '₹300-500' },
  { label: '₹500+ Luxury Sets', value: '₹500+' }
]

export default function BulkQuoteSection() {
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0])
  const [customOccasion, setCustomOccasion] = useState('')
  const [guestCount, setGuestCount] = useState(150)
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1])
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const effectiveOccasionLabel = selectedOccasion.id === 'other'
    ? (customOccasion.trim() ? customOccasion.trim() : 'Custom Event')
    : selectedOccasion.label

  return (
    <section className="py-[84px] bg-[#fbf9f4] border-y border-line/60 relative overflow-hidden" id="bulk">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto flex flex-col gap-[44px]">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[20px]">
          <div>
            <div className="inline-flex items-center gap-[8px] bg-cream border border-gold/40 px-[14px] py-[4px] rounded-full mb-[12px]">
              <span className="uppercase tracking-[0.14em] text-[10.5px] font-bold text-terracotta">
                For Large Celebrations & Events
              </span>
            </div>
            <h2 className="font-serif text-green text-[36px] md:text-[46px] leading-[1.1]">
              Custom Bulk Gifting Planner
            </h2>
            <p className="text-[14px] text-muted leading-[1.6] max-w-[560px] mt-[6px]">
              Configure your event requirements below to generate an instant estimate & custom shortlist.
            </p>
          </div>

          {/* Guarantee Badges */}
          <div className="flex items-center gap-[16px] text-[12px] text-green font-medium flex-wrap">
            <span className="flex items-center gap-[6px] bg-white px-[12px] py-[6px] rounded-full border border-line">
              <span className="text-gold">✓</span> Tiered Pricing
            </span>
            <span className="flex items-center gap-[6px] bg-white px-[12px] py-[6px] rounded-full border border-line">
              <span className="text-gold">✓</span> Free Monograms
            </span>
            <span className="flex items-center gap-[6px] bg-white px-[12px] py-[6px] rounded-full border border-line">
              <span className="text-gold">✓</span> Doorstep Samples
            </span>
          </div>
        </div>

        {/* Main 2-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-stretch">

          {/* Left Column: Interactive Planner Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-[28px] bg-white rounded-[22px] p-[28px] md:p-[36px] border border-line shadow-sm h-full">

            {/* Step 1: Select Occasion Cards */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-terracotta">
                  Step 1 • Select Event Occasion
                </span>
                <span className="text-[12px] font-bold text-green font-serif">
                  {effectiveOccasionLabel}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                {OCCASIONS.map(occ => (
                  <button
                    type="button"
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`p-[14px_16px] rounded-[14px] border text-left transition-all flex items-start gap-[12px] ${
                      selectedOccasion.id === occ.id
                        ? 'border-green bg-cream/60 ring-2 ring-green/10 shadow-sm'
                        : 'border-line hover:border-gold/60 bg-paper/50'
                    }`}
                  >
                    <span className="text-[24px] shrink-0">{occ.icon}</span>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-green">{occ.label}</h4>
                      <p className="text-[11px] text-muted mt-[2px]">{occ.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guest Count Slider & Range */}
            <div className="flex flex-col gap-[14px] border-t border-line/60 pt-[24px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-terracotta">
                  Step 2 • Estimated Guest Count
                </span>
                <span className="text-[16px] font-serif font-bold text-green bg-cream px-[12px] py-[3px] rounded-full">
                  {guestCount} Guests
                </span>
              </div>

              <div className="flex flex-col gap-[12px]">
                <input
                  type="range"
                  min="25"
                  max="1000"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-[6px] bg-line rounded-lg appearance-none cursor-pointer accent-green"
                />

                {/* Accurately Aligned Tick Mark Labels */}
                <div className="relative w-full h-[20px] text-[11px] text-muted font-medium select-none">
                  <span
                    onClick={() => setGuestCount(25)}
                    className="absolute left-0 cursor-pointer hover:text-green"
                  >
                    25
                  </span>
                  <span
                    onClick={() => setGuestCount(250)}
                    className="absolute left-[23%] -translate-x-1/2 cursor-pointer hover:text-green"
                  >
                    250
                  </span>
                  <span
                    onClick={() => setGuestCount(500)}
                    className="absolute left-[49%] -translate-x-1/2 cursor-pointer hover:text-green"
                  >
                    500 Guests
                  </span>
                  <span
                    onClick={() => setGuestCount(1000)}
                    className="absolute right-0 cursor-pointer hover:text-green"
                  >
                    1,000+
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Budget Range Selector */}
            <div className="flex flex-col gap-[12px] border-t border-line/60 pt-[24px]">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-terracotta">
                Step 3 • Target Budget / Gift
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px]">
                {BUDGET_OPTIONS.map(b => (
                  <button
                    type="button"
                    key={b.value}
                    onClick={() => setBudget(b)}
                    className={`py-[10px] px-[12px] rounded-[10px] text-[12px] font-bold border transition-all text-center ${
                      budget.value === b.value
                        ? 'bg-green text-white border-green shadow-sm'
                        : 'bg-paper border-line text-ink hover:border-gold'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Event Pass / Summary Ticket (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#234735] to-[#172e23] text-paper rounded-[22px] p-[28px] md:p-[32px] shadow-custom flex flex-col justify-between relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-gold/15 rounded-full blur-[70px] pointer-events-none" />

            <div>
              {/* Ticket Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-[18px] mb-[20px]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.12em] text-gold block">
                    Gifting Concierge Pass
                  </span>
                  <h3 className="font-serif text-[22px] text-white font-bold mt-[2px]">
                    Event Quote Summary
                  </h3>
                </div>
                <span className="w-[36px] h-[36px] rounded-full bg-white/10 grid place-items-center text-[18px]">
                  {selectedOccasion.icon}
                </span>
              </div>

              {/* Summary Items Table */}
              <div className="flex flex-col gap-[14px] bg-white/5 border border-white/10 rounded-[16px] p-[18px] text-[13px]">
                <div className="flex flex-col gap-[8px] border-b border-white/10 pb-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Selected Occasion:</span>
                    <strong className="text-white font-bold">{selectedOccasion.label}</strong>
                  </div>

                  {/* Dynamic Custom Occasion Input if "Other" is selected */}
                  {selectedOccasion.id === 'other' && (
                    <div className="flex flex-col gap-[4px] mt-[4px]">
                      <label className="text-[10.5px] text-gold font-bold uppercase tracking-[0.05em]">
                        Specify Your Event Type:
                      </label>
                      <input
                        type="text"
                        required
                        value={customOccasion}
                        onChange={(e) => setCustomOccasion(e.target.value)}
                        placeholder="e.g. Birthday, Anniversary, Sangeet..."
                        className="w-full bg-white/10 border border-gold/40 rounded-[8px] px-[12px] py-[7px] text-[12px] text-white placeholder:text-white/40 outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-[10px]">
                  <span className="text-white/70">Total Guests / Pieces:</span>
                  <strong className="text-gold font-bold">{guestCount} Units</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Budget Category:</span>
                  <strong className="text-white font-bold">{budget.label}</strong>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            {submitted ? (
              <div className="bg-white/10 border border-gold/30 rounded-[16px] p-[20px] text-center my-[20px]">
                <div className="text-[28px] mb-[8px]">✅</div>
                <h4 className="font-serif text-[18px] text-gold font-bold">Enquiry Received!</h4>
                <p className="text-[12px] text-white/80 mt-[4px]">
                  Our concierge team will review your details for <strong className="text-gold">{guestCount} {effectiveOccasionLabel}</strong> gifts and WhatsApp you custom options within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-gold text-green font-bold text-[12px] px-[16px] py-[7px] rounded-full mt-[12px] hover:bg-white transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] mt-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <label className="text-[11px] text-white/80 font-medium">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/10 border border-white/20 rounded-[10px] px-[14px] py-[10px] text-[12.5px] text-white placeholder:text-white/40 outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label className="text-[11px] text-white/80 font-medium">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/10 border border-white/20 rounded-[10px] px-[14px] py-[10px] text-[12.5px] text-white placeholder:text-white/40 outline-none focus:border-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-green font-bold text-[13px] py-[13px] rounded-[12px] transition-all shadow-md mt-[6px] hover:scale-[1.01]"
                >
                  Send Enquiry for {guestCount} Guests →
                </button>

                <p className="text-center text-[10px] text-white/60">
                  🔒 Instant response via WhatsApp. No spam guaranteed.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}



