export default function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert("You're on the SSS list.")
    e.target.reset()
  }

  return (
    <section className="bg-[#efe8d9] py-[55px]">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto flex flex-col md:flex-row justify-between items-center gap-[30px]">
        <div>
          <h2 className="font-serif text-green text-[34px] leading-tight">The gifting shortlist, occasionally.</h2>
          <p className="text-[11px] text-muted mt-1">New collections, wedding ideas and seasonal edits. No noisy inbox.</p>
        </div>
        <form className="flex gap-[7px] w-full md:w-auto" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Your email address"
            className="w-full md:w-[260px] border border-line rounded-[6px] p-[12px] text-[10.5px] bg-white outline-none focus:border-green"
          />
          <button className="border-0 rounded-[6px] bg-terracotta text-white font-bold px-[19px] py-[12px] text-[10.5px] whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity">
            Join SSS
          </button>
        </form>
      </div>
    </section>
  )
}
