import { useState, useRef, useEffect } from 'react'

/* ─── Data ──────────────────────────────────────── */
const THEMES = {
  wedding: {
    eyebrow: 'The wedding gifting edit',
    headline: 'A little <span class="accent">something to remember.</span>',
    sub: 'Return gifts designed to become part of the story — not just something guests take home.',
    mini: 'a thank-you from', title: 'ILAI', copy: 'For being part of our day.',
    cta: 'Explore the collection →',
  },
  house: {
    eyebrow: 'The new-home gifting edit',
    headline: 'For a home that<br/><span class="accent">feels like yours.</span>',
    sub: 'Thoughtful little gifts for new beginnings, warm welcomes and the people who helped make a house a home.',
    mini: 'a warm welcome from', title: 'HOME', copy: 'For being part of a new beginning.',
    cta: 'Explore the collection →',
  },
  festival: {
    eyebrow: 'The festive gifting edit',
    headline: 'Bring a little<br/><span class="accent">joy home.</span>',
    sub: 'Traditional textures, thoughtful keepsakes and bright little gifts for festive tables.',
    mini: 'a festive note from', title: 'ILAI', copy: 'Wishing you a beautiful celebration.',
    cta: 'Explore the collection →',
  },
  birthday: {
    eyebrow: 'The celebration gifting edit',
    headline: 'Make their day<br/><span class="accent">a little brighter.</span>',
    sub: 'Playful, useful and beautiful gifts for birthdays, milestones and the people worth celebrating.',
    mini: 'a little note from', title: 'ILAI', copy: 'For making the day more special.',
    cta: 'Explore the collection →',
  },
}

const PICKS = {
  potli: { mini: 'a little wedding favour', title: 'POTLI', copy: 'A tiny thank-you, wrapped in colour and craft.', cta: 'Shop potli stories →' },
  box: { mini: 'for your special guests', title: 'GIFT BOX', copy: 'Something beautiful to open, keep, and remember.', cta: 'Explore gift boxes →' },
  bag: { mini: 'made for mindful gifting', title: 'JUTE + FIBRE', copy: 'Natural textures for celebrations with a lighter touch.', cta: 'Shop the eco edit →' },
  utility: { mini: "something they'll use", title: 'KEEPSAKE', copy: 'The nicest kind of return gift is one that stays useful.', cta: 'Shop utility gifts →' },
}

const PANELS = [
  { key: 'potli', tag: 'WEDDING FAV', name: 'Potli Stories', emoji: '🎁', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85' },
  { key: 'box', tag: 'PREMIUM', name: 'Gift Boxes', emoji: '📦', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85' },
  { key: 'bag', tag: 'ECO EDIT', name: 'Jute & Fibre', emoji: '🌿', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' },
  { key: 'utility', tag: 'LOVED', name: 'Keepsakes', emoji: '♡', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=85' },
]

export default function HeroSignature() {
  const [theme, setTheme] = useState('wedding')
  const [pick, setPick] = useState(null)
  const [active, setActive] = useState(0)   // which panel is "wide"
  const [tick, setTick] = useState(0)   // invite text version (triggers re-render key)
  const [isPaused, setIsPaused] = useState(false)
  const tiltRef = useRef(null)

  const t = THEMES[theme]
  const invite = pick ? PICKS[pick] : { mini: t.mini, title: t.title, copy: t.copy }

  /* Auto-move the four image panels every 3.5s */
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % PANELS.length
        setPick(PANELS[next].key)
        setTick(n => n + 1)
        return next
      })
    }, 3500)

    return () => clearInterval(timer)
  }, [isPaused])

  const handlePick = (key, idx) => {
    setPick(key)
    setActive(idx)
    setTick(n => n + 1)
  }
  const handleTheme = (key) => { setTheme(key); setPick(null); setActive(0); setTick(n => n + 1) }

  /* Magnetic tilt on the wide panel */
  const handleTiltMove = (e) => {
    const el = tiltRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * 9
    const ry = ((e.clientX - r.left) / r.width - 0.5) * -12
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`
  }
  const resetTilt = () => { if (tiltRef.current) tiltRef.current.style.transform = '' }

  return (
    <section>
      <div className="w-full">
        <div className="min-h-none md:min-h-[650px] py-8 md:py-0 overflow-hidden relative bg-[radial-gradient(circle_at_72%_30%,rgba(255,255,255,0.72),transparent_20%),radial-gradient(circle_at_86%_82%,rgba(184,107,79,0.16),transparent_28%),linear-gradient(135deg,#f2ecdf_0%,#e7dfcf_52%,#cfd8c5_100%)]">
          <div className="absolute inset-0 opacity-[0.22] pointer-events-none bg-[radial-gradient(rgba(35,71,53,0.08)_0.7px,transparent_0.7px)] bg-[size:8px_8px] mix-blend-multiply" />

          {/* ── Left copy ── */}
          <div className="relative md:absolute z-10 md:left-[6%] top-auto md:top-1/2 md:-translate-y-1/2 w-full md:w-[43%] max-w-[540px] flex flex-col justify-center p-6 md:p-0">
            <span className="uppercase tracking-[0.13em] text-[10px] font-bold text-terracotta mb-[13px]">{t.eyebrow}</span>
            <h1 className="font-serif text-green text-[clamp(42px,5.4vw,77px)] leading-[0.94] tracking-[-0.025em] [&_.accent]:text-terracotta [&_.accent]:not-italic" dangerouslySetInnerHTML={{ __html: t.headline }} />
            <p className="max-w-[470px] text-[#707269] text-[14px] my-[20px]">{t.sub}</p>
            <div className="flex gap-[10px] flex-wrap">
              <a className="rounded-[7px] px-[19px] py-[13px] text-[12px] font-bold border border-transparent inline-flex items-center gap-[8px] bg-green text-white" href="#products">{pick ? PICKS[pick].cta : t.cta}</a>
              <a className="rounded-[7px] px-[19px] py-[13px] text-[12px] font-bold border border-green inline-flex items-center gap-[8px] bg-transparent text-green" href="#bulk">Need 50+ gifts?</a>
            </div>
            <div className="flex gap-[20px] sm:gap-[24px] mt-[24px]">
              <div><strong className="block text-green text-[17px]">1,200+</strong><span className="text-[9px] text-muted">gift designs</span></div>
              <div><strong className="block text-green text-[17px]">₹49+</strong><span className="text-[9px] text-muted">starting price</span></div>
              <div><strong className="block text-green text-[17px]">50+</strong><span className="text-[9px] text-muted">bulk support</span></div>
            </div>

            {/* Theme switcher pill buttons below stats */}
            <div className="flex items-center gap-[4px] sm:gap-[5px] mt-[24px] bg-white/80 p-[4px] border border-[rgba(35,71,53,0.12)] rounded-[18px] sm:rounded-full backdrop-blur-[8px] shadow-xs w-fit max-w-full flex-wrap sm:flex-nowrap">
              {Object.keys(THEMES).map(key => (
                <button
                  key={key}
                  className={`
                    border-0 rounded-full px-[12px] sm:px-[14px] py-[5px] sm:py-[6px] text-[10.5px] sm:text-[11px] font-bold cursor-pointer transition-colors
                    ${theme === key ? 'bg-green text-white shadow-xs' : 'bg-transparent text-[#60635c] hover:text-green'}
                  `}
                  onClick={() => handleTheme(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* ── Split-Frame Lookbook ── */}
          <div
            className="relative md:absolute z-10 md:right-[2%] top-auto md:top-[5%] w-full md:w-[55%] h-[480px] md:h-[90%] flex flex-col p-4 md:p-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

            {/* Split panels */}
            <div className="flex-1 flex flex-row gap-[6px] rounded-[18px] overflow-hidden shadow-[0_30px_65px_rgba(35,71,53,0.2),0_6px_20px_rgba(35,71,53,0.1)]">
              {PANELS.map((p, i) => {
                const isWide = active === i
                return (
                  <div
                    key={p.key}
                    className={`
                      relative overflow-hidden rounded-[14px]
                      ${isWide
                        ? 'flex-1 auto cursor-default transition-[flex,transform,box-shadow] duration-550 ease-[cubic-bezier(0.77,0,0.18,1)] hover:shadow-[0_0_0_2px_rgba(181,139,81,0.45)]'
                        : 'flex-[0_0_56px] cursor-pointer transition-[flex] duration-550 ease-[cubic-bezier(0.77,0,0.18,1)]'
                      }
                    `}
                    onClick={() => handlePick(p.key, i)}
                    ref={isWide ? tiltRef : null}
                    onMouseMove={isWide ? handleTiltMove : undefined}
                    onMouseLeave={isWide ? resetTilt : undefined}
                  >
                    {/* Photo */}
                    <div
                      className="absolute -inset-[5%] bg-cover bg-center transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] animate-[kenBurns_18s_ease-in-out_infinite]"
                      style={{ backgroundImage: `url(${p.img})` }}
                    />

                    {/* Overlay */}
                    <div
                      className={`
                        absolute inset-0 transition-[background] duration-400
                        ${isWide
                          ? 'bg-gradient-to-br from-[rgba(10,16,12,0.18)] via-[rgba(10,16,12,0.05)] to-[rgba(10,16,12,0.45)]'
                          : 'bg-gradient-to-t from-[rgba(10,16,12,0.85)] via-[rgba(10,16,12,0.45)] to-[rgba(10,16,12,0.1)]'
                        }
                      `}
                    />

                    {/* Collapsed state: vertical label */}
                    {!isWide && (
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-[14px_6px] z-10 gap-[6px]">
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[7.5px] font-extrabold tracking-[0.16em] uppercase text-white/55">{p.tag}</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-serif text-[14px] text-white whitespace-nowrap overflow-hidden max-h-[120px]">{p.name}</span>
                        <span className="text-[18px] leading-none">{p.emoji}</span>
                      </div>
                    )}

                    {/* Expanded state: invite + details */}
                    {isWide && (
                      <div className="absolute inset-0 flex flex-col justify-end p-[24px_22px_22px] z-10 gap-[10px]" key={`${tick}-${p.key}`}>
                        <span className="text-[8px] font-extrabold tracking-[0.2em] uppercase text-[#e8c07a] animate-[sfTagSlide_0.4s_cubic-bezier(0.22,1,0.36,1)_0.05s_both]">{p.tag}</span>
                        <div className="flex flex-col gap-[5px]">
                          <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/58 animate-[sfFadeUp_0.38s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">{invite.mini}</span>
                          <h2 className="font-serif text-[clamp(30px,3.8vw,50px)] text-white leading-[0.9] tracking-[-0.025em] animate-[sfTitleReveal_0.52s_cubic-bezier(0.22,1,0.36,1)_0.12s_both] overflow-hidden">{invite.title}</h2>
                          <p className="font-serif italic text-[12.5px] text-white/68 max-w-[280px] leading-[1.45] animate-[sfFadeUp_0.45s_cubic-bezier(0.22,1,0.36,1)_0.22s_both]">{invite.copy}</p>
                        </div>
                        <div className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/42 animate-[sfFadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_0.28s_both]">{p.name}</div>
                        <div className="text-[18px] text-[#e8c07a] animate-[sfFadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_0.32s_both]">✦</div>
                      </div>
                    )}

                    {/* Active indicator dot */}
                    {isWide && <span className="absolute top-[14px] right-[14px] w-[10px] h-[10px] rounded-full bg-[#e8c07a] z-20 animate-[dotPulse_1.6s_ease_infinite]" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
