import ExoplanetCard from './ExoplanetCard';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

export default function ExoplanetList({ exoplanets }) {
  const { data: session } = useSession();

  if (exoplanets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl mb-4">No exoplanets found</p>
        {session && (
          <Link href="/exoplanets/new" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Exoplanet
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discovered Exoplanets</h2>
        {session && (
          <Link href="/exoplanets/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Exoplanet
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exoplanets.map(exoplanet => (
          <ExoplanetCard key={exoplanet._id} exoplanet={exoplanet} />
        ))}
      </div>
    </div>
  );
}
