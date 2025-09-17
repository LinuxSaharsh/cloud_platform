import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Console() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full flex flex-col gap-8 items-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Cloud Platform Console</h2>
        <div className="w-full flex flex-col gap-6">
          <button
            className="w-full px-6 py-4 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition"
            onClick={() => navigate('/computing')}
          >
            1. Computing Service
          </button>
          <button
            className="w-full px-6 py-4 rounded-lg bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition"
            onClick={() => navigate('/storage')}
          >
            2. Storage Service
          </button>
        </div>
      </div>
    </div>
  );
}
