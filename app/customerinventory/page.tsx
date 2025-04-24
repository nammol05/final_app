'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Item {
  id: number;
  itemname: string;
  quantity: number;
  imageUrl: string | null;
  descrip: string;
}

interface ProductCardProps {
  item: Item;
  onBuy: (item: Item) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onBuy }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-[#1c1c24] text-white p-6 rounded-xl shadow-md text-center">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.itemname}
            width={200}
            height={200}
            className="mx-auto rounded-md"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-700 rounded-md text-gray-400 italic mx-auto">
            No Image
          </div>
        )}
        <h2 className="text-xl font-bold mt-4">{item.itemname}</h2>
        <p className="text-sm text-gray-400 mb-2">Quantity: {item.quantity}</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 mt-2 px-6 py-2 rounded-lg transition"
        >
          View Details
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-[#1e1e2f] p-6 rounded-xl max-w-md w-full text-white relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.itemname}
                width={300}
                height={300}
                className="mx-auto rounded-md mb-4"
              />
            )}
            <h3 className="text-2xl font-bold mb-2">{item.itemname}</h3>
            <p className="text-sm text-gray-300 mb-4">{item.descrip}</p>
            <p className="text-sm text-gray-400 mb-4">In Stock: {item.quantity}</p>
            <button
              onClick={() => {
                onBuy(item);
                setShowModal(false);
              }}
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-6 rounded-lg"
            >
              Buy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const CustomerInventoryPage: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsClient(true);
    fetchItems();
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
        body: JSON.stringify({
          inventory_id: item.id,
          quantity: 1,
        }),
      });
  
      if (response.ok) {
        alert(`${item.itemname} added to cart!`);
      } else {
        alert('Failed to add item to cart.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding item to cart.');
    }
  };

  if (!isClient) return null;

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
            <ProductCard key={item.id} item={item} onBuy={handleBuy} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInventoryPage;