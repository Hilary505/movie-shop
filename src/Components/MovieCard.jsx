import React from 'react';
import { useState } from 'react';



const truncateText =(text, limit) => {
  const words = text.split(' ');
  return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;

}

const MovieCard = ({ movie: {title, overview, poster_path, vote_average, original_language, release_date} }) => {
  const [showFullOverview, setShowFullOverview] = useState(false);

const toggleOverview = () => {
  setShowFullOverview(!showFullOverview);
}
  return (
    <div className="movie-card bg-dark-80 text-amber-50 dark:bg-gray-400 rounded-2xl shadow-inner shadow-light-100/10 overflow-hidden transition-transform duration-300 hover:scale-105 max-w-xs w-72 min-h-[420px] flex flex-col p-4 mx-auto">
      <img className='w-full h-60 object-cover mb-3 rounded-lg'
        src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : './src/assets/posters.png' }
        alt={title}
        />
        <h3 className='text-lg font-bold mb-2 text-center'>{title}</h3>
        <p className='mb-2 text-sm text-amber-100 text-center'>
          {showFullOverview ? overview : truncateText(overview, 20)}
          {overview.length > 20 && (
            <span className="text-blue-200 cursor-pointer ml-1" onClick={toggleOverview}>
              {showFullOverview ? 'Show Less' : 'Show More'}
            </span>
          )}
        </p>
      <div className="movie-overview flex gap-2 items-center align-middle justify-center mt-auto">
        <div className='rating flex gap-2 items-center align-middle'>
            <img src="./src/assets/icon.png" alt="star icon" className='w-4 h-4 m-0' />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>
        <span>.</span>
        <p className='lang'> {original_language}</p>
        <span>.</span>
        <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;