import * as actionTypes from './actionTypes';
import { updatedObject } from './utility';

const initialState = {
  movies: [],
  actors: [],
  currentMovie: null,
  currentActor: null,
  movieFavs: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_START:
      return updatedObject(state, { loading: true });
    case actionTypes.FETCH_MOVIES_SUCCESS:
      const updatedMovies = [...state.movies];
      return updatedObject(state, { movies: updatedMovies });
    case actionTypes.FETCH_MOVIES_FAILED:
      return updatedObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
