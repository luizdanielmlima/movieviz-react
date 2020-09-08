import * as actionTypes from './actionTypes';
import { updatedObject } from './utility';
import axios from 'axios';

const apiKey = '891a2d7d763b8e20d78ae746c8986811';

export const fetchMovieStart = () => {
  return {
    type: actionTypes.FETCH_MOVIES_START,
  };
};

export const fetchMoviesFailed = () => {
  return {
    type: actionTypes.FETCH_MOVIES_FAILED,
  };
};

export const fetchMoviesSuccess = (movies) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    movies: movies,
  };
};

export const fetchMovies = () => {
  const genre = '12';
  const sortBy = 'revenue.desc';
  const year = 2019;
  // set query values
  let genreQuery;
  if (genre === 'all') {
    genreQuery = ''; // all genres was selected
  } else {
    genreQuery = `with_genres=${genre}`;
  }

  const yearOnlyString = year.substring(0, 4);
  const yearFromQuery = `primary_release_date.gte=${yearOnlyString}-01-01`;
  const yearToQuery = `primary_release_date.lte=${yearOnlyString}-12-30`;

  const sortByQuery = `sort_by=${sortBy}`;

  return (dispatch) => {
    dispatch(fetchMovieStart());
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`,
      )
      .then((response) => {
        console.log(response.data);
        dispatch(fetchMoviesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMoviesFailed());
      });
  };
};
