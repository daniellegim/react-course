import React, {useState, useContext} from 'react'

const CartContext = React.createContext()
const CartUpdateContext = React.createContext()

export function useCart() {
    return useContext(CartContext)
}

export function useCartUpdate() {
    return useContext(CartUpdateContext)
}

export function CartProvider({ children}) {
    const [cart, setCart] = useState()

    return(
        <CartContext.Provider value={cart}>
            <CartUpdateContext.Provider value={}>
                {children}
            </CartUpdateContext.Provider>
        </CartContext.Provider>
    )
}