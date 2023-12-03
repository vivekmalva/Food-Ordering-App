import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import Input from "../UI/Input";


const CheckoutModal = forwardRef(({ totalCartPrice }, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("form submit");
    }
    return createPortal(
        <dialog className="modal" ref={dialog}>
            <h2>Checkout</h2>
            <p>Total Amount : ${totalCartPrice}</p>
            <form onSubmit={handleFormSubmit}>
                <Input name="name" label="Full Name" type="text" id="name" />
                <div className="modal-actions">
                    <button className="text-button" type="button" onClick={() => dialog.current.close()}>Close</button>
                    <button className="button" type="submit">Submit Order</button>
                </div>
            </form>
        </dialog>, document.getElementById('modal')
    )
});

export default CheckoutModal;
