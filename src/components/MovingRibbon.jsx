const ITEMS = [
  '✦ Wedding Favourites',
  '✦ Pan-India Delivery',
  '✦ Custom Monogramming & Tags',
  '✦ Handcrafted in Small Batches',
  '✦ Bulk Pricing Available',
  '✦ 4.9★ Rated by 1,200+ Hosts',
]

export default function MovingRibbon() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-[#173628] py-[13px] overflow-hidden whitespace-nowrap border-y border-white/10 select-none">
      <div className="inline-flex gap-[32px] animate-ribbon">
        {doubled.map((item, i) => (
          <span key={i} className="text-[#e2cead] font-bold text-[11px] uppercase tracking-[0.14em]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
