import { useState, useEffect } from 'react';
import ExoplanetList from '../components/ExoplanetList';
import SearchBar from '../components/SearchBar';
import Head from 'next/head';
import { fetchExoplanets } from '../utils/api';

export default function Home() {
  const [exoplanets, setExoplanets] = useState([]);
  const [filteredExoplanets, setFilteredExoplanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExoplanets = async () => {
      try {
        const data = await fetchExoplanets();
        setExoplanets(data);
        setFilteredExoplanets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch exoplanets');
        setLoading(false);
      }
    };

    getExoplanets();
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

  if (loading) return <div className="container py-8 text-center">Loading exoplanets...</div>;
  if (error) return <div className="container py-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <Head>
        <title>Exoplanet Explorer</title>
        <meta name="description" content="Explore exoplanets from across the universe" />
      </Head>
      <div className="container py-8">
        <h1 className="mb-8 text-4xl font-bold text-center">Exoplanet Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        <ExoplanetList exoplanets={filteredExoplanets} />
      </div>
    </>
  );
}