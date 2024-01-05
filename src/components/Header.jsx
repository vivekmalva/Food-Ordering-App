import { useSelector } from "react-redux";
import Logo from "../assets/logo.jpg";
import CartModal from "./CartModal";

import { useRef } from "react";
export default function Header() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartModal = useRef();
  const handleCartBtnClick = () => {
    cartModal.current.showModal();
  };
  return (
    <>
      <CartModal ref={cartModal} />
      <header id="main-header">
        <div id="title">
          <img src={Logo} />
          <h1>Food Ordering App</h1>
        </div>
        <div>
          <button className="text-button" onClick={handleCartBtnClick}>
            Cart({totalQuantity})
          </button>
        </div>
      </header>
    </>
  );
}
