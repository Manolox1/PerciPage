import { useContext } from "react";
import CartContext from "./Cart-Context";

const useCart = () => {
    return useContext(CartContext);
};

export default useCart;