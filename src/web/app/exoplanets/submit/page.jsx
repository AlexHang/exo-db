'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createExoplanet } from '../lib/api';
import ExoplanetForm from '../components/ExoplanetForm';
import { useAuth } from '../context/AuthContext';

export default function SubmitExoplanet() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      const newExoplanet = await createExoplanet(formData);
      router.push(`/exoplanets/${newExoplanet._id}`);
    } catch (err) {
      console.error('Failed to submit exoplanet:', err);
      setError('Failed to submit exoplanet. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-6">You need to be logged in to submit an exoplanet.</p>
        <button
          onClick={() => router.push('/auth/login')}
          className="btn btn-primary"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Submit a New Exoplanet</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <ExoplanetForm onSubmit={handleSubmit} isSubmitting={submitting} />
    </div>
  );
}