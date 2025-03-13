import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold">
          Exoplanet Explorer
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/exoplanets/new" className="hover:text-blue-300">
                    Add Exoplanet
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut()} className="hover:text-blue-300">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => signIn()} className="hover:text-blue-300">
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}