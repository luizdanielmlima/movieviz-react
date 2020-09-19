import React from 'react';
import './MovieList.css';
import {
  IonList,
  IonItem,
  IonThumbnail,
  IonNote,
} from '@ionic/react';

// interface MovieProps {
//   budget?: number;
//   genre_ids?: any[];
//   id: string;
//   media_type?: string;
//   original_language?: string;
//   overview?: string;
//   popularity?: number;
//   backdrop_path?: string;
//   poster_path?: string;
//   release_date?: string;
//   revenue?: number;
//   runtime?: string;
//   title: string;
//   vote_average?: number;
//   vote_count?: number;
// }

const MovieList = (props: any) => {
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

  let movies: any;
  movies = <p>No movies loaded</p>;
  if (props.movies) {
    movies = props.movies.map((movie: any, index: number) => {
      return (
        <div key={movie.id}>
          <IonList className="movie-list" lines="none">
            <IonItem className="ion-no-padding movie-info-area">
              <IonThumbnail slot="start" className="movie-thumbnail">
                <img
                  className="movie-img"
                  src={`${baseURL}${posterSizes[2]}${movie.poster_path}`}
                  alt="movie cover"
                />
              </IonThumbnail>
              <div className="movie-info">
                <p className="movie-info--number">{index + 1}</p>
                <p className="movie-info---title">{movie.title}</p>
                <IonNote>{getYear(movie.release_date)}</IonNote>
                <div className="movie-info--rating">
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

  return <div>{movies}</div>;
};

export default MovieList;
