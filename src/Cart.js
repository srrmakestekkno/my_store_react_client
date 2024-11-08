import { useState, useEffect } from "react";

const Cart = ({ token }) => {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response) {
          throw new Error("Error fetching cart");
        }

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err);
      }
    };

    if (token) {
      fetchCart();
    }
  }, [token]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Error adding product to cart.");
      }

      const newCartItem = { productId, quantity };
      setCart((prevCart) => [...prevCart, newCartItem]);
      setProductId("");
      setQuantity(1);
    } catch (err) {
      setError("Error adding product to cart.");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/api/products/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Error removing product from cart.");
      }

      setCart(cart.filter((item) => item.productId === productId));
    } catch (err) {
      setError("Error removing product from cart.");
    }
  };

  return (
    <div>
      <h2>Your cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>Add product</h3>
        <input
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onCanPlay={(e) => setQuantity(e.target.value)}
        />
        <button onCanPlay={handleAddToCart}>Add to cart</button>
      </div>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            Product ID: {item.productId}, Quantity: {item.quantity}
            <button onClick={handleRemoveFromCart(item.productId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cart;
