import "./OrderTracking.css";

function OrderTracking({ order, onBackToMenu }) {
  const currentStatus = order?.status || "Preparing";
  const orderType = order?.orderType || "Collection";

  const isDelivery = orderType === "Delivery";

  return (
    <div className="tracking-page">
      <div className="tracking-card">
        <div className="tracking-header">
          <span className="tracking-label">UI FOODHUB</span>

          <h1>Track Your Order</h1>

          <p>
            Follow your order from preparation to{" "}
            {isDelivery ? "delivery." : "collection."}
          </p>
        </div>

        <div className="tracking-order-number">
          <span>Order Number</span>

          <strong>
            {order?.orderNumber || "#UIF-1001"}
          </strong>
        </div>

        {/* ORDER CONFIRMED */}
        <div className="tracking-steps">
          <div className="tracking-step completed">
            <div className="step-icon">✓</div>

            <div className="step-content">
              <h3>Order Confirmed</h3>

              <p>Your order has been received.</p>
            </div>
          </div>

          <div className="tracking-line"></div>

          {/* PREPARING */}
          <div
            className={`tracking-step ${
              currentStatus === "Preparing" ? "active" : ""
            }`}
          >
            <div className="step-icon">2</div>

            <div className="step-content">
              <h3>Preparing</h3>

              <p>The restaurant is preparing your meal.</p>
            </div>
          </div>

          <div className="tracking-line"></div>

          {/* DELIVERY OR COLLECTION */}
          <div
            className={`tracking-step ${
              (
                isDelivery
                  ? currentStatus === "Out for Delivery"
                  : currentStatus === "Ready for Collection"
              )
                ? "active"
                : ""
            }`}
          >
            <div className="step-icon">3</div>

            <div className="step-content">
              <h3>
                {isDelivery
                  ? "Out for Delivery"
                  : "Ready for Collection"}
              </h3>

              <p>
                {isDelivery
                  ? "Your order is on its way to you."
                  : "Your order is ready for collection."}
              </p>
            </div>
          </div>

          <div className="tracking-line"></div>

          {/* FINAL STEP */}
          <div
            className={`tracking-step ${
              (
                isDelivery
                  ? currentStatus === "Delivered"
                  : currentStatus === "Collected"
              )
                ? "active"
                : ""
            }`}
          >
            <div className="step-icon">4</div>

            <div className="step-content">
              <h3>
                {isDelivery ? "Delivered" : "Collected"}
              </h3>

              <p>
                {isDelivery
                  ? "Your order has been delivered. Enjoy your meal!"
                  : "Your order has been collected. Enjoy your meal!"}
              </p>
            </div>
          </div>
        </div>

        <button
          className="tracking-button"
          onClick={onBackToMenu}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderTracking;