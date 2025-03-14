import React from 'react';
import Image from 'next/image';
import NavBar from '@/app/lib/components/navBar';
import Link from 'next/link';
import { apiService } from '@/app/services/api';

export default async function PlanetView({ params }) {
  const planet = await apiService.getPlanetById(params.id);

  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link
        href="../"
        className="mb-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-block"
      >
        ← Back to Home
      </Link>
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
    </div>
    </>
  );
}
