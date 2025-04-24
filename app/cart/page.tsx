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
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart items from the backend when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token
    if (!token) {
      setError('You must be logged in to view your cart.');
      return;
    }
  
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            setError('You are not authorized. Please log in again.');
            return;
          }
          throw new Error('Failed to fetch cart items');
        }
  
        const data = await response.json();
        // Ensure the response is structured as { cartItems: [...] }
        setCartItems(data.cartItems || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCart(); // Trigger fetch when component mounts
  }, []);

  // Update the quantity of an item in the cart
  const updateQuantity = async (id: string, delta: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedItems);

    // Update the backend with the new quantity
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to update your cart.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: updatedItems.find((item) => item.id === id)?.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token'); // Ensure the token is present
      if (!token) {
        setError('You must be logged in to checkout.');
        return;
      }

      for (const item of cartItems) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
          body: JSON.stringify({
            inventory_id: parseInt(item.id), // Or adjust depending on your backend API requirements
            quantity: item.quantity,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add item to cart.');
        }
      }

      setError('');
      alert('Checkout successful!');
      setCartItems([]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>Your cart is empty. Start shopping!</div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-sm">
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
            <div className="text-lg font-semibold text-right">${item.cost * item.quantity}</div>
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
        onClick={handleCheckout}
        className="w-full bg-purple-600 text-white text-lg font-medium rounded-lg py-3 hover:bg-purple-700 mb-4 transition-colors disabled:opacity-50"
        disabled={cartItems.length === 0 || !agreed}
      >
        Checkout
      </button>
    </div>
  );
}