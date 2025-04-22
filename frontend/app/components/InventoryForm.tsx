import React, { ChangeEvent } from 'react';

interface InventoryFormProps {
  form: {
    name: string;
    quantity: number;
    id: string;
    imageUrl: string | null;  // Store image URL
  };
  setForm: React.Dispatch<React.SetStateAction<{
    name: string;
    quantity: number;
    id: string;
    imageUrl: string | null;
  }>>;
  handleAddOrUpdate: (item: { name: string; quantity: number; id: string; imageUrl: string | null }) => void;
  isEditing: boolean;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ form, setForm, handleAddOrUpdate, isEditing }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(form); }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Item Name"
        className="bg-[#1c1c24] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        required
      />
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="bg-[#1c1c24] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        required
      />
      <input
        type="text"
        name="id"
        value={form.id}
        onChange={handleChange}
        placeholder="Item ID"
        className="bg-[#1c1c24] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        required
        disabled={isEditing}
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        className="bg-[#1c1c24] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      {form.imageUrl && (
        <div className="mt-4">
          <img src={form.imageUrl} alt="Item" className="w-32 h-32 object-cover rounded-lg" />
        </div>
      )}
      <button
        type="submit"
        className="md:col-span-3 bg-purple-600 hover:bg-purple-700 transition-colors text-white p-4 rounded-lg mt-2"
      >
        {isEditing ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default InventoryForm;
