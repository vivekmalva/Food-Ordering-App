import Logo from '../assets/logo.jpg';
import { CartContext } from '../store/cart-context';
import CartModal from './CartModal';

import { useContext, useRef, useState } from 'react';
export default function Header() {
    const {items} = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const cartModal = useRef();
    // console.log(items);
    const handleCartBtnClick = ()=>{
        console.log("cart btn click")
    }
    return (
        <>
            <CartModal ref={cartModal}/>
            <header id='main-header'>
                <div id='title'>
                    <img src={Logo}/>
                    <h1>Food Ordering App</h1>
                </div>
                <div>
                    <button className='text-button' onClick={handleCartBtnClick}>Cart({items.length})</button>
                </div>
            </header>
        </>
    )
}