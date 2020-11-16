import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IonList,
  IonItem,
  IonThumbnail,
  IonImg,
  IonIcon,
} from '@ionic/react';
import { eye } from 'ionicons/icons';

import * as actions from '../../store/actions';
import configuration from '../../shared/configuration';
import { Movie  } from "../../shared/models";
import './MovieList.css';

const MovieList = (props: any) => {
  console.log('MovieList|props: ', props);
  const history = useHistory();
  const baseURL = 'https://image.tmdb.org/t/p/';
  const posterSizes = configuration.images.poster_sizes;

  const getMovieRatingPct = (movie: Movie) => {
    return movie.vote_average ? movie.vote_average * 10 + '%' : 0;
  };

  const getYear = (fullDate: string) => {
    if (fullDate) {
      const movieYear = fullDate.substring(0, 4);
      return movieYear;
    } else {
      return '';
    }
  };

  const navToMovie = (movieID: string) => {
    history.push('/main/movies/' + movieID);
  };

  const getPoster = (movie: Movie) => {
    if (!movie.poster_path || movie.poster_path === '') {
      return `assets/images/placeholder.png`;
    } else {
      return `${baseURL}${posterSizes[2]}${movie.poster_path}`;
    }
  };

  const shortenTitle = (text: string) => {
    const maxTextLength = window.innerWidth / 16;
    if (text.length > maxTextLength) {
      const croppedText = text.substring(0, maxTextLength);
      const shortenedText = `${croppedText} ...`;
      return shortenedText;
    } else {
      return text;
    }
  };

  const setFavClasses = (movie: Movie) => {
    if (props.watchList) {
      const foundItems = [...props.watchList].filter(
        (item: any) => movie.id === item.id,
      ).length;
      if (foundItems > 0) {
        return 'fav-btn-bg fav-btn-bg-on';
      } else {
        return 'fav-btn-bg';
      }
    } else {
      return 'fav-btn-bg';
    }
  };

  let movies: any;
  movies = <p>...</p>

  if (props.movies && props.movies.length === 0) {
    movies = (
      <div className="no-movies">
        <p>No movies found</p>
      </div>
    );
  }

  if (props.movies && props.movies.length > 0) {
    movies = props.movies.map((movie: any, index: number) => {
      return (
        // <div key={`${movie.id}_${index}`}>
        //   <p>{movie.title}</p>
        // </div>   
        <IonItem key={`${movie.id}_${index}`} className="ion-no-padding movie-info-area">
          <IonThumbnail
            slot="start"
            className="movie-thumbnail"
            onClick={() => navToMovie(movie.id)}
          >
            <IonImg
              className="movie-img"
              src={getPoster(movie)}
              alt="movie cover"
            ></IonImg>
          </IonThumbnail>
          <div className="movie-info">
            {props.isRanking ? (
              <p className="movie-info--number">{index + 1}</p>
            ) : null}
            <div className="movie-info--main">
              <p
                className="movie-info--title"
                onClick={() => navToMovie(movie.id)}
              >
                {shortenTitle(movie.title)}
              </p>
              <p
                className="movie-info--year"
                onClick={() => navToMovie(movie.id)}
              >
                {getYear(movie.release_date)}
              </p>
            </div>
            <div className="rating">
              <span
                style={{ width: getMovieRatingPct(movie) }}
              ></span>
            </div>
          </div>
          <div className="fav-btn">
            <div
              onClick={() => props.onUpdateWatchlist(movie)}
              className={setFavClasses(movie)}
            >
              <IonIcon class="fav-btn-icon" icon={eye}></IonIcon>
            </div>
          </div>
        </IonItem>
      );
    });
  }

  return (
    <IonList className="movie-list" lines="none">
      {movies}
    </IonList>
  )
};

const mapStateToProps = (state: any) => {
  return {
    watchList: state.watchList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUpdateWatchlist: (movie: any) =>
      dispatch(actions.updateWatchlist(movie)),
    loadWatchlistFromLS: () =>
      dispatch(actions.loadWatchlistFromLS()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieList);
