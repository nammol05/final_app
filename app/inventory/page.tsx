'use client';

import React, { useState } from 'react';
import InventoryForm from '../components/InventoryForm';
import InventoryTable from '../components/InventoryTable';

interface Item {
  name: string;
  quantity: number;
  id: string;
  imageUrl: string | null;
  description: string;
}

const InventoryPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({
    name: '',
    quantity: 0,
    id: '',
    imageUrl: null,
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrUpdate = (item: Item) => {
    if (isEditing) {
      setItems(items.map(existingItem => existingItem.id === item.id ? item : existingItem));
    } else {
      setItems([...items, item]);
    }
    setForm({ name: '', quantity: 0, id: '', imageUrl: null, description: '' });
    setIsEditing(false);
  };

  const handleEdit = (item: Item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-[#1c1c24] min-h-screen p-10 text-white font-sans">
      <div className="max-w-4xl mx-auto bg-[#13131a] p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8">Inventory Management</h1>
        
        <InventoryForm
          form={form}
          setForm={setForm}
          handleAddOrUpdate={handleAddOrUpdate}
          isEditing={isEditing}
        />

        <InventoryTable items={items} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default InventoryPage;