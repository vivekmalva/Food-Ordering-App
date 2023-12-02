import { forwardRef, useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context";




const CartModal = forwardRef((props, ref) => {
    const { items, updateCart } = useContext(CartContext);
    let totalCartPrice = 0;
    items.map((item) => {
        totalCartPrice = (totalCartPrice + (item.price * item.quantity));
        console.log(totalCartPrice)
    })
    return createPortal(
        <dialog ref={ref} className="cart modal">
            <h2>Your Cart</h2>
            <ul>
                {items.map((item) => {
                    return <li key={item.id} className="cart-item">
                        <p>{item.name} - {item.quantity} x ${item.price}</p>
                        <div className="cart-item-actions">
                            <button onClick={() => { updateCart("decreaseQuantity") }}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => { updateCart("increaseQuantity") }}>+</button>
                        </div>
                    </li>
                })}

            </ul>
            <div className="cart-total">
                ${totalCartPrice.toFixed(2)}
            </div>
            <form method="dialog" className="modal-actions">
                <button className="text-button">Close</button>
                <button className="button">Go To Checkout</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default CartModal;