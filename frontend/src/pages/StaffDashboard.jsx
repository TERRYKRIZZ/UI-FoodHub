import { useEffect, useState } from "react";
import "./StaffDashboard.css";

function StaffDashboard({ orders, onBackToMenu, onUpdateOrder }) {
  const totalOrders = orders.length;

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const readyOrders = orders.filter(
    (order) => order.status === "Ready for Collection"
  ).length;

  const collectedOrders = orders.filter(
    (order) => order.status === "Collected"
    
  ).length;

  const outForDeliveryOrders = orders.filter(
  (order) => order.status === "Out for Delivery"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const [selectedOrder, setSelectedOrder] = useState(null);

const [recipes] = useState([
  {
    id: 1,
    meal: "Jollof Rice",
    ingredients: [
      "Rice",
      "Tomatoes",
      "Vegetable Oil",
    ],
  },
  {
    id: 2,
    meal: "Fried Rice & Chicken",
    ingredients: [
      "Rice",
      "Chicken",
      "Vegetable Oil",
    ],
  },
  {
    id: 3,
    meal: "Spaghetti",
    ingredients: [
      "Spaghetti",
      "Tomatoes",
      "Vegetable Oil",
    ],
  },
  {
    id: 4,
    meal: "Rice & Beans",
    ingredients: [
      "Rice",
      "Beans",
      "Vegetable Oil",
    ],
  },
  {
    id: 5,
    meal: "Chips & Chicken",
    ingredients: [
      "Chicken",
      "Vegetable Oil",
    ],
  },
  {
    id: 6,
    meal: "Moi Moi",
    ingredients: [
      "Beans",
      "Vegetable Oil",
    ],
  },
]);

  const [inventory, setInventory] = useState(() => {
  const savedInventory = localStorage.getItem("uiFoodHubInventory");

  return savedInventory
    ? JSON.parse(savedInventory)
    : [
  {
    id: 1,
    name: "Rice",
    category: "Grains",
    quantity: 25,
    unit: "kg",
  },
  {
    id: 2,
    name: "Chicken",
    category: "Protein",
    quantity: 18,
    unit: "kg",
  },
  {
    id: 3,
    name: "Beans",
    category: "Grains",
    quantity: 8,
    unit: "kg",
  },
  {
    id: 4,
    name: "Spaghetti",
    category: "Pasta",
    quantity: 12,
    unit: "kg",
  },
  {
    id: 5,
    name: "Vegetable Oil",
    category: "Cooking",
    quantity: 15,
    unit: "litres",
  },
  {
    id: 6,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 5,
    unit: "kg",
    },
];
});
useEffect(() => {
  localStorage.setItem(
    "uiFoodHubInventory",
    JSON.stringify(inventory)
  );
}, [inventory]);

   const updateInventory = (id) => {
  const newQuantity = prompt("Enter new quantity:");

  if (newQuantity === null || newQuantity === "") {
    return;
  }

  setInventory((currentInventory) =>
    currentInventory.map((item) =>
      item.id === id
        ? { ...item, quantity: Number(newQuantity) }
        : item
    )
  );
};
return (
    <div className="staff-dashboard">
      <header className="staff-header">
        <div>
          <span>UI FOODHUB</span>
          <h1>Staff Dashboard</h1>
          <p>Manage customer orders at Tedder Restaurant.</p>
        </div>

        <button
          className="staff-back-button"
          onClick={onBackToMenu}
        >
          ← Back to Menu
        </button>
      </header>

      {/* DASHBOARD SUMMARY */}
      <section className="dashboard-summary">
        <div className="dashboard-card">
          <span>Total Orders</span>
          <strong>{totalOrders}</strong>
        </div>

        <div className="dashboard-card">
          <span>Preparing</span>
          <strong>{preparingOrders}</strong>
        </div>

        <div className="dashboard-card">
          <span>Ready</span>
          <strong>{readyOrders}</strong>
        </div>

        <div className="dashboard-card">
          <span>Collected</span>
          <strong>{collectedOrders}</strong>
        </div>

        <div className="dashboard-card">
  <span>Out for Delivery</span>
  <strong>{outForDeliveryOrders}</strong>
</div>

<div className="dashboard-card">
  <span>Delivered</span>
  <strong>{deliveredOrders}</strong>
</div>
      </section>

      {/* ORDERS */}
      <section className="orders-section">
        <div className="section-title">
  <div>
    <h2>Recent Orders</h2>
    <p className="orders-hint">
      Click an order to view customer details.
    </p>
  </div>

<span>
  {totalOrders} {totalOrders === 1 ? "order" : "orders"}
</span></div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div>📦</div>
            <h3>No Orders Yet</h3>
            <p>
              Customer orders will appear here when they are placed.
            </p>
          </div>
        ) : (
          <div className="orders-table">
  <div className="table-header">
  <span>Customer</span>
<span>Order Number</span>
<span>Order Time</span>
<span>Total</span>
  <span>Order Type</span>
  <span>Payment</span>
  <span>Status</span>
  <span>Action</span>
</div>

  {orders.map((order) => (
   <div
  className="table-row"
  key={order.orderNumber}
  onClick={() => setSelectedOrder(order)}
>
  <strong>{order.customerName}</strong>

  <strong>{order.orderNumber}</strong>

<span>
  {order.orderDate
    ? new Date(order.orderDate).toLocaleString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—"}
</span>

<span>
  ₦{order.total.toLocaleString()}
</span>

      <span>{order.orderType}</span>

      <span>{order.paymentMethod}</span>

      <span className="status-badge">
        {order.status}
      </span>

      <span>
  {order.status === "Preparing" && (
  <button
    className="order-action-button"
    onClick={(event) => {
      event.stopPropagation();

      const nextStatus =
        order.orderType === "Delivery"
          ? "Out for Delivery"
          : "Ready for Collection";

      onUpdateOrder(
        order.orderNumber,
        nextStatus
      );

      setSelectedOrder({
        ...order,
        status: nextStatus,
      });
    }}
  >
    {order.orderType === "Delivery"
      ? "Mark Out for Delivery"
      : "Mark Ready"}
  </button>
)}

 {order.status === "Ready for Collection" &&
  order.orderType === "Collection" && (
    <button
      className="order-action-button"
      onClick={(event) => {
        event.stopPropagation();

        onUpdateOrder(
          order.orderNumber,
          "Collected"
        );

        setSelectedOrder({
          ...order,
          status: "Collected",
        });
      }}
    >
      Mark Collected
    </button>
  )}

{order.status === "Out for Delivery" &&
  order.orderType === "Delivery" && (
    <button
      className="order-action-button"
      onClick={(event) => {
        event.stopPropagation();

        onUpdateOrder(
          order.orderNumber,
          "Delivered"
        );

        setSelectedOrder({
          ...order,
          status: "Delivered",
        });
      }}
    >
      Mark Delivered
    </button>
  )}

  {order.status === "Ready for Collection" &&
    order.orderType === "Delivery" && (
      <button
        className="order-action-button"
        onClick={(event) => {
          event.stopPropagation();

          onUpdateOrder(
            order.orderNumber,
            "Out for Delivery"
          );

          setSelectedOrder({
            ...order,
            status: "Out for Delivery",
          });
        }}
      >
        Out for Delivery
      </button>
    )}

  {(order.status === "Collected" ||
    order.status === "Delivered") && (
    <span className="completed-label">
      Completed
    </span>
  )}
</span>
    </div>
  ))}
</div>
        )}
             </section>

{/* ORDER DETAILS */}
{selectedOrder && (
  <section className="order-details-section">
    <div className="section-title">
      <h2>Order Details</h2>

      <button
        className="close-details-button"
        onClick={() => setSelectedOrder(null)}
      >
        Close
      </button>
    </div>

    <div className="order-details-grid">
      <div>
        <span>Customer Name</span>
        <strong>{selectedOrder.customerName}</strong>
      </div>

      <div>
        <span>Phone Number</span>
        <strong>{selectedOrder.phoneNumber}</strong>
      </div>

      <div>
        <span>Email Address</span>
        <strong>{selectedOrder.email}</strong>
      </div>

      <div>
        <span>Order Number</span>
        <strong>{selectedOrder.orderNumber}</strong>
      </div>

<div className="order-items-details">
  <span>Ordered Items</span>

  <div className="order-items-list">
    {selectedOrder.items?.map((item) => (
      <div className="order-item-detail" key={item.id}>
        <strong>{item.name}</strong>

        <span>
          {item.quantity} × ₦{item.price.toLocaleString()}
        </span>

        <strong>
          ₦{(item.price * item.quantity).toLocaleString()}
        </strong>
      </div>
    ))}
  </div>
</div>
      <div>
        <span>Total Amount</span>
        <strong>
          ₦{selectedOrder.total.toLocaleString()}
        </strong>
      </div>

      <div>
        <span>Order Type</span>
        <strong>{selectedOrder.orderType}</strong>
      </div>

      {selectedOrder.orderType === "Delivery" && (
  <div>
    <span>Delivery Address</span>
    <strong>{selectedOrder.deliveryAddress}</strong>
  </div>
)}

      <div>
        <span>Payment Method</span>
        <strong>{selectedOrder.paymentMethod}</strong>
      </div>

      <div>
        <span>Order Status</span>
        <strong>{selectedOrder.status}</strong>
      </div>
    </div>
  </section>
)}

      {/* INVENTORY */}
      <section className="inventory-section">
        <div className="section-title">
          <h2>Inventory Management</h2>
          <span>Current Stock</span>
        </div>

        <div className="inventory-table">
  <div className="inventory-header">
    <span>Ingredient</span>
    <span>Category</span>
    <span>Quantity</span>
    <span>Unit</span>
    <span>Status</span>
    <span>Action</span>
  </div>

  {inventory.map((item) => (
    <div className="inventory-row" key={item.id}>
      <strong>{item.name}</strong>

      <span>{item.category}</span>

      <span>{item.quantity}</span>

      <span>{item.unit}</span>

      <span
        className={`stock-badge ${
          item.quantity <= 10
            ? "stock-low"
            : "stock-good"
        }`}
      >
        {item.quantity <= 10 ? "Low Stock" : "In Stock"}
      </span>

      <button
  className="inventory-action-button"
  onClick={() => updateInventory(item.id)}
>
  Update Stock
</button>
    </div>
  ))}
</div>
      </section>

{/* RECIPE MANAGEMENT */}
<section className="inventory-section">
  <div className="section-title">
    <h2>Recipe Management</h2>
    <span>Meal Ingredients</span>
  </div>

  <div className="recipe-list">
    {recipes.map((recipe) => (
      <div className="recipe-card" key={recipe.id}>
        <h3>{recipe.meal}</h3>

        <div className="recipe-ingredients">
          {recipe.ingredients.map((ingredient) => (
            <span key={ingredient}>
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
</div>
  );
}

export default StaffDashboard;