import { createPortal } from "react-dom"


export default function CartModal() {
    return createPortal(
        <dialog>
            <h2>Your Cart</h2>
            <ol>
                <li>Item</li>
            </ol>
            <div>
                Total
            </div>
            <form method="dialog">
                <button>Close</button>
                <button>Go To Checkout</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
} 