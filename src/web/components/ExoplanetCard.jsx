import Link from 'next/link';

export default function ExoplanetCard({ exoplanet }) {
  return (
    <Link href={`/exoplanets/${exoplanet._id}`} className="block h-full">
      <div className="h-full p-6 transition-shadow bg-white rounded-lg shadow hover:shadow-md">
        <h2 className="mb-3 text-xl font-bold">{exoplanet.name}</h2>
        <div className="mb-4 text-sm text-gray-600">
          <p>Distance: {exoplanet.distance} light-years</p>
          <p>Discovered: {exoplanet.discoveryYear}</p>
        </div>
        <div className="flex justify-end">
          <span className="text-sm text-blue-500">View details &rarr;</span>
        </div>
      </div>
    </Link>
  )
};