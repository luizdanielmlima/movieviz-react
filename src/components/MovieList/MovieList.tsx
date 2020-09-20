import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  IonList,
  IonItem,
  IonThumbnail,
  IonNote,
  IonImg,
} from '@ionic/react';

import './MovieList.css';

const MovieList = (props: any) => {
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

  let movies: any;
  movies = <p>No movies loaded</p>;
  if (props.movies) {
    movies = props.movies.map((movie: any, index: number) => {
      return (
        <div key={movie.id} className="movies">
          <IonList className="movie-list" lines="none">
            <IonItem
              className="ion-no-padding movie-info-area"
              onClick={() => navToMovie(movie.id)}
            >
              <IonThumbnail slot="start" className="movie-thumbnail">
                <IonImg
                  className="movie-img"
                  src={`${baseURL}${posterSizes[2]}${movie.poster_path}`}
                  alt="movie cover"
                ></IonImg>
              </IonThumbnail>
              <div className="movie-info">
                {props.isRanking ? (
                  <p className="movie-info--number">{index + 1}</p>
                ) : null}
                <p className="movie-info---title">{movie.title}</p>
                <IonNote>{getYear(movie.release_date)}</IonNote>
                <div className="rating">
                  <span
                    style={{ width: getMovieRatingPct(movie) }}
                  ></span>
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

export default MovieList;
