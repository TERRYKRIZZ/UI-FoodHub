import { useEffect, useState } from "react";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import StaffDashboard from "./pages/StaffDashboard";
import StaffLogin from "./pages/StaffLogin";
import OrderHistory from "./pages/OrderHistory";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState(() => {
  const savedOrders = localStorage.getItem("uiFoodHubOrders");
  return savedOrders ? JSON.parse(savedOrders) : [];
});
 useEffect(() => {
  localStorage.setItem("uiFoodHubOrders", JSON.stringify(orders));
}, [orders]);

useEffect(() => {
  localStorage.setItem("uiFoodHubOrders", JSON.stringify(orders));
}, [orders]);

  const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

    const addToCart = (meal) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === meal.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...meal, quantity: 1 }];
    });
  };

  const updateOrderStatus = (orderNumber, newStatus) => {
  setOrders((currentOrders) =>
    currentOrders.map((order) =>
      order.orderNumber === orderNumber
        ? { ...order, status: newStatus }
        : order
    )
  );

  setOrder((currentOrder) =>
    currentOrder?.orderNumber === orderNumber
      ? { ...currentOrder, status: newStatus }
      : currentOrder
  );
};

  // HOME PAGE
  if (page === "home") {
    return (
      <div className="app">
        {/* Navigation */}
        <header className="navbar">
          <div className="logo">
            <span className="logo-icon">🍴</span>
            <span>UI FoodHub</span>
          </div>

          <nav>
  <a href="#home">Home</a>

  <button onClick={() => setPage("menu")}>
    Menu
  </button>

  <button
  onClick={() => {
  if (orders.length > 0) {
    setPage("order-history");
  } else {
    setPage("no-orders");
  }
}}
>
  My Orders
</button>

  <button
  onClick={() => {
    setPage("menu");

    setTimeout(() => {
      document.getElementById("cart")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
>
  🛒 Cart ({cartCount})
</button>
</nav>

          <button
  className="login-button"
  onClick={() => setPage("staff-login")}
>
  Staff Portal
</button>
        </header>

        {/* Hero Section */}
        <main>
          <section className="hero" id="home">
            <div className="hero-content">
              <p className="welcome-text">
                WELCOME TO UI FOODHUB
              </p>

              <h1>
                Delicious Food,
                <br />
                <span>Right at Your Fingertips.</span>
              </h1>

              <p className="hero-description">
                Order delicious meals from Tedder Restaurant,
                University of Ibadan, quickly and conveniently.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={() => setPage("menu")}
                >
                  Order Food Now
                </button>

                <button
                  className="secondary-button"
                  onClick={() => setPage("menu")}
                >
                  View Menu
                </button>
              </div>
            </div>

            <div className="hero-food">
  <img
    src="/image/hero-foodhub.png"
    alt="Delicious Jollof Rice with Chicken"
  />
</div>
          </section>

          {/* Popular Meals */}
          <section className="popular" id="menu">
            <div className="section-heading">
              <p>OUR MENU</p>
              <h2>Popular Meals</h2>
              <span>
                Enjoy some of our favourite meals at Tedder Restaurant.
              </span>
            </div>

            <div className="food-grid">
              <div className="food-card">
                <div className="food-image">
  <img
    src="/image/jollof-rice.png"
    alt="Jollof Rice"
  />
</div>

                <div className="food-info">
                  <h3>Jollof Rice</h3>
                  <p>Delicious Nigerian jollof rice</p>

                  <div className="food-bottom">
                    <strong>₦1,500</strong>
                    
                    <button
  onClick={() =>
    addToCart({
      id: 1,
      name: "Jollof Rice",
      description: "Delicious Nigerian jollof rice served fresh.",
      price: 1500,
      image: "/image/jollof-rice.png",
    })
  }
>
  {cart.find((item) => item.id === 1)
    ? `✓ ${cart.find((item) => item.id === 1).quantity} Added`
    : "+"}
</button>
                  </div>
                </div>
              </div>

              <div className="food-card">
                <div className="food-image">
  <img
    src="/image/chips-chicken.png"
    alt="Chips & Chicken"
  />
</div>

                <div className="food-info">
                 <h3>Chips & Chicken</h3>
<p>Crispy chicken served with chips</p>

<div className="food-bottom">
  <strong>₦2,200</strong>

  <button
    onClick={() =>
      addToCart({
        id: 5,
        name: "Chips & Chicken",
        description: "Crispy chips served with seasoned chicken.",
        price: 2200,
        image: "/image/chips-chicken.png",
      })
    }
  >
    {cart.find((item) => item.id === 5)
      ? `✓ ${cart.find((item) => item.id === 5).quantity} Added`
      : "+"}
  </button>
</div>
                </div>
              </div>

              <div className="food-card">
                <div className="food-image">
  <img
    src="/image/spaghetti.png"
    alt="Spaghetti"
  />
</div>

                <div className="food-info">
                  <h3>Spaghetti</h3>
                  <p>Tasty spaghetti with special sauce</p>

                  <div className="food-bottom">
  <strong>₦1,800</strong>

  <button
    onClick={() =>
      addToCart({
        id: 3,
        name: "Spaghetti",
        description: "Tasty spaghetti prepared with special sauce.",
        price: 1800,
        image: "/image/spaghetti.png",
      })
    }
  >
    {cart.find((item) => item.id === 3)
      ? `✓ ${cart.find((item) => item.id === 3).quantity} Added`
      : "+"}
  </button>
</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="features">
            <div
  className="feature-card"
  onClick={() => setPage("menu")}
>
  <span>⚡</span>
  <h3>Fast Ordering</h3>
  <p>
    Place your food order quickly and easily.
  </p>
</div>

            <div
  className="feature-card"
  onClick={() => {
    if (order) {
      setPage("tracking");
    } else {
      setPage("no-orders");
    }
  }}
>
  <span>📦</span>
  <h3>Order Tracking</h3>
  <p>
    Track your order from preparation to collection.
  </p>
</div>

            <div
  className="feature-card"
  onClick={() => setPage("menu")}
>
  <span>🍽️</span>
  <h3>Fresh Meals</h3>
  <p>
    Choose from a variety of meals available at Tedder.
  </p>
</div>
          </section>
        </main>

        {/* Footer */}
        <footer>
          <div className="logo">
            <span className="logo-icon">🍴</span>
            <span>UI FoodHub</span>
          </div>

          <p>
            Restaurant Ordering and Inventory System — University of Ibadan
          </p>

          <p>
            © 2026 UI FoodHub. All rights reserved.
          </p>
        </footer>
      </div>
    );
  }

    // NO ORDERS PAGE
  if (page === "no-orders") {
    return (
      <div className="app">
        <header className="navbar">
          <div className="logo">
            <span className="logo-icon">🍴</span>
            <span>UI FoodHub</span>
          </div>

          <nav>
            <button onClick={() => setPage("home")}>
              Home
            </button>

            <button onClick={() => setPage("menu")}>
              Menu
            </button>

            <button>
              My Orders
            </button>
          </nav>

          <button
            className="login-button"
            onClick={() => setPage("staff-login")}
          >
            Staff Portal
          </button>
        </header>

        <main className="no-orders-page">
          <div className="no-orders-card">
            <div className="no-orders-icon">
              📦
            </div>

            <h1>No Orders Yet</h1>

            <p>
              You haven't placed an order yet.
              <br />
              Browse our menu and order your favourite meal.
            </p>

            <button
              className="primary-button"
              onClick={() => setPage("menu")}
            >
              Browse Menu
            </button>
          </div>
        </main>
      </div>
    );
  }

  // MENU PAGE
  if (page === "menu") {
    return (
      <Menu
        cart={cart}
        setCart={setCart}
        onCheckout={() => setPage("checkout")}
        onBackToHome={() => setPage("home")}
      />
    );
  }
  // STAFF LOGIN PAGE
  if (page === "staff-login") {
    return (
      <StaffLogin
        onLogin={(event) => {
          event.preventDefault();
          setPage("staff");
        }}
        onBackToHome={() => setPage("home")}
      />
    );
  }

  // CHECKOUT PAGE
  if (page === "checkout") {
    return (
      <Checkout
        cart={cart}
        onBack={() => setPage("menu")}
        onOrderPlaced={(newOrder) => {
  setOrder(newOrder);

  setOrders((currentOrders) => [
    ...currentOrders,
    newOrder,
  ]);

  setCart([]);

  setPage("confirmation");
}}
      />
    );
  }

  // ORDER CONFIRMATION PAGE
  if (page === "confirmation") {
    return (
      <OrderConfirmation
        order={order}
        onTrackOrder={() => setPage("tracking")}
        onBackToMenu={() => setPage("menu")}
      />
    );
  }

  // STAFF DASHBOARD PAGE
  if (page === "staff") {
    return (
      <StaffDashboard
        orders={orders}
        onBackToMenu={() => setPage("menu")}
        onUpdateOrder={updateOrderStatus}
      />
    );
  }

  // ORDER HISTORY PAGE

if (page === "order-history") {
  return (
    <OrderHistory
      orders={orders}
      onTrackOrder={(selectedOrder) => {
        setOrder(selectedOrder);
        setPage("tracking");
      }}
      onBackToHome={() => setPage("home")}
    />
  );
}

  // ORDER TRACKING PAGE
  if (page === "tracking") {
    return (
      <OrderTracking
  order={order}
  orders={orders}
  onBackToMenu={() => setPage("menu")}
/>
    );
  }
  return null;
}

export default App;