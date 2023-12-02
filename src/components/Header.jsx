import Logo from '../assets/logo.jpg';
import { CartContext } from '../store/cart-context';
import CartModal from './CartModal';

import { useContext, useRef, useState } from 'react';
export default function Header() {
    const { items } = useContext(CartContext);
    let totalCartItems = 0;
    items.map((item) => {
        totalCartItems += item.quantity
    })
    const [showModal, setShowModal] = useState(false);
    const cartModal = useRef();
    const handleCartBtnClick = () => {
        cartModal.current.showModal();
    }
    return (
        <>
            <CartModal ref={cartModal} />
            <header id='main-header'>
                <div id='title'>
                    <img src={Logo} />
                    <h1>Food Ordering App</h1>
                </div>
                <div>
                    <button className='text-button' onClick={handleCartBtnClick}>Cart({totalCartItems})</button>
                </div>
            </header>
        </>
    )
}