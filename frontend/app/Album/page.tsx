"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AlbumAPI() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const limit = 10;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
        const data = await res.json();

        const start = (page - 1) * limit;
        const end = start + limit;

        setRecords(data.slice(start, end));
        setTotalPages(Math.ceil(data.length / limit));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching album data:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [page]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Something went wrong.</div>;

  return (
    <div className="min-h-screen bg-gray-800 py-10 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center text-white">
        Album Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {records.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 p-4 rounded-xl bg-white shadow-lg text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <Image
                className="rounded"
                src={item.thumbnailUrl}
                alt="Album Thumbnail"
                width={100}
                height={100}
              />
              <Image
                className="rounded"
                src={item.url}
                alt="Album Full"
                width={100}
                height={100}
              />
            </div>

            <div className="text-gray-800 text-sm mt-4 space-y-1">
              <p><span className="font-semibold">Album ID:</span> {item.albumId}</p>
              <p><span className="font-semibold">ID:</span> {item.id}</p>
              <p className="truncate"><span className="font-semibold">Title:</span> {item.title}</p>
            </div>

            <p className="mt-4 text-green-600 hover:text-green-800 font-semibold underline cursor-pointer" >
              Buy now
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded bg-blue-700 text-white ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
          }`}
        >
          Previous
        </button>

        <span className="text-white font-bold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded bg-blue-600 text-white ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          Next
        </button>
      </div>

      {/* Back Button */}
      <div className="text-center mt-8">
        <Link href="/music">
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800 hover:scale-105 transition">
            👈 Back to Musics
          </button>
        </Link>
      </div>
    </div>
  );
}
