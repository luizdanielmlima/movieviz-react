import { IonChip, IonImg, IonLabel } from '@ionic/react';
import React from 'react';

import configuration from '../../shared/configuration';
import ActorsList from '../ActorsList/ActorsList';
import './MovieContent.css';

const MovieContent = (props: any) => {
  // console.log('MovieContent|props:', props);
  const posterSizes = configuration.images.poster_sizes;
  const backdropSizes = configuration.images.backdrop_sizes;
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

  let { movie, showMode, cast, crew, images, posters } = props;
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

  let moviePosters;
  if (posters) {
    moviePosters = posters.map((image: any, index: number) => {
      return (
        <div key={index}>
          <IonImg
            className="ion-no-padding"
            src={`${baseURL}${posterSizes[3]}${image.file_path}`}
            alt="movie poster"
          ></IonImg>
        </div>
      );
    });
  }

  let movieGallery;
  if (images) {
    movieGallery = images.map((image: any, index: number) => {
      return (
        <div key={index}>
          <IonImg
            className="ion-no-padding"
            src={`${baseURL}${backdropSizes[3]}${image.file_path}`}
            alt="movie photo"
          ></IonImg>
        </div>
      );
    });
  }

  if (movie) {
    if (showMode === 'main') {
      movieContent = (
        <div className="wrapper">
          <div className="main-info">
            <div className="thumb-container">
              <img
                className="thumb"
                src={`${baseURL}${posterSizes[3]}${movie.poster_path}`}
                alt="movie poster"
              />
            </div>
            <div className="movie-stats">
              <div className="movie-stat-item">
                <p className="movie-stat-title">
                  Rating {movie.vote_average}
                </p>
                <div className="rating rating-centered">
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
                <h6 className="movie-stat-value">$ {movie.budget}</h6>
              </div>
              <div className="movie-stat-item">
                <p className="movie-stat-title">Revenue</p>
                <h6 className="movie-stat-value">
                  $ {movie.revenue}
                </h6>
              </div>
            </div>
          </div>
          <div className="secondary-info">
            <div className="genres">{genres}</div>
            <div className="overview">
              <h4>Overview</h4>
              <p>{movie.overview}</p>
            </div>
            <div className="crew">
              <h4>Featured Crew</h4>
              {crewList}
            </div>
          </div>
        </div>
      );
    } else if (showMode === 'cast') {
      movieContent = (
        <ActorsList actors={cast} isMovieCast={true}></ActorsList>
      );
    } else if (showMode === 'posters') {
      movieContent = <div className="gallery">{moviePosters}</div>;
    } else if (showMode === 'gallery') {
      movieContent = <div className="gallery">{movieGallery}</div>;
    } else if (showMode === 'trailers') {
      movieContent = (
        <div>
          <p>Show TRAILERS here</p>
        </div>
      );
    }
  }

  return <div>{movieContent}</div>;
};

export default MovieContent;
