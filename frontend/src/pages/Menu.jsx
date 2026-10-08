import { useState } from "react";
import "./Menu.css";

const meals = [
  {
  id: 1,
  name: 'Jollof Rice',
  description: 'Delicious Nigerian jollof rice served fresh.',
  price: 1500,
  category: "Rice",
  image: '/image/jollof-rice.png',
},
  {
  id: 2,
  name: "Fried Rice & Chicken",
  description: "Tasty fried rice served with crispy chicken.",
  price: 2000,
  image: '/image/fried-rice-chicken.png',
  category: "Chicken",
},
  {
  id: 3,
  name: "Spaghetti",
  description: "Tasty spaghetti prepared with special sauce.",
  price: 1800,
  image: '/image/spaghetti.png',
  category: "Pasta",
},
 {
  id: 4,
  name: "Rice & Beans",
  description: "A delicious combination of rice and beans.",
  price: 1600,
  image: '/image/rice-beans.png',
  category: "Rice",
},
  {
  id: 5,
  name: "Chips & Chicken",
  description: "Crispy chips served with seasoned chicken.",
  price: 2200,
  image: '/image/chips-chicken.png',
  category: "Chicken",
},
  {
  id: 6,
  name: "Moi Moi",
  description: "Freshly prepared Nigerian steamed bean pudding.",
  price: 1000,
  image: '/image/moi-moi.png',
  category: "Snacks",
},
];

function Menu({ cart, setCart, onCheckout, onBackToHome }) {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Rice", "Chicken", "Pasta", "Snacks"];

  // Add item to cart
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

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Filter menu by category and search
const filteredMeals = meals.filter((meal) => {
  const matchesCategory =
    category === "All" || meal.category === category;

  const matchesSearch =
    meal.name.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});

  // Number of individual items
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

    return (
  <div className="menu-page">

    {/* Menu Navigation */}
    <header className="menu-navbar">

      <div className="menu-logo">
        <span>🍴</span>
        <strong>UI FoodHub</strong>
      </div>

      <nav>
        <button onClick={onBackToHome}>
          Home
        </button>

        <button className="menu-nav-active">
          Menu
        </button>

        <button
          onClick={() => {
            if (cart.length > 0) {
              document.getElementById("cart")?.scrollIntoView({
                behavior: "smooth",
              });
            }
          }}
        >
          🛒 Cart ({cartCount})
        </button>
      </nav>

    </header>

      {/* Page heading */}
      <div className="menu-header">
        <p>TEDDER RESTAURANT</p>
        <h1>Our Menu</h1>
        <span>
          Choose from a variety of delicious meals available at UI FoodHub.
        </span>
      </div>

      {/* Search */}
<div className="menu-search">
  <input
    type="text"
    placeholder="Search for a meal..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

      {/* Categories */}
      <div className="category-buttons">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Menu */}
      <div className="menu-grid">
        {filteredMeals.map((meal) => (
          <div className="menu-card" key={meal.id}>

            <div className="menu-card-image">
  <img src={meal.image} alt={meal.name} />
</div>

            <div className="menu-card-content">
              <h2>{meal.name}</h2>

              <p>{meal.description}</p>

              <div className="menu-card-bottom">
                <strong>
                  ₦{meal.price.toLocaleString()}
                </strong>

                <button
                  className="add-button"
                  onClick={() => addToCart(meal)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className="cart-box" id="cart">
          <h2>Your Cart</h2>

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>

              <div className="cart-item-info">
                <div className="cart-image">
  <img src={item.image} alt={item.name} />
</div>

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    ₦{item.price.toLocaleString()} each
                  </p>
                </div>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
  onClick={() => increaseQuantity(item.id)}
>
  +
</button>
              </div>

              <strong className="item-total">
                ₦
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </strong>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h2>
              Total: ₦{cartTotal.toLocaleString()}
            </h2>

            <button
  className="checkout-button"
  onClick={onCheckout}
>
  Proceed to Checkout
</button>
          </div>
        </div>
      )}

      {/* Empty cart message */}
      {cart.length === 0 && (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>
            Click the + button on a meal to add it to your cart.
          </p>
        </div>
      )}

    </div>
  );
}

export default Menu;