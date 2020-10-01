import * as actionTypes from './actionTypes';
import { updatedObject } from './utility';

const initialState = {
  watchList: null,
  watch: 'test',
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_WATCHLIST:
      let updatedWatchlist;
      // const movieIndex = state.watchList.indexOf(action.movie);
      const founItemsNum = [...state.watchList].filter(
        (item) => action.movie.id === item.id,
      ).length;
      console.log('founItemsNum: ', founItemsNum);

      // movie IS on the list, so REMOVE it
      if (founItemsNum > 0) {
        updatedWatchlist = state.watchList.filter(
          (movie) => movie.id !== action.movie.id,
        );
      }
      // movie is not on list, so ADD it
      else {
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
        console.log('savedWatchlist: ', savedWatchlist);
        return updatedObject(state, { watchList: savedWatchlist });
      } else {
        localStorage.setItem('watchList', JSON.stringify([]));
        return null;
      }
    default:
      return state;
  }
};

export default reducer;
