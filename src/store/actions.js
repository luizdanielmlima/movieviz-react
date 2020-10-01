import * as actionTypes from './actionTypes';

export const updateWatchlist = (movieData) => {
  return {
    type: actionTypes.UPDATE_WATCHLIST,
    movie: movieData,
  };
};

export const loadWatchlistFromLS = () => {
  return {
    type: actionTypes.LOAD_WATCHLIST_FROM_LSTORAGE,
  };
};

export const updateSearchParam = (paramKey, paramValue) => {
  return {
    type: actionTypes.UPDATE_SEARCH_PARAM,
    paramKey: paramKey,
    paramValue: paramValue,
  };
};
