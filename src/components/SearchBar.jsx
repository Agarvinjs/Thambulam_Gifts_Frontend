import { useState } from 'react'

export default function SearchBar({ visible, onSearch }) {
  const [val, setVal] = useState('')

  if (!visible) return null

  const handleChange = (e) => {
    setVal(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="sticky top-[74px] z-[998] bg-paper/95 backdrop-blur-[10px] border-b border-line px-[20px] py-[10px] animate-fade-down">
      <div className="w-[min(1280px,calc(100%-48px))] mx-auto flex items-center gap-[10px]">
        <span className="text-[14px]">🔍</span>
        <input
          type="text"
          value={val}
          onChange={handleChange}
          placeholder="Search return gifts, potlis, gift boxes..."
          className="w-full bg-transparent border-none outline-none font-sans text-[13px] text-ink placeholder:text-muted"
          autoFocus
        />
        {val && (
          <button
            onClick={() => { setVal(''); onSearch('') }}
            className="border-none bg-none cursor-pointer text-[14px] text-muted hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
