'use client';

import React, { useState } from 'react';

interface Item {
  id: string;
  name: string;
  quantity: number;
  imageUrl: string | null;
  description: string;
}

const mockItems: Item[] = Array.from({ length: 40 }).map((_, index) => ({
  id: `item-${index}`,
  name: `Item ${index + 1}`,
  quantity: Math.floor(Math.random() * 100),
  imageUrl: null,
  description: 'This is a sample description.',
}));

const CustomerInventoryPage: React.FC = () => {
  const [items] = useState<Item[]>(mockItems);

  const handleBuy = (item: Item) => {
    alert(`You bought ${item.name}!`);
  };

  return (
    <div className="bg-[#1c1c24] min-h-screen p-10 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Customer Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#13131a] p-6 rounded-2xl shadow-md flex flex-col items-center">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-4" />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-700 rounded-md mb-4 text-gray-400 text-sm italic">
                  No Image
                </div>
              )}
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
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
