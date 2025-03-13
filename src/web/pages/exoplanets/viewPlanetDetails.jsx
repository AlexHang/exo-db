import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { fetchExoplanetById } from '../../utils/api';

// This function gets called at build time and generates static paths
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

// This function gets called at build time and server-side render time
export async function getStaticProps({ params }) {
  try {
    const exoplanet = await fetchExoplanetById(params.id);
    return {
      props: { exoplanet },
      revalidate: 60 // Regenerate page every 60 seconds if requested
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default function ExoplanetDetails({ exoplanet }) {
  const router = useRouter();

  // If fallback is true and the page is still generating
  if (router.isFallback) {
    return <div className="container py-8 text-center">Loading exoplanet details...</div>;
  }

  return (
    <>
      <Head>
        <title>{exoplanet.name} | Exoplanet Explorer</title>
        <meta name="description" content={`Learn about ${exoplanet.name}, an exoplanet ${exoplanet.distance} light-years from Earth`} />
      </Head>
      <div className="container py-8">
        <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
          <Link href="/" className="inline-block px-4 py-2 mb-6 text-white bg-blue-500 rounded hover:bg-blue-600">
            &larr; Back to Home
          </Link>
          
          <h1 className="mb-4 text-3xl font-bold">{exoplanet.name}</h1>
          
          {exoplanet.imageUrl && (
            <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
              <Image 
                src={exoplanet.imageUrl} 
                alt={exoplanet.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h2 className="text-sm font-semibold text-gray-500">Distance from Earth</h2>
              <p className="text-lg">{exoplanet.distance} light-years</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h2 className="text-sm font-semibold text-gray-500">Discovery Year</h2>
              <p className="text-lg">{exoplanet.discoveryYear}</p>
            </div>
          </div>
          
          {exoplanet.description && (
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">Description</h2>
              <p className="text-gray-700">{exoplanet.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}