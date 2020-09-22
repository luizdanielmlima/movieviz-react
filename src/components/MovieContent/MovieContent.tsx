import {
  IonChip,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
} from '@ionic/react';
import React from 'react';

import configuration from '../../shared/configuration';
import ActorsList from '../ActorsList/ActorsList';
import './MovieContent.css';

function MovieContent(props: any) {
  console.log(props);
  const posterSizes = configuration.images.poster_sizes;
  const baseURL = configuration.images.base_url;

  const getMovieDuration = (totalMin: number) => {
    const hours = totalMin / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (rminutes === 0) {
      return rhours + ' h';
    } else {
      return rhours + ' h  ' + rminutes + ' min';
    }
  };

  let { movie, showMode, cast, crew } = props;
  const movieGenres = movie.genres;
  let movieContent: any;

  movieContent = <p>Loading movie´s info</p>;

  let crewList;
  crewList = <p>Loading crew...</p>;
  if (crew) {
    crewList = crew.map((person: any, index: number) => {
      return (
        <div key={index} className="crew-item">
          <p>{person.name}</p>
          <p>......</p>
          <p>{person.job}</p>
        </div>
      );
    });
  }

  let genres;
  if (movieGenres) {
    genres = movieGenres.map((genre: any) => {
      return (
        <IonChip key={genre.id} outline color="dark">
          <IonLabel color="dark">{genre.name}</IonLabel>
        </IonChip>
      );
    });
  }

  if (movie) {
    if (showMode === 'main') {
      movieContent = (
        <div className="main-segment">
          <IonGrid className="ion-no-padding">
            <IonRow>
              {/* MAIN COVER   */}
              <IonCol
                className="ion-no-padding"
                size="7"
                size-sm="7"
                size-lg="4"
              >
                <div className="thumb-container">
                  <img
                    className="thumb"
                    src={`${baseURL}${posterSizes[1]}${movie.poster_path}`}
                    alt="movie poster"
                  />
                </div>
              </IonCol>

              {/* MAIN STATS   */}
              <IonCol
                className="movie-stats ion-no-padding"
                size="5"
                size-sm="5"
                size-lg="2"
              >
                <div className="movie-stat-item">
                  <p className="movie-stat-title">
                    Rating {movie.vote_average}
                  </p>
                  <div className="rating">
                    <span></span>
                  </div>
                </div>
                <div className="movie-stat-item">
                  <p className="movie-stat-title">Runtime</p>
                  <h6 className="movie-stat-value">
                    {getMovieDuration(movie.runtime)}
                  </h6>
                </div>
                <div className="movie-stat-item">
                  <p className="movie-stat-title">Budget</p>
                  <h6 className="movie-stat-value">
                    $ {movie.budget}
                  </h6>
                </div>
                <div className="movie-stat-item">
                  <p className="movie-stat-title">Revenue</p>
                  <h6 className="movie-stat-value">
                    $ {movie.revenue}
                  </h6>
                </div>
              </IonCol>

              {/* MAIN INFO - Genres, Overview and Crew Members   */}
              <IonCol
                className="ion-no-padding"
                size="12"
                size-sm="12"
                size-lg="6"
              >
                <IonGrid className="main-info-area ion-no-padding">
                  <IonRow>
                    <IonCol size="12">{genres}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <h4>Overview</h4>
                      <p>{movie.overview}</p>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <h4>Featured Crew</h4>
                      {crewList}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      );
    } else if (showMode === 'cast') {
      movieContent = (
        <ActorsList actors={cast} isMovieCast={true}></ActorsList>
      );
    } else if (showMode === 'gallery') {
      movieContent = (
        <div>
          <p>Show GALLERY Content here</p>
        </div>
      );
    } else if (showMode === 'trailers') {
      movieContent = (
        <div>
          <p>Show TRAILERS Content here</p>
        </div>
      );
    }
  }

  return <div>{movieContent}</div>;
}

export default MovieContent;
