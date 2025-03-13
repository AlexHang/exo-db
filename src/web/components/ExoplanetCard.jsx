import Image from 'next/image';
import Link from 'next/link';

export default function ExoplanetCard({ exoplanet }) {
    return (
        <Link href={`/exoplanets/${exoplanet._id}`}>
            <div className="card h-full flex flex-col bg-gray-800 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
                {exoplanet.imageUrl && (
                    <div className="h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                        <img
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

                <h2 className="text-xl font-bold mb-2">{exoplanet.name}</h2>

                <div className="mt-auto">
                    <div className="text-sm text-gray-400 mt-4">
                        <p><span className="font-medium">Distance:</span> {exoplanet.distance} light-years</p>
                        <p><span className="font-medium">Discovered:</span> {exoplanet.discoveryYear}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}