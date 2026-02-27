import { useState } from "react";
import CartContext from "./Cart-Context";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
        setCart(cart.map(item =>
            item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        } else {
        setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const increaseQuantity = (id) => {
    setCart(cart.map(item =>
        item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
    };

    const decreaseQuantity = (id) => {
    setCart(cart
        .map(item =>
        item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
    };

    const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider 
        value={{ cart,
                addToCart,
                totalItems,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart }}>
        {children}
        </CartContext.Provider>
    );
    };

export default CartProvider;