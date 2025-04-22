"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Instrument {
  name: string;
  price: number;
  like: number;
  is_new: boolean;
}

const initialInstruments: Instrument[] = [
  {
    name: "Fender Guitar",
    price: 300,
    like: 20,
    is_new: true,
  },
  {
    name: "Yamaha Keyboard",
    price: 500,
    like: 34,
    is_new: false,
  },
  {
    name: "Pearl Drum Set",
    price: 800,
    like: 15,
    is_new: true,
  },
];

const MusicItem = ({ name, price, like, is_new, onDelete }: Instrument & { onDelete?: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm mx-auto relative"
    >
      <div className="text-lg font-bold mb-1">{name}</div>
      <div className="text-gray-600">${price}</div>
      <div className="text-sm text-pink-500">❤️ {like} likes</div>
      {is_new && <div className="text-xs text-green-600 font-semibold">New Arrival</div>}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      )}
    </motion.div>
  );
};

const MusicStore = () => {
  const [instruments, setInstruments] = useState<Instrument[]>(initialInstruments);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLike, setNewLike] = useState("");
  const [newIsNew, setNewIsNew] = useState(false);

  const addInstrument = () => {
    if (!newName || !newPrice || !newLike) return;
    const newInstrument: Instrument = {
      name: newName,
      price: Number(newPrice),
      like: Number(newLike),
      is_new: newIsNew,
    };
    setInstruments([...instruments, newInstrument]);
    setNewName("");
    setNewPrice("");
    setNewLike("");
    setNewIsNew(false);
  };

  const deleteInstrument = (index: number) => {
    const updated = [...instruments];
    updated.splice(index, 1);
    setInstruments(updated);
  };

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">🎵 Music Store 🎵</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {instruments.map((item, index) => (
          <MusicItem key={index} {...item} onDelete={() => deleteInstrument(index)} />
        ))}
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Instrument</h2>
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type="text"
          placeholder="Instrument Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type="number"
          placeholder="Likes"
          value={newLike}
          onChange={(e) => setNewLike(e.target.value)}
        />
        <label className="m-2">
          <input
            type="checkbox"
            checked={newIsNew}
            onChange={(e) => setNewIsNew(e.target.checked)}
            className="mr-2"
          />
          Is New?
        </label>
        <button
          onClick={addInstrument}
          className="border-2 border-gray-300 rounded-lg p-2 m-2 bg-blue-500 text-white"
        >
          Add Instrument
        </button>
      </div>
    </div>
  );
};

export default MusicStore;
