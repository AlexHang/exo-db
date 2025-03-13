import '../globals.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/AuthForm';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Log In</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <AuthForm 
        onSubmit={handleSubmit} 
        isSubmitting={loading}
        submitLabel="Log In"
        showNameField={false}
      />
      
      <div className="mt-4 text-center">
        <p>No account? <Link href="/auth/register" className="text-indigo-600 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
}