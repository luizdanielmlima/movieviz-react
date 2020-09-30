import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IonList,
  IonItem,
  IonThumbnail,
  IonImg,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { eye } from 'ionicons/icons';

import * as actions from '../../store/actions';
import './MovieList.css';

const MovieList = (props: any) => {
  // console.log(props);
  const history = useHistory();
  const baseURL = 'https://image.tmdb.org/t/p/';
  const posterSizes = [
    'w92',
    'w154',
    'w185',
    'w342',
    'w500',
    'w780',
    'original',
  ];

  const getMovieRatingPct = (movie: any) => {
    return movie.vote_average * 10 + '%';
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
    history.push('/movies/' + movieID);
  };

  const getPoster = (movie: any) => {
    if (!movie.poster_path || movie.poster_path === '') {
      return `assets/images/placeholder.png`;
    } else {
      return `${baseURL}${posterSizes[2]}${movie.poster_path}`;
    }
  };

  const shortenTitle = (text: string) => {
    const maxTextLength = 48;
    if (text.length > maxTextLength) {
      const croppedText = text.substring(0, maxTextLength);
      const shortenedText = `${croppedText} ...`;
      return shortenedText;
    } else {
      return text;
    }
  };

  const setFavClasses = (movie: any) => {
    const movieIndex = props.watchList.indexOf(movie);
    if (movieIndex !== -1) {
      return 'fav-btn-bg fav-btn-bg-on';
    } else {
      return 'fav-btn-bg';
    }
  };

  let movies: any;
  movies = <p>No movies loaded</p>;
  if (props.movies) {
    movies = props.movies.map((movie: any, index: number) => {
      return (
        <div key={movie.id} className="movies">
          <IonList className="movie-list" lines="none">
            <IonItem className="ion-no-padding movie-info-area">
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

              {/* <IonButton
                onClick={() => props.onUpdateWatchlist(movie)}
              >
                Watchlist
              </IonButton> */}
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
          </IonList>
        </div>
      );
    });
  }

  return <div className="container">{movies}</div>;
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieList);
