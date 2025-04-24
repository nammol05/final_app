'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const blankItem: InventoryItem = {
  id: '',
  itemname: '',
  cost: 0,
  quantity: 0,
  descrip: '',
  thumbnail: '',
  createdAt: '',
  updatedAt: '',
};

interface InventoryItem {
  id: string;
  itemname: string;
  cost: number;
  quantity: number;
  descrip: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3001/inventory');
    setItems(response.data);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3001/inventory/delete/${id}`);
    fetchItems();
  };

  const handleSave = async () => {
    if (editingItem) {
      if (editingItem.id) {
        await axios.patch(`http://localhost:3001/inventory/update/${editingItem.id}`, editingItem);
      } else {
        await axios.post('http://localhost:3001/inventory/create', editingItem);
      }
      setEditingItem(null);
      fetchItems();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingItem((prev) => prev && { ...prev, [name]: value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Inventory Management</h1>

      <table className="w-full table-auto border-collapse shadow-md mb-8">
        <thead className="bg-purple-100 text-purple-800">
          <tr>
            <th className="p-3 border">Item Name</th>
            <th className="p-3 border">Cost</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-black">
              <td className="p-3 border font-medium">{item.itemname}</td>
              <td className="p-3 border">${item.cost}</td>
              <td className="p-3 border">{item.quantity}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-black rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setEditingItem(blankItem)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          + Add New Item
        </button>
        {editingItem && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-black rounded hover:bg-green-700"
          >
            Save
          </button>
        )}
      </div>

      {editingItem && (
        <div className="border p-6 rounded-lg shadow-md bg-black-500">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {editingItem?.id ? 'Edit Item' : 'Add New Item'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="itemname"
              value={editingItem?.itemname || ''}
              onChange={handleChange}
              placeholder="Item Name"
              className="p-2 border rounded"
            />
            <input
              name="cost"
              value={editingItem?.cost || ''}
              onChange={handleChange}
              type="number"
              placeholder="Cost"
              className="p-2 border rounded"
            />
            <input
              name="quantity"
              value={editingItem?.quantity || ''}
              onChange={handleChange}
              type="number"
              placeholder="Quantity"
              className="p-2 border rounded"
            />
            <input
              name="thumbnail"
              value={editingItem?.thumbnail || ''}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className="p-2 border rounded"
            />
            <textarea
              name="descrip"
              value={editingItem?.descrip || ''}
              onChange={handleChange}
              placeholder="Description"
              className="col-span-1 md:col-span-2 p-2 border rounded"
              rows={3}
            />
          </div>
          {/* The Save button remains inside the editing form */}
        </div>
      )}
    </div>
  );
}