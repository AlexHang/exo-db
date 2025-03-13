'use client';

import { useState, useEffect } from 'react';
import { getExoplanets } from '../lib/api';
import ExoplanetCard from '../components/ExoplanetCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [exoplanets, setExoplanets] = useState([]);
  const [filteredExoplanets, setFilteredExoplanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExoplanets = async () => {
      try {
        const data = await getExoplanets();
        setExoplanets(data);
        setFilteredExoplanets(data);
      } catch (err) {
        setError('Failed to load exoplanets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExoplanets();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredExoplanets(exoplanets);
      return;
    }
    
    const filtered = exoplanets.filter(planet => 
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExoplanets(filtered);
  };

  if (loading) return <div className="text-center py-8"><div className="spinner"></div>Loading exoplanets...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Explore Exoplanets</h1>
      <SearchBar onSearch={handleSearch} />
      
      {filteredExoplanets.length === 0 ? (
        <div className="text-center py-8">No exoplanets found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredExoplanets.map(planet => (
            <ExoplanetCard key={planet._id} exoplanet={planet} />
          ))}
        </div>
      )}
    </div>
  );
}