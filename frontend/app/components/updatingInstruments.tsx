"use client";

import { useState } from "react";

type updatingInstruments = {
  onAdd: (instrument: {
    name: string;
    price: number;
    image_url: string;
    like: number;
    is_new: boolean;
  }) => void;
};

export default function updatingInstruments({ onAdd }: updatingInstruments) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [like, setLike] = useState("");
  const [isNew, setIsNew] = useState(false);

  const handleSubmit = () => {
    if (!name) return;

    onAdd({
      name,
      price: parseInt(price) || 0,
      image_url: imageUrl,
      like: parseInt(like) || 0,
      is_new: isNew,
    });

    // Reset everything to the begining
    setName("");
    setPrice("");
    setImageUrl("");
    setLike("");
    setIsNew(false);
  };

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        className="border-2 border-gray-100 rounded-lg p-2 w-[250px]"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add instrument name"
      />

      <input
        className="border-2 border-gray-200 rounded-lg p-2 w-[250px]"
        type="number"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        
        placeholder="Add a price"
      />

      <input
        className="border-2 border-gray-300 rounded-lg p-2 w-[250px]"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl}
        placeholder="Add an image URL"
      />

      <input
        className="border-2 border-gray-400 rounded-lg p-2 w-[250px] "
        type="number"
        value={like}
        onChange={(e) => setLike(e.target.value)}
        placeholder="Add likes"
      />

      <label className="underline flex items-center gap-2 ">
        <input
          type="checkbox"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
        />
        New Arrival?
      </label>


      <button
        onClick={handleSubmit}
        className="border-2 border-gray-500 rounded-lg p-2 bg-blue-500 text-white w-[250px] hover:bg-green-500"
      >
        Add Instrument
      </button>
    </div>
  );
}
