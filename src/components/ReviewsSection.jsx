const REVIEWS = [
  {
    initials: 'GR', color: 'var(--green)',
    quote: '"The potlis looked beautiful on every table. Guests genuinely wanted to know where we\'d found them."',
    name: 'Gayathri R.', city: 'Bengaluru', tag: 'Wedding',
  },
  {
    initials: 'KS', color: 'var(--terracotta)',
    quote: '"We had a tight per-piece budget and the team helped us find something that still looked special."',
    name: 'Kothai S.', city: 'Chennai', tag: 'Return Gifts',
  },
  {
    initials: 'VS', color: 'var(--gold)',
    quote: '"The bulk process was easy, communication was clear, and everything reached us packed beautifully."',
    name: 'Vijay S.', city: 'Coimbatore', tag: 'Bulk Order',
  },
]

export default function ReviewsSection() {
  return (
    <section className="py-[78px]">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto flex flex-col gap-[36px]">

        <div>
          <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[8px] block">Kind Words</span>
          <h2 className="font-serif text-green text-[38px] leading-[1.1] mb-[10px]">Loved by hosts.<br />Remembered by guests.</h2>
          <p className="text-[12.5px] text-muted leading-[1.5] max-w-[500px] mb-[16px]">
            Real celebrations, thoughtful details, and gifts that did not end up left behind on the table.
          </p>
          <div className="inline-flex items-center gap-[10px] bg-cream px-[14px] py-[8px] rounded-full w-fit">
            <div className="text-gold text-[14px] tracking-[2px]">★★★★★</div>
            <span className="text-[12px] font-bold text-green">4.9 / 5.0 Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {REVIEWS.map((r, i) => (
            <article
              className="bg-white border border-line rounded-[14px] p-[26px_22px] flex flex-col justify-between relative transition-all duration-280 hover:-translate-y-[5px] hover:border-gold hover:shadow-custom group after:content-['“'] after:absolute after:top-[14px] after:right-[18px] after:font-serif after:text-[48px] after:text-sage after:leading-none after:pointer-events-none"
              key={i}
            >
              <blockquote className="font-serif text-[#2e3931] text-[16px] leading-[1.5] not-italic mb-[24px] relative z-10">{r.quote}</blockquote>
              <div className="flex items-center gap-[12px] border-t border-dashed border-line pt-[16px]">
                <div className="w-[36px] h-[36px] rounded-full text-white grid place-items-center text-[11px] font-bold shrink-0" style={{ background: r.color }}>{r.initials}</div>
                <div className="text-[12px]">
                  <strong className="block text-green text-[12px] font-bold">{r.name}</strong>
                  <span className="text-muted text-[10.5px] mr-[8px]">{r.city}</span>
                  <span className="text-[9px] font-bold text-terracotta uppercase tracking-[0.06em] bg-[#f9f1ee] px-[6px] py-[2px] rounded-[3px]">{r.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
