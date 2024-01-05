import { createRef, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import CheckoutModal from "./CheckoutModal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";

const CartModal = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  let totalCartPrice = 0;
  const checkoutModal = useRef();
  items.map((item) => {
    totalCartPrice = totalCartPrice + item.price * item.quantity;
  });
  const handleCheckout = () => {
    checkoutModal.current.open();
  };
  return createPortal(
    <dialog ref={ref} className="cart modal">
      <h2>Your Cart</h2>
      {items?.length > 0 && (
        <>
          <CheckoutModal ref={checkoutModal} totalCartPrice={totalCartPrice} />
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id} className="cart-item">
                  <p>
                    {item.name} - {item.quantity} x ${item.price}
                  </p>
                  <div className="cart-item-actions">
                    <button
                      onClick={() => {
                        dispatch(
                          cartActions.removeFromCart({
                            id: item.id,
                          })
                        );
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        dispatch(
                          cartActions.addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                          })
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-total">${totalCartPrice.toFixed(2)}</div>
        </>
      )}
      {items?.length === 0 && (
        <p>Your Cart is Empty, Please Add some items to Proceed</p>
      )}
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        {items?.length > 0 && (
          <button onClick={handleCheckout} className="button">
            Go To Checkout
          </button>
        )}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
