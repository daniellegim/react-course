import React, {useState, useContext} from 'react'

const CartContext = React.createContext()
const CartUpdateContext = React.createContext()
const CartRemoveContext = React.createContext()
const CartClearContext = React.createContext()

export function useCart() {
    return useContext(CartContext)
}

export function useCartUpdate() {
    return useContext(CartUpdateContext)
}

export function useCartRemove() {
    return useContext(CartRemoveContext)
}

export function useCartClear() {
    return useContext(CartClearContext)
}

export function CartProvider({ children}) {
    const [cart, setCart] = useState([])

    function updateCart(value) {
        setCart([...cart, ...value])
    }

    function removeFromCart(value) {
        setCart(cart.filter(course => (course.name !== value)))
    }

    function clearCart() {
        setCart([])
    }

    return(
        <CartContext.Provider value={cart}>
            <CartUpdateContext.Provider value={updateCart}>
                <CartRemoveContext.Provider value={removeFromCart}>
                    <CartClearContext.Provider value={clearCart}>
                        {children}
                    </CartClearContext.Provider>
                </CartRemoveContext.Provider>
            </CartUpdateContext.Provider>
        </CartContext.Provider>
    )
}