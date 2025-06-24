# Movie Search Web Application

A modern React-based web application for searching and exploring movies using the TMDB (The Movie Database) API. Built with Vite and React.

![Movie Search App Screenshot](./public/movie-shop.png)

## Features

- Search movies by title
- Display movie details including posters, ratings, and descriptions
- Responsive design for all devices
- Real-time search results
- Modern UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Hilary505/movie-shop.git
cd move-shop
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```plaintext
VITE_TMDB_API_KEY="your_tmdb_api_key_here"
VITE_TMDB_BASE_URL="https://api.themoviedb.org/3"
```

4. Start the development server:
```bash
npm run dev
```

## Environment Setup

The application requires specific environment variables to function:

- `VITE_TMDB_API_KEY`: Your TMDB API key (Get one from [TMDB website](https://www.themoviedb.org/documentation/api))
- `VITE_TMDB_BASE_URL`: The TMDB API base URL

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)


## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Appwrite](https://appwrite.io/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
