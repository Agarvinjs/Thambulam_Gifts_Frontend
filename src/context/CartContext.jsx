import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import products from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Helper to get unit price based on quantity tiers
  const getTierPrice = useCallback((product, qty) => {
    if (!product || !product.bulkTiers || product.bulkTiers.length === 0) {
      return product?.price || 0
    }
    const tier = product.bulkTiers.slice().reverse().find(t => qty >= t.min)
    return tier ? tier.price : product.price
  }, [])

  const addToCart = useCallback((productOrId, quantity = 1, options = {}) => {
    const qtyToAdd = Math.max(1, Number(quantity) || 1)
    
    // Resolve product object and ID
    let product = null
    let id = null
    if (typeof productOrId === 'object' && productOrId !== null) {
      product = productOrId
      id = productOrId.id
    } else {
      id = Number(productOrId)
      product = products.find(p => p.id === id)
    }

    if (!product) return

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === id)
      if (existingIndex > -1) {
        const currentItem = prev[existingIndex]
        const newQty = currentItem.qty + qtyToAdd
        const effectivePrice = getTierPrice(product, newQty)
        const updated = [...prev]
        updated[existingIndex] = {
          ...currentItem,
          qty: newQty,
          unitPrice: effectivePrice,
          options: { ...currentItem.options, ...options },
        }
        return updated
      } else {
        const effectivePrice = getTierPrice(product, qtyToAdd)
        return [
          ...prev,
          {
            ...product,
            qty: qtyToAdd,
            unitPrice: effectivePrice,
            options: options || {},
          },
        ]
      }
    })
  }, [getTierPrice])

  const updateQuantity = useCallback((id, newQty) => {
    const qty = Number(newQty)
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.id !== id))
      return
    }
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const product = products.find(p => p.id === id) || item
          const effectivePrice = getTierPrice(product, qty)
          return {
            ...item,
            qty,
            unitPrice: effectivePrice,
          }
        }
        return item
      })
    })
  }, [getTierPrice])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.qty, 0)
  }, [cart])

  const cartTotal = useMemo(() => {
    return Math.max(0, cart.reduce((total, item) => {
      const lineBase = (item.unitPrice || item.price) * item.qty
      const couponDisc = item.options?.couponDiscount || 0
      return total + Math.max(0, lineBase - couponDisc)
    }, 0))
  }, [cart])

  const cartSavings = useMemo(() => {
    return cart.reduce((total, item) => {
      const mrp = item.mrp || item.price
      const currentPrice = item.unitPrice || item.price
      const tierSavings = Math.max(0, (mrp - currentPrice) * item.qty)
      const couponDisc = item.options?.couponDiscount || 0
      return total + tierSavings + couponDisc
    }, 0)
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        cartSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
