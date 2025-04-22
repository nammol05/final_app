import React from 'react';

interface Item {
  name: string;
  quantity: number;
  id: string;
  imageUrl: string | null;
}

interface InventoryTableProps {
  items: Item[];
  handleEdit: (item: Item) => void;
  handleDelete: (id: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-white">
        <thead>
          <tr className="bg-[#1c1c24] text-purple-400">
            <th className="p-4">Item Name</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Item ID</th>
            <th className="p-4">Image</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-400">No items available.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">{item.id}</td>
                <td className="p-4">
                  {item.imageUrl && <img src={item.imageUrl} alt="Item" className="w-16 h-16 object-cover rounded-lg" />}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
