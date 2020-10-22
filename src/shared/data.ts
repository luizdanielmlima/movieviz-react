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