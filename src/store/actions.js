import * as actionTypes from './actionTypes';

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
  // TODO- use axios to get data and stuff
};
