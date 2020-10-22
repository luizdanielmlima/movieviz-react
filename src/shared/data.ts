import axios from 'axios';
import apiKey from './mdb-api-key.json';

export const fetchMovies = async (genre: string, sortBy: string, year: string,) => {
    let genreQuery: string;
    if (genre === 'all') {
      genreQuery = ''; // all genres was selected
    } else {
      genreQuery = `with_genres=${genre}`;
    }

    const yearOnlyString = year.substring(
      0,
      4,
    );
    const yearFromQuery = `primary_release_date.gte=${yearOnlyString}-01-01`;
    const yearToQuery = `primary_release_date.lte=${yearOnlyString}-12-30`;

    const sortByQuery = `sort_by=${sortBy}`;

    const movies = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey.key}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`,
      )
      .then((response) => {
        return response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
    return movies;
  }

  export const fetchActors = async () => {
    const actors = await axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey.key}&language=en-US`,
      )
      .then((response) => {
        const data = response.data.results;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    return actors;
  }

  // MOVIE DATA
  export const fetchMovie = async (movieID: string) => {
    // movie id to test: 448119
    const movieData = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey.key}&language=en-US`,
      )
      .then((response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return movieData;
  }

  export const fetchMovieCredits = async (movieID: string) => {
    const movieCredits = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey.key}&language=en-US`,
      )
      .then((response) => {
        const credits = response.data;
        return credits;
      })
      .catch((error) => {
        console.log(error);
      });
    return movieCredits;
  }

  export const fetchMovieGallery = async (movieID: string) => {
    const movieGallery = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=${apiKey.key}`,
      )
      .then((response) => {
        const gallery = response.data;
        return gallery;
      })
      .catch((error) => {
        console.log(error);
      });
    return movieGallery;
  }

  export const fetchMovieTrailers = async (movieID: string) => {
    const movieTrailers = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey.key}`,
      )
      .then((response) => {
        const trailers = response.data.results
          .filter((trailer: any) => trailer.type === 'Trailer')
          .map((trailer: any) => {
            return {
              ...trailer,
              thumb: `https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`,
            };
          });
        return trailers;
      })
      .catch((error) => {
        console.log(error);
      });
    return movieTrailers;
  }