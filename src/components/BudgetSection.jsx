const BUDGETS = [
  { label: 'Value', range: 'Under ₹99', desc: 'Potlis, little keepsakes and compact favours.' },
  { label: 'Popular', range: '₹100–149', desc: 'Jute bags, utility gifts and elevated favours.' },
  { label: 'Premium', range: '₹150–249', desc: 'Gift boxes, organisers and curated pieces.' },
  { label: 'Signature', range: '₹250+', desc: 'Special-guest gifting and premium sets.' },
]

export default function BudgetSection() {
  return (
    <section className="pb-[78px]" id="budget">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-[25px] items-start md:items-end mb-[28px]">
          <div>
            <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[7px] block">Shop by budget</span>
            <h2 className="font-serif text-green text-[38px] leading-none">Start with the number</h2>
          </div>
          <p className="max-w-[380px] text-muted text-[12px]">A faster way to shortlist return gifts when you already know the per-piece budget.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
          {BUDGETS.map((b, i) => (
            <a
              className="group bg-paper border border-line rounded-[14px] p-[22px] transition-all duration-200 hover:-translate-y-1 hover:shadow-custom hover:border-green block"
              href="#products"
              key={i}
            >
              <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[7px] block">{b.label}</span>
              <h3 className="font-serif text-green text-[28px] my-[6px]">{b.range}</h3>
              <p className="text-muted text-[11px] leading-[1.45]">{b.desc}</p>
              <span className="text-[10px] font-bold text-green block mt-[14px]">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
