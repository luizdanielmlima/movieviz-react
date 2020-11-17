import * as actionTypes from './actionTypes';
import { updatedObject } from './utility';

const initialState = {
  watchList: [],
  isLoading: true,
  searchParams: {
    genre: 'all',
    sortBy: 'revenue.desc',
    year: '2020-01-01',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH_PARAM:
      const newParams = { ...state.searchParams };
      newParams[action.paramKey] = action.paramValue;
      // console.log('newParams: ', newParams);
      return updatedObject(state, { searchParams: newParams });

    case actionTypes.UPDATE_WATCHLIST:
      let updatedWatchlist;
      const founItemsNum = [...state.watchList].filter(
        (item) => action.movie.id === item.id,
      ).length;
      // movie IS on the list, so REMOVE it
      if (founItemsNum > 0) {
        updatedWatchlist = state.watchList.filter(
          (movie) => movie.id !== action.movie.id,
        );
      } else {
        updatedWatchlist = state.watchList.concat(action.movie);
      }
      localStorage.setItem(
        'watchList',
        JSON.stringify(updatedWatchlist),
      );
      return updatedObject(state, { watchList: updatedWatchlist });

    case actionTypes.LOAD_WATCHLIST_FROM_LSTORAGE:
      if (localStorage.getItem('watchList') != null) {
        const savedWatchlist = JSON.parse(
          localStorage.getItem('watchList'),
        );
        // console.log('savedWatchlist: ', savedWatchlist);
        return updatedObject(state, { watchList: savedWatchlist });
      } else {
        localStorage.setItem('watchList', JSON.stringify([]));
        return null;
      }
    case actionTypes.SAVE_WATCHLIST:
      // console.log('reducer|SAVE_WATCHLIST:', action.watchList);
      return updatedObject(state, { watchList: action.watchList });
    default:
      return state;
  }
};

export default reducer;
