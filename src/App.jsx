import React, { useState, useEffect, } from 'react';
import Search from './Components/Search.jsx';
import './App.css';
import Spinner from './Components/Spinner.jsx';
import MovieCard from './Components/MovieCard.jsx';
import { useDebounce } from 'react-use'
import Appwrite from './appwrite.jsx';
import { getTopSearches } from './appwrite.jsx';
import { Routes, Route, Link } from 'react-router-dom';
import Watchlist from './Components/Watchlist.jsx';

function HomePage() {
  //application sates hooks
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [topSearches, setTopSearches] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchItem), 500, [searchItem]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  }

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/genre/movie/list?language=en-US`, API_OPTIONS);
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  const fetchMovies = async (query = '', genreId = '') => {
    setLoading(true);
    setErrorMessage('');
    try {
      let endpoint;
      if (query) {
        endpoint = `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`;
      } else if (genreId) {
        endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`;
      } else {
        endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      }
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!data.response === false) {
        setErrorMessage('Failed to fetch movies: ' + data.Error);
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
      if (query && data.results.length > 0) {
        await Appwrite(query, data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTopSearches();
      setTopSearches(movies);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    }
  };

  useEffect(() => {
    if (selectedGenre) {
      fetchMovies('', selectedGenre);
    } else {
      fetchMovies(debouncedSearchTerm);
    }
  }, [searchItem, selectedGenre]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <header className='flex flex-col items-center gap-4'>
        <div className='image-container'></div>
        <div className='text-container backdrop-blur-sm bg-white/10 dark:bg-black/10 p-6 rounded-xl'>
          <h1 className='text-3xl  text-center text-amber-500'>Movie Shop</h1>
        </div>
        <nav className="flex gap-4 mt-2">
          <Link to="/" className="text-amber-400 hover:text-amber-200 font-semibold">Home</Link>
          <Link to="/watchlist" className="text-amber-400 hover:text-amber-200 font-semibold">Watchlist</Link>
        </nav>
        <Search searchItem={searchItem} setSearchTerm={setSearchTerm} />
        <div className="mt-4">
          <select
            className="p-2 rounded border border-gray-300 bg-white text-black"
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </header>
      {topSearches.length > 0 && (
        <section className='top-searches mx-0 my-auto p-4'>
          <h2 className='text-xl md:text-2xl mb-4 font-bold text-center text-white'>Top Searches</h2>
          <ul className='flex flex-wrap gap-2 justify-center md:gap-4 lg:flex-nowrap'>
            {topSearches.map((movie, index) => (
              <li key={movie.id} className='flex flex-row gap-1 items-center'>
                <span className='text-2xl md:text-4xl font-extrabold text-amber-600'>{index + 1}</span>
                <img
                  className='w-full max-w-[100px] md:max-w-[150px] h-auto rounded-lg shadow-lg'
                  src={movie.poster_url ? `https://image.tmdb.org/t/p/w500${movie.poster_url}` : './src/assets/posters.png'}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className='all-movies'>
        <h2 className='mt-5 p-5 text-3xl font-bold text-center text-white'>All Movies</h2>
        {isloading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className='text-red-500 text-center'>Error {errorMessage}</p>
        ) : (
          <div className="movie-cards-container">
            <ul className="bg-white-100 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6 max-w-7xl mx-auto px-4 pb-10">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}

function App() {
  return (
    <main className="App">
      <div className="blur-background">
        <div className="blur-overlay"></div>
      </div>
      <div className='container relative z-10'>
        <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;