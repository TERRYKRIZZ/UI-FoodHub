import "./OrderHistory.css";

function OrderHistory({ orders, onTrackOrder, onBackToHome }) {
  return (
    <div className="order-history-page">
      <div className="order-history-header">
        <span>UI FOODHUB</span>
        <h1>My Orders</h1>
        <p>View your previous orders and track their status.</p>
      </div>

      <div className="order-history-container">
        {orders.length === 0 ? (
          <div className="order-history-empty">
            <div>📦</div>
            <h2>No Orders Yet</h2>
            <p>Your orders will appear here after you place an order.</p>

            <button onClick={onBackToHome}>
              Back to Home
            </button>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <div
                className="order-history-card"
                key={order.orderNumber}
              >
                <div className="order-history-top">
                  <div>
                    <span>Order Number</span>
                    <strong>{order.orderNumber}</strong>
                  </div>

                  <span className="order-history-status">
                    {order.status}
                  </span>
                </div>

                <div className="order-history-info">
                  <div>
                    <span>Date</span>
                    <strong>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleString([], {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Order Type</span>
                    <strong>{order.orderType}</strong>
                  </div>

                  <div>
                    <span>Total</span>
                    <strong>
                      ₦{order.total.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button
                  className="track-order-button"
                  onClick={() => onTrackOrder(order)}
                >
                  Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;