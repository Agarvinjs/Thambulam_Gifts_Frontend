import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose, onSelectProduct }) {
  const { cart, updateQuantity, removeFromCart, cartCount, cartTotal, cartSavings } = useCart()

  const freeShippingThreshold = 1999
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal)
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100))

  const handleItemClick = (item) => {
    if (onSelectProduct) {
      onSelectProduct(item)
      onClose()
    }
  }

  const handleCheckoutWhatsApp = () => {
    const summary = cart.map(i => `${i.qty}× ${i.name} (₹${(i.unitPrice || i.price) * i.qty})`).join('%0A')
    const message = `Hello SSS team! I would like to place an order:%0A${summary}%0A%0ATotal: ₹${cartTotal}%0AThank you!`
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-[2000] transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <aside
        className={`absolute right-0 top-0 h-full w-[min(440px,94vw)] bg-white p-[22px] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center pb-[16px] border-b border-line">
          <div>
            <h3 className="font-serif text-[24px] text-green">Your Gifting Bag</h3>
            <span className="text-[11px] text-muted font-medium">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} ready for celebration
            </span>
          </div>
          <button
            className="w-[32px] h-[32px] rounded-full border border-line bg-cream/50 text-[18px] text-green cursor-pointer grid place-items-center hover:bg-cream transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="py-[12px] border-b border-line/60">
          <div className="flex items-center justify-between text-[11px] mb-[6px]">
            {amountToFreeShipping > 0 ? (
              <span className="text-muted">
                Add <strong className="text-green font-bold">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="text-gold">Free Delivery</strong>
              </span>
            ) : (
              <span className="text-[#2e7d32] font-bold flex items-center gap-[4px]">
                <span>✓</span> You have unlocked <strong>Free Doorstep Delivery!</strong>
              </span>
            )}
            <span className="text-[10px] text-muted font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-[5px] bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-line/60 py-[10px] pr-[4px]">
          {cart.length === 0 ? (
            <div className="py-[80px] px-[20px] text-center flex flex-col items-center gap-[12px]">
              <span className="text-[40px]">🛍️</span>
              <h4 className="font-serif text-[20px] text-green">Your bag is empty</h4>
              <p className="text-muted text-[12px] max-w-[240px] leading-relaxed">
                Explore our curated potlis, favour bags, and brass keepsakes to begin.
              </p>
              <button
                onClick={onClose}
                className="mt-[6px] bg-green text-white text-[11.5px] font-bold px-[18px] py-[9px] rounded-full border-0 cursor-pointer hover:bg-[#193a2a] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map(item => {
              const effectivePrice = item.unitPrice || item.price
              const lineBase = effectivePrice * item.qty
              const couponDisc = item.options?.couponDiscount || 0
              const itemTotal = Math.max(0, lineBase - couponDisc)
              return (
                <div className="py-[14px] flex gap-[12px] items-start" key={item.id}>
                  {/* Thumbnail */}
                  <img
                    src={item.img}
                    alt={item.name}
                    onClick={() => handleItemClick(item)}
                    className="w-[68px] h-[68px] rounded-[10px] object-cover bg-[#e6e0d3] cursor-pointer shrink-0 border border-line"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-[8px]">
                      <strong
                        onClick={() => handleItemClick(item)}
                        className="block text-green text-[13px] font-bold leading-snug cursor-pointer hover:text-terracotta transition-colors truncate"
                      >
                        {item.name}
                      </strong>
                      <button
                        className="border-0 bg-transparent text-muted hover:text-[#b24e42] text-[12px] cursor-pointer p-[2px]"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center gap-[6px] mt-[2px]">
                      <span className="text-[11px] text-muted">
                        ₹{effectivePrice.toLocaleString('en-IN')} / pc
                      </span>
                      <span className="text-[9.5px] font-semibold text-terracotta bg-cream px-[5px] py-[1px] rounded">
                        Min: {item.minOrderQty || 15}
                      </span>
                    </div>

                    {/* Personalization Tag display if present */}
                    {item.options?.customTag && (
                      <span className="inline-flex items-center gap-[4px] text-[9.5px] text-terracotta bg-terracotta/10 px-[6px] py-[2px] rounded font-medium mt-[4px]">
                        ✦ Tag: {item.options.customTag}
                      </span>
                    )}

                    {/* Applied Coupon Badge if present */}
                    {item.options?.appliedCoupon && (
                      <span className="inline-flex items-center gap-[4px] text-[9.5px] text-[#2e7d32] bg-[#2e7d32]/10 px-[6px] py-[2px] rounded font-medium mt-[4px]">
                        🏷️ {item.options.appliedCoupon} (-₹{couponDisc.toLocaleString('en-IN')})
                      </span>
                    )}

                    {/* Quantity Stepper + Item Total */}
                    <div className="flex items-center justify-between mt-[10px]">
                      <div className="inline-flex items-center border border-line rounded-[6px] bg-cream/40 overflow-hidden">
                        <button
                          className="w-[26px] h-[26px] text-green hover:bg-cream border-0 bg-transparent cursor-pointer font-bold grid place-items-center text-[13px]"
                          onClick={() => {
                            const itemMin = item.minOrderQty || 15
                            if (item.qty <= itemMin) {
                              removeFromCart(item.id)
                            } else {
                              updateQuantity(item.id, Math.max(itemMin, item.qty - (item.qty > 50 ? 25 : item.qty > itemMin ? 5 : 1)))
                            }
                          }}
                          title={item.qty <= (item.minOrderQty || 15) ? 'Remove item' : 'Decrease quantity'}
                        >
                          −
                        </button>
                        <span className="w-[32px] text-center text-[12px] font-bold text-green font-serif">
                          {item.qty}
                        </span>
                        <button
                          className="w-[26px] h-[26px] text-green hover:bg-cream border-0 bg-transparent cursor-pointer font-bold grid place-items-center text-[13px]"
                          onClick={() => {
                            const maxStock = item.availableStock || 450
                            if (item.qty < maxStock) {
                              updateQuantity(item.id, Math.min(maxStock, item.qty + (item.qty >= 50 ? 25 : 5)))
                            }
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <strong className="font-serif text-[14px] text-green font-bold block">
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </strong>
                        {couponDisc > 0 && (
                          <span className="text-[10px] text-muted line-through block">
                            ₹{lineBase.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Drawer Footer / Totals */}
        {cart.length > 0 && (
          <div className="border-t border-line pt-[16px] flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[6px]">
              {cartSavings > 0 && (
                <div className="flex justify-between text-terracotta text-[11.5px] font-bold">
                  <span>Total Bulk Savings:</span>
                  <span>−₹{cartSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-green text-[15px] font-bold">
                <span>Estimated Subtotal:</span>
                <span className="font-serif text-[19px]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-[10px] text-muted">
                Taxes included. Bulk dispatch schedule confirmed post order.
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-green text-white rounded-[12px] p-[14px] font-bold text-[13px] cursor-pointer hover:bg-[#193a2a] transition-colors shadow-custom flex items-center justify-center gap-[8px]"
            >
              <span>Instant WhatsApp Checkout</span>
              <span>→</span>
            </button>

            <button
              onClick={() => alert(`Your order estimate of ₹${cartTotal.toLocaleString('en-IN')} for ${cartCount} return gifts has been logged. Our concierge will contact you with shipping invoices.`)}
              className="w-full bg-cream hover:bg-[#eae1d0] text-green rounded-[10px] p-[10px] font-bold text-[11.5px] cursor-pointer border border-line transition-colors"
            >
              Generate Formal Tax Invoice
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
