import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";

const CheckOutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { darkMode } = useDarkMode(); // Get dark mode state from context
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or is less than 1");
      return;
    }
    axiosSecure
      .post("/create-payment-intent", { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log("Client Secret:", res.data.clientSecret); // Log for debugging
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        setCardError("Failed to initialize payment.");
      });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      console.log("[PaymentMethod Error]", paymentMethodError);
      setCardError(paymentMethodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log("Confirmation Error:", confirmError);
      setCardError("Payment confirmation failed. Please try again.");
    } else {
      console.log("Payment Intent:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setCardError(
          `Payment successful! and Your Transaction Id is ${paymentIntent.id}`
        );
        // Here you can handle post-payment logic, such as updating the database
      }

      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "order pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo);
      // Send Info In Backend
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        navigate("/order");
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number Of Items: {cart.length}</p>
      </div>
      <div className={`md:w-1/3 w-full space-y-5 card bg-base-100 max-w-sm shrink-0 shadow-2xl px-4 py-8 ${
        darkMode ? "text-black" : ""
      }`}>
        <h4 className="text-lg font-semibold">Process Your Payment!</h4>
        <h5 className="font-medium">Credit / Debit Card</h5>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn w-full btn-sm mt-5 bg-primary text-white"
          >
            Pay
          </button>
        </form>
        {cardError && <p className="text-red italic text-xs">{cardError}</p>}
        <hr />
        <div className="mt-5 text-center">
          <button
            type="button" // Use "button" instead of "submit"
            className="btn btn-sm mt-5 bg-orange-400 text-white"
          >
            <FaPaypal className="mr-2" /> Pay With Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
