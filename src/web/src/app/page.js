"use client";
import NavBar from '@/app/lib/components/navBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home({ params }) {
  const router = useRouter();
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCards = planets.filter(planet => {
    console.log(planet)
    return planet?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  }
  );

  useEffect(() => {
    fetch('http://localhost:5000/api/exoplanets')
      .then(response => response.json())
      .then(data => setPlanets(data));
  }
    , []);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <NavBar />
      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
        />
      </div>
      {/* Cards Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCards.map(card => (
          <div 
            key={card.id} 
            className="border rounded shadow p-4 bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => router.push(`/view/${card._id}`)}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-100">{card.name}</h2>
            <img
              src={card.imageUrl}
              className="w-full h-[300px] object-cover mb-2" />
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="font-semibold text-gray-300">distance</div>
                <div className="text-gray-400">{card.distance}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-300">discovered</div>
                <div className="text-gray-400">{card.discoveryYear}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
