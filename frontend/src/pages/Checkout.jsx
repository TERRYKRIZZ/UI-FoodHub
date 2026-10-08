import { useState } from "react";
import "./Checkout.css";

function Checkout({ cart, onBack, onOrderPlaced }) {
    const [orderType, setOrderType] = useState("Collection");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  const [customerName, setCustomerName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [email, setEmail] = useState("");
const [deliveryAddress, setDeliveryAddress] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (event) => {
  event.preventDefault();
    const newOrder = {
  orderNumber:
    "#UIF-" + Math.floor(1000 + Math.random() * 9000),
    orderDate: new Date().toISOString(),
    items: cart,

  customerName: customerName,

  phoneNumber: phoneNumber,

  email: email,

  total: subtotal,

  orderType: orderType,

  deliveryAddress: orderType === "Delivery" ? deliveryAddress : "",

  paymentMethod: paymentMethod,

  status: "Preparing",
};

    // Send the completed order back to App.jsx
    onOrderPlaced(newOrder);
  };

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <span>UI FOODHUB</span>

        <h1>Checkout</h1>

        <p>
          Complete your order at Tedder Restaurant.
        </p>
      </div>

      <div className="checkout-container">

        {/* CUSTOMER INFORMATION */}
       <form className="checkout-form" onSubmit={handlePlaceOrder}>

          <h2>Customer Information</h2>

          <label>Full Name</label>

          <input
  type="text"
  placeholder="Enter your full name"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
  required
/>

          <label>Phone Number</label>

          <input
  type="tel"
  placeholder="Enter your phone number"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  required
/>
          <label>Email Address</label>

          <input
  type="email"
  placeholder="Enter your email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

          <label>Order Type</label>

          <select
  value={orderType}
  onChange={(e) => setOrderType(e.target.value)}
>
  <option value="Collection">
    Collection
  </option>

  <option value="Delivery">
    Delivery
  </option>
</select>

          <label>Payment Method</label>

          <select
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
>
  <option value="Cash">
    Cash
  </option>

  <option value="Card Payment">
    Card Payment
  </option>

  <option value="Bank Transfer">
    Bank Transfer
  </option>
</select>

{orderType === "Delivery" && (
  <>
    <label>Delivery Address</label>

    <textarea
      placeholder="Enter your delivery address"
      value={deliveryAddress}
      onChange={(e) => setDeliveryAddress(e.target.value)}
      required
    />
  </>
)}

{paymentMethod === "Bank Transfer" && (
  <div className="bank-transfer-box">
    <h3>🏦 Bank Transfer Details</h3>

    <p>
      Please transfer the exact amount to the account below.
    </p>

    <div className="bank-details">
      <div>
        <span>Bank Name</span>
        <strong>UI FoodHub Bank</strong>
      </div>

      <div>
        <span>Account Name</span>
        <strong>Tedder Restaurant</strong>
      </div>

      <div>
        <span>Account Number</span>
        <strong>0123456789</strong>
      </div>

      <div>
        <span>Amount to Transfer</span>
        <strong>₦{subtotal.toLocaleString()}</strong>
      </div>
    </div>

    <label className="transfer-confirmation">
  <input
    type="checkbox"
    checked={transferConfirmed}
    onChange={(e) =>
      setTransferConfirmed(e.target.checked)
    }
  />

  I have made the transfer
</label>
  </div>
)}

          {/* PLACE ORDER */}
          <button
  type="submit"
  className="place-order-button"
  disabled={
    paymentMethod === "Bank Transfer" &&
    !transferConfirmed
  }
>
  Place Order
</button>

          {/* BACK TO CART */}
          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back to Cart
          </button>

        </form>

        {/* ORDER SUMMARY */}
        <div className="order-summary">

          <h2>Your Order</h2>

          {cart.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >

              <div>
                <h3>{item.name}</h3>

                <p>
                  ₦{item.price.toLocaleString()} ×{" "}
                  {item.quantity}
                </p>
              </div>

              <strong>
                ₦
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </strong>

            </div>
          ))}

          <div className="summary-total">

            <span>Total</span>

            <strong>
              ₦{subtotal.toLocaleString()}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;