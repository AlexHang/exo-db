import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="py-4 text-center bg-gray-800 text-white">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Exoplanet Explorer</p>
        </div>
      </footer>
    </div>
  );
}