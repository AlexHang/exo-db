'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavBar from '@/app/lib/components/navBar';
import { useRouter } from 'next/navigation';

export default function PlanetView({ params }) {
  const unwrappedParams = React.use(params);
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/exoplanets/${unwrappedParams.id}`);
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error('Error fetching planet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
        Loading...
      </div></>
    );
  }

  if (!planet) {
    return (
      <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
        Planet not found
      </div></>
    );
  }

  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button
        onClick={() => router.push('../')}
        className="mb-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        ← Back to Home
      </button>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="sticky top-8">
          <Image
            src={planet.imageUrl}
            alt={planet.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            priority />
        </div>
        <div className="p-4">
          <h1 className="text-5xl font-bold mb-8 text-white">
            {planet.name}
          </h1>
          <div className="mb-8 space-y-4">
            <p className="text-lg">
              <span className="text-gray-500 mr-2">Distance:</span>
              <span className="text-gray-300">{planet.distance} light years</span>
            </p>
            <p className="text-lg">
              <span className="text-gray-500 mr-2">Discovery Year:</span>
              <span className="text-gray-300">{planet.discoveryYear}</span>
            </p>
            <p className="text-lg">
              <span className="text-gray-500 mr-2">Created:</span>
              <span className="text-gray-300">
                {new Date(planet.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">About</h2>
            <p className="text-gray-300">{planet.description}</p>
          </div>
        </div>
      </div>
    </div></>
  );
}
