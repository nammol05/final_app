'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  itemname: string;
  cost: number;
  quantity: number;
  descrip: string;
  thumbnail: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [note, setNote] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart); // Load items from localStorage
    }
  }, []);

  const updateQuantity = async (id: string, delta: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedItems);

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {cartItems.length === 0 ? (
        <div>Your cart is empty. Start shopping!</div>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
          >
            <img
              src={item.thumbnail || '/placeholder.png'}
              alt={item.itemname || 'Product image'}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.itemname}</h2>
              <p className="text-gray-600">{item.descrip}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="mx-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-lg font-semibold text-right">
              ${item.cost * item.quantity}
            </div>
          </div>
        ))
      )}

      <div className="mb-6">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          Note for Seller
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 p-2"
          rows={3}
        />
      </div>

      <div className="mb-6 flex items-start gap-2">
        <input
          type="checkbox"
          className="form-checkbox accent-purple-600"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <label className="text-sm text-gray-700">
          I agree to the Terms and Conditions
        </label>
      </div>

      <div className="text-lg font-bold mb-4">Total: ${totalPrice}</div>

      <button
        className="w-full bg-purple-600 text-white text-lg font-medium rounded-lg py-3 hover:bg-purple-700 mb-4 transition-colors disabled:opacity-50"
        disabled={cartItems.length === 0 || !agreed}
      >
        Checkout
      </button>
    </div>
  );
}