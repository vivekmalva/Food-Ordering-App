import Logo from '../assets/logo.jpg';
import Cart from './Cart';
import CartContextProvider from '../store/cart-context';
import { useContext } from 'react';
export default function Header() {
    useContext()
    return (
        <CartContextProvider>
            <header id='main-header'>
                <div id='title'>
                    <img src={Logo}/>
                    <h1>Food Ordering App</h1>
                </div>
                <div>
                    <button className='text-button'>Cart(0)</button>
                </div>
            </header>
        </CartContextProvider>
    )
}