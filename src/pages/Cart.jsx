import React from "react";
import useCart from "../contexts/UseCart";
import { Plus, Minus, Trash2 } from "lucide-react";

const Cart = () => {
    const { 
        cart, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart 
        } = useCart();

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleWhatsAppOrder = () => {
        const phone = "5491139330660"; // 🔴 PONER NUMERO REAL

        const message = cart.map(item =>
                `• ${item.name} x${item.quantity} - $${item.price * item.quantity}`
            )
            .join("\n");

            const finalMessage =
            `🛒 Nuevo Pedido - Perci\n\n${message}\n\nTotal: $${totalPrice}`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
        finalMessage
        )}`;

        window.open(url, "_blank");
    };

    if (cart.length === 0) {
        return (
        <div className="container mx-auto mt-32 text-center">
            <h2 className="text-2xl font-semibold">Tu carrito está vacío 🛒</h2>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-16">
            
            <div className="conteiner p-10 w-full max-w-2xl bg-white rounded-3xl mx-auto max-w-3xl">

            {/* Título */}
            <h1 className="text-5xl font-bold text-center mb-16">
                Tu pedido
            </h1>

            {/* Productos */}
            <div className="flex-1 space-y-8">
                {cart.map((item) => (
                <div key={item.id}>
                    
                    <div className="flex justify-between items-center">

                    {/* Nombre + cantidad */}
                    <div>
                        <p className="text-lg text-gray-500">
                        {item.name}
                        </p>

                        <div className="flex items-center gap-4">
                        
                        {/* Restar */}
                        <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        >
                            -
                        </button>

                        <span>{item.quantity}</span>

                        {/* Sumar */}
                        <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        >
                            +
                        </button>

                        </div>
                    </div>

                    {/* Precio */}
                    <div className="flex items-center justify-between md:justify-end gap-6">
                        <p className="text-lg font-bold text-[rgb(22,148,137)]">
                            ${item.price * item.quantity}
                        </p>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            🗑
                        </button>
                    </div>

                    </div>

                    {/* Línea */}
                    <div className="mt-4 border-b border-grey" />

                </div>
                ))}
            </div>

            {/* Botón */}
            <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <h3 className="text-2xl font-bold text-gray-900">
                    Total: <span className="text-[rgb(22,148,137)]">${totalPrice}</span>
                </h3>

                <button
                    onClick={handleWhatsAppOrder}
                    className="bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                    Realizar Pedido
                </button>
                </div>

            </div>
        </div>
        );
};

export default Cart;