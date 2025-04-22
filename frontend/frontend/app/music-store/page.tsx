"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MusicItem {
  id: number;
  music_name: string;
  price: number;
  is_new: boolean;
  brand: string;
}

export default function MusicStorePage() {
  const [music, setMusic] = useState<MusicItem[]>([]);
  const [newMusic, setNewMusic] = useState({
    music_name: "",
    price: 0,
    is_new: false,
    brand: "",
  });

  const fetchMusic = async () => {
    const res = await fetch("http://localhost:3000/music-store");
    const data = await res.json();
    setMusic(data);
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const addMusic = async () => {
    await fetch("http://localhost:3000/music-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMusic),
    });
    setNewMusic({ music_name: "", price: 0, is_new: false, brand: "" });
    fetchMusic();
  };

  const updateMusic = async (id: number) => {
    const item = music.find((m) => m.id === id);
    if (!item) return;
    const updatedName = prompt("Update music name", item.music_name);
    if (updatedName === null) return;
    await fetch(`http://localhost:3000/music-store/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, music_name: updatedName }),
    });
    fetchMusic();
  };

  const deleteMusic = async (id: number) => {
    await fetch(`http://localhost:3000/music-store/${id}`, {
      method: "DELETE",
    });
    fetchMusic();
  };

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">🎵 Music Store 🎵</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {music.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm mx-auto relative"
          >
            <div className="text-lg font-bold mb-1">{item.music_name}</div>
            <div className="text-gray-600">${item.price}</div>
            <div className="text-sm text-pink-500">{item.brand}</div>
            {item.is_new && (
              <div className="text-xs text-green-600 font-semibold">New Arrival</div>
            )}
            <button
              onClick={() => deleteMusic(item.id)}
              className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => updateMusic(item.id)}
              className="absolute bottom-2 right-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
            >
              Update
            </button>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Music</h2>
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type="text"
          placeholder="Music Name"
          value={newMusic.music_name}
          onChange={(e) => setNewMusic({ ...newMusic, music_name: e.target.value })}
        />
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type="number"
          placeholder="Price"
          value={newMusic.price}
          onChange={(e) => setNewMusic({ ...newMusic, price: +e.target.value })}
        />
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type="text"
          placeholder="Brand"
          value={newMusic.brand}
          onChange={(e) => setNewMusic({ ...newMusic, brand: e.target.value })}
        />
        <label className="m-2">
          <input
            type="checkbox"
            checked={newMusic.is_new}
            onChange={(e) => setNewMusic({ ...newMusic, is_new: e.target.checked })}
            className="mr-2"
          />
          Is New?
        </label>
        <button
          onClick={addMusic}
          className="border-2 border-gray-300 rounded-lg p-2 m-2 bg-blue-500 text-white"
        >
          Add Music
        </button>
      </div>
    </div>
  );
}
