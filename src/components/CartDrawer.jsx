import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, cartCount, cartTotal } = useCart()

  return (
    <div className={`fixed inset-0 bg-black/38 z-[2000] ${open ? 'block' : 'hidden'}`} onClick={onClose}>
      <aside className="absolute right-0 top-0 h-full w-[min(410px,92vw)] bg-white p-[20px] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center pb-[14px] border-b border-line">
          <h3 className="font-serif text-[25px] text-green">Your bag</h3>
          <button className="border-0 bg-transparent text-[25px] text-green cursor-pointer leading-none" onClick={onClose}>×</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="py-[60px] px-[15px] text-center text-muted text-[11px]">Your bag is waiting for something beautiful.</div>
          ) : (
            cart.map(item => (
              <div className="flex gap-[11px] py-[13px] border-b border-line" key={item.id}>
                <img src={item.img} alt={item.name} className="w-[64px] h-[64px] rounded-[7px] object-cover" />
                <div>
                  <strong className="block text-green text-[11px] font-bold">{item.name}</strong>
                  <span className="text-[10px] text-muted">₹{item.price.toLocaleString('en-IN')} × {item.qty}</span>
                  <button className="block border-0 bg-transparent text-[#b24e42] text-[9px] mt-[5px] cursor-pointer" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-line pt-[15px]">
          <div className="flex justify-between text-green text-[12px] font-bold mb-[11px]">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <button
            className="w-full border-0 bg-green text-white rounded-[6px] p-[12px] font-bold text-[11px] cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => alert('Checkout is ready to connect to your ecommerce backend.')}
          >
            Continue to checkout
          </button>
        </div>
      </aside>
    </div>
  )
}
