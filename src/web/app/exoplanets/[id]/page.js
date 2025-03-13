'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getExoplanetById } from '../lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function ExoplanetDetails({ params }) {
    const { id } = params;
    const router = useRouter();
    const [exoplanet, setExoplanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExoplanet = async () => {
            try {
                const data = await getExoplanetById(id);
                setExoplanet(data);
            } catch (err) {
                setError('Failed to load exoplanet details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExoplanet();
    }, [id]);

    if (loading) return <div className="text-center py-8"><div className="spinner"></div>Loading exoplanet details...</div>;
    if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
    if (!exoplanet) return <div className="text-center py-8">Exoplanet not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.push('/')}
                className="btn btn-secondary mb-6"
            >
                ← Back to Home
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {exoplanet.imageUrl && (
                    <div className="h-64 sm:h-80 overflow-hidden">
                        <img
                            fill={true}
                            src={exoplanet.imageUrl}
                            alt={exoplanet.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-planet.jpg';
                            }}
                        />
                    </div>
                )}

                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{exoplanet.name}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded">
                            <h2 className="text-sm font-semibold text-gray-500">Distance from Earth</h2>
                            <p className="text-xl">{exoplanet.distance} light-years</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded">
                            <h2 className="text-sm font-semibold text-gray-500">Discovery Year</h2>
                            <p className="text-xl">{exoplanet.discoveryYear}</p>
                        </div>
                    </div>

                    {exoplanet.description && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">About {exoplanet.name}</h2>
                            <p className="text-gray-700 whitespace-pre-line">{exoplanet.description}</p>
                        </div>
                    )}

                    <div className="mt-6 text-sm text-gray-500">
                        Added on {new Date(exoplanet.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}