import * as actionTypes from './actionTypes';
import { updatedObject } from './utility';

const initialState = {
  watchList: [],
  watch: 'test',
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_WATCHLIST:
      let updatedWatchlist;
      const movieIndex = state.watchList.indexOf(action.movie);

      // movie is not on list, so ADD it
      if (movieIndex === -1) {
        updatedWatchlist = state.watchList.concat(action.movie);
      }

      // movie IS on the list, so REMOVE it
      else {
        updatedWatchlist = state.watchList.filter(
          (movie) => movie.id !== action.movie.id,
        );
      }
      // console.log('updatedWatchlist: ', updatedWatchlist);
      return updatedObject(state, { watchList: updatedWatchlist });
    default:
      return state;
  }
};

export default reducer;
