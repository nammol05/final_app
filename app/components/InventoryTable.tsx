import React from 'react';

interface InventoryTableProps {
  items: {
    name: string;
    quantity: number;
    id: string;
    imageUrl: string | null;
    description: string;
  }[];
  handleEdit: (item: { name: string; quantity: number; id: string; imageUrl: string | null; description: string }) => void;
  handleDelete: (id: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, handleEdit, handleDelete }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-800">
        <tr>
          <th scope="col" className="py-3 px-6">Image</th>
          <th scope="col" className="py-3 px-6">ID</th>
          <th scope="col" className="py-3 px-6">Name</th>
          <th scope="col" className="py-3 px-6">Quantity</th>
          <th scope="col" className="py-3 px-6">Description</th>
          <th scope="col" className="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="bg-[#1c1c24] border-b border-gray-700">
            <td className="py-3 px-6">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              ) : (
                <span className="text-gray-400 italic">No Image</span>
              )}
            </td>
            <td className="py-3 px-6">{item.id}</td>
            <td className="py-3 px-6">{item.name}</td>
            <td className="py-3 px-6">{item.quantity}</td>
            <td className="py-3 px-6">{item.description}</td>
            <td className="py-3 px-6">
              <button
                onClick={() => handleEdit(item)}
                className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;