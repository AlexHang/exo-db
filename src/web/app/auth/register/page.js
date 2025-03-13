'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../components/AuthForm';
import { register } from '../lib/auth';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email, password, name) => {
    setLoading(true);
    setError(null);
    
    try {
      await register(email, password, name);
      router.push('/auth/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. This email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <AuthForm 
        onSubmit={handleSubmit} 
        isSubmitting={loading}
        submitLabel="Sign Up"
        showNameField={true}
      />
      
      <div className="mt-4 text-center">
        <p>Already have an account? <Link href="/auth/login" className="text-indigo-600 hover:underline">Log in</Link></p>
      </div>
    </div>
  );
}