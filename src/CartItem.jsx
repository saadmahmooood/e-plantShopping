// === File: src/CartItem.jsx ===
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = cost => parseFloat(cost.replace(/[^0-9.]/g, '')) || 0;

  // Calculate total cost of all items
  const calculateTotalAmount = () =>
    cartItems
      .reduce((sum, item) => sum + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);

  // Calculate subtotal for a single item
  const calculateItemTotal = item => (parseCost(item.cost) * item.quantity).toFixed(2);

  // Continue shopping handler
  const handleContinue = e => {
    e.preventDefault();
    onContinueShopping();
  };

  // Checkout handler
  const handleCheckoutShopping = e => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // Increment quantity
  const handleIncrement = item =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  // Decrement quantity or remove if 0
  const handleDecrement = item => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item entirely
  const handleRemove = item => dispatch(removeItem(item.name));

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cartItems.map(item => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div>Total: ${calculateItemTotal(item)}</div>
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
      <div className="cart-actions">
        <button onClick={handleContinue}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
