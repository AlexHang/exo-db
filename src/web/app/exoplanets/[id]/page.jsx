'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getExoplanetById } from '../../../lib/api';

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
        <div className="min-h-screen bg-[#111827] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-gray-200 
                             bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 
                             transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Gallery
                </button>

                <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
                    {exoplanet.imageUrl && (
                        <div className="relative h-[50vh] md:h-[70vh] w-full">
                            <img
                                src={exoplanet.imageUrl}
                                alt={exoplanet.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder-planet.jpg';
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-32">
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                                        {exoplanet.name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                    Distance from Earth
                                </h2>
                                <p className="mt-2 text-2xl font-semibold text-blue-400">
                                    {exoplanet.distance} light-years
                                </p>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                    Discovery Year
                                </h2>
                                <p className="mt-2 text-2xl font-semibold text-blue-400">
                                    {exoplanet.discoveryYear}
                                </p>
                            </div>
                        </div>

                        {exoplanet.description && (
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                                    About {exoplanet.name}
                                </h2>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {exoplanet.description}
                                </p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-800">
                            <p className="text-sm text-gray-400">
                                Added to database on {new Date(exoplanet.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}