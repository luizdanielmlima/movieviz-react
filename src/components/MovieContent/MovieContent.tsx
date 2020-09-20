import {
  IonChip,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
} from '@ionic/react';
import React from 'react';

import configuration from '../../shared/configuration';
import './MovieContent.css';

function MovieContent(props: any) {
  const posterSizes = configuration.images.poster_sizes;
  //   const posterSizes = [
  //     'w92',
  //     'w154',
  //     'w185',
  //     'w342',
  //     'w500',
  //     'w780',
  //     'original',
  //   ];
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

  let { movie, showMode } = props;
  let movieContent: any;
  movieContent = <p>Loading movie´s info</p>;

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
                  {/* <IonRow className="ion-no-padding" *ngIf="genres">
              <IonCol size="12">
                <IonChip
                  outline
                  color="dark"
                  *ngFor="let genre of movie.genres"
                  (click)="setGenreAndNavToMovies(genre)"
                >
                  <IonLabel color="dark"
                    >{ getGenreName(genre.id) }</IonLabel
                  >
                </IonChip>
              </IonCol>
            </IonRow> */}
                  <IonRow>
                    <IonCol size="12">
                      <h4>Overview</h4>
                      <p>{movie.overview}</p>
                    </IonCol>
                  </IonRow>
                  {/* <IonRow>
              <IonCol size="12">
                <h4>Featured Crew</h4>
                <div className="crew-item" *ngFor="let crewMember of movieCrew">
                  <p>{ crewMember.name }</p>
                  <p>......</p>
                  <p>{ crewMember.job }</p>
                </div>
              </IonCol>
            </IonRow> */}
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      );
    } else if (showMode === 'cast') {
      movieContent = (
        <div>
          <p>Show CAST Content here</p>
        </div>
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
