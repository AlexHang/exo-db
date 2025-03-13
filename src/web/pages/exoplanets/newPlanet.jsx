import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ExoplanetForm from '../../components/ExoplanetForm';
import { createExoplanet } from '../../utils/api';
import { useSession } from 'next-auth/react';

export default function NewExoplanet() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      await createExoplanet(formData);
      router.push('/');
    } catch (err) {
      setError('Failed to create exoplanet. Please try again.');
    }
  };

  // Redirect if not authenticated
  if (!session) {
    return (
      <div className="container py-8 text-center">
        <p className="mb-4 text-xl">You must be logged in to add new exoplanets.</p>
        <button 
          onClick={() => signIn()}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Add New Exoplanet | Exoplanet Explorer</title>
        <meta name="description" content="Submit a new exoplanet to our database" />
      </Head>
      <div className="container py-8">
        <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center">Add New Exoplanet</h1>
          {error && <div className="p-4 mb-4 text-center text-red-700 bg-red-100 rounded">{error}</div>}
          <ExoplanetForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}