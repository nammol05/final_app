'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Item {
  id: number;
  itemname: string;
  quantity: number;
  imageUrl: string | null;
  descrip: string;
}

const CustomerInventoryPage: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Item[]>([]);
  const [isClient, setIsClient] = useState(false); // Flag to check client-side

  // Authenticate and load cart
  useEffect(() => {
    if (typeof window === 'undefined') return; // Don't run on server

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsClient(true); // We are safely in the client

    fetchItems();

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, [router]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/inventory');
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.statusText}`);
      }

      const data = await response.json();
      setItems(data);
    } catch (error: any) {
      console.error('Error fetching items:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (item: Item) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:3001/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item.id, quantity: 1 }),
      });
  
      if (response.ok) {
        // Update cart in localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = existingCart.findIndex((i: Item) => i.id === item.id);
  
        if (existingItemIndex > -1) {
          existingCart[existingItemIndex].quantity += 1;
        } else {
          existingCart.push({
            id: item.id,
            itemname: item.itemname,
            quantity: 1,
            cost: 10, // Set a default or get it from item if available
            descrip: item.descrip,
            thumbnail: item.imageUrl,
          });
        }
  
        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert(`${item.itemname} added to cart successfully!`);
      } else {
        console.error('Failed to add item to cart:', response.status);
        alert(`Failed to add ${item.itemname} to cart.`);
      }
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      alert('Error adding item to cart. Please try again.');
    }
  };

  if (!isClient) return null; // Prevent rendering until we know we're on the client

  return (
    <div className="bg-[#1c1c24] min-h-screen p-10 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Customer Shop</h1>
          <Link href="/cart">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
              Go to Cart
            </button>
          </Link>
        </div>

        {loading && <p>Loading items...</p>}
        {error && <p>Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#13131a] p-6 rounded-2xl shadow-md flex flex-col items-center">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.itemname} className="w-32 h-32 object-cover rounded-md mb-4" />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-700 rounded-md mb-4 text-gray-400 text-sm italic">
                  No Image
                </div>
              )}
              <h2 className="text-xl font-semibold">{item.itemname}</h2>
              <p className="text-sm text-gray-400 mb-2">{item.descrip}</p>
              <p className="text-sm text-gray-300 mb-4">In Stock: {item.quantity}</p>
              <button
                onClick={() => handleBuy(item)}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-6 rounded-lg mt-auto"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInventoryPage;