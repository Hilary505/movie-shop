import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard.jsx';
import { Link } from 'react-router-dom';

const getWatchlist = () => {
  return JSON.parse(localStorage.getItem('watchlist') || '[]');
};

const setWatchlist = (list) => {
  localStorage.setItem('watchlist', JSON.stringify(list));
};

const Watchlist = () => {
  const [watchlist, setWatchlistState] = useState([]);

  useEffect(() => {
    setWatchlistState(getWatchlist());
    // Listen for changes in localStorage from other tabs/components
    const onStorage = () => setWatchlistState(getWatchlist());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleRemove = (id) => {
    const updated = getWatchlist().filter((m) => m.id !== id);
    setWatchlist(updated);
    setWatchlistState(updated);
  };

  return (
    <div className="watchlist-page text-white p-8">
      <div className="mb-4 flex justify-start">
        <Link to="/" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">&larr; Back to Home</Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-center">Your watchlist is empty.</p>
      ) : (
        <div className="movie-cards-container">
          <ul className="bg-white-100 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6 max-w-7xl mx-auto px-4 pb-10">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onRemove={handleRemove} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Watchlist; 