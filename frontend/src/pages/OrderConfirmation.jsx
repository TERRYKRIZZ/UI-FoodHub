import "./OrderConfirmation.css";

function OrderConfirmation({ order, onTrackOrder, onBackToMenu }) {
  return (
    <div className="confirmation-page">
      <div className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="confirmation-message">
          Thank you for ordering from Tedder Restaurant.
          Your order has been received and is being processed.
        </p>

        <div className="order-details">
          <div>
            <span>Order Number</span>
            <strong>{order?.orderNumber || "#UIF-1001"}</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>
              ₦{(order?.total || 0).toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Order Type</span>
            <strong>{order?.orderType || "Collection"}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{order?.paymentMethod || "Cash"}</strong>
          </div>
        </div>

        <div className="confirmation-status">
          <span>Order Status</span>
          <strong>Preparing</strong>
        </div>

        <button
  className="tracking-button"
  onClick={onTrackOrder}
>
  Track My Order
</button>

        <button
          className="confirmation-button"
          onClick={onBackToMenu}
        >
          Back to Menu
        </button>

      </div>
    </div>
  );
}

export default OrderConfirmation;