import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../hooks/useCart"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Payment = () => {
  // console.log(import.meta.env.VITE_STRIPE_KEY)
  const [cart] = useCart([]);
  // console.log(cart)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // console.log(cartTotal)
  const totalPrice = parseFloat(cartTotal.toFixed(2))
  // console.log(totalPrice) 

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart}/>
      </Elements>
    </div>
  );
};

export default Payment;
