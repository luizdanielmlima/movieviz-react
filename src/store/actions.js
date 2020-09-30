import * as actionTypes from './actionTypes';

export const updateWatchlist = (movieData) => {
  return {
    type: actionTypes.UPDATE_WATCHLIST,
    movie: movieData,
  };
};
