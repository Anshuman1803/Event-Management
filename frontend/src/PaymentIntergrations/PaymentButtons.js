
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
// import { checkoutProcess } from '../Slice/ReduxCartSlice';
// import { useNavigate } from "react-router-dom";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function PaymentButtons() {
    // const navigateTo = useNavigate();
    const { userID, cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(state => state.cart);
    // const dispatch = useDispatch();
    const createOrder = (data) => {
        return fetch(`${BACKEND_URL}ticket-registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: cartItems, userID: userID, cartTotalQuantity: cartTotalQuantity, cartTotalAmount: cartTotalAmount
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const onApprove = (data) => {
        return fetch(`${BACKEND_URL}ticket-registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => {
                console.log(response)
                // dispatch(checkoutProcess());
                // navigateTo("/success");
                return response.json()
            });
    };
    return (
        <PayPalButtons className="paypalButtons"
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    );
}
export default PaymentButtons