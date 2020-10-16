import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonChip,
  IonIcon,
  IonImg,
  IonLabel,
  IonModal,
} from '@ionic/react';
import { connect } from 'react-redux';

import { closeOutline } from 'ionicons/icons';

import configuration from '../../shared/configuration';
import ActorsList from '../ActorsList/ActorsList';
import './MovieContent.css';
import * as actions from '../../store/actions';
import { Image, Trailer  } from "../../shared/models";

const MovieContent = (props: any) => {
  // console.log('MovieContent|props:', props);
  const [showModal, setShowModal] = useState(false);
  const [trailerID, setTrailerID] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [imageClass, setImageClass] = useState('');

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const history = useHistory();

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const posterSizes = configuration.images.poster_sizes;
  const backdropSizes = configuration.images.backdrop_sizes;
  const baseURL = configuration.images.secure_base_url;
  const youtubeURL = 'https://www.youtube.com/embed/';
  const youtubeParams = '?showinfo=0&modestbranding=1';

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

  const getMovieRatingPct = (movie: any) => {
    return movie.vote_average * 10 + '%';
  };

  const setTrailerIDAndOpenModal = (id: string) => {
    setTrailerID(id);
    setShowModal(true);
  };

  const setImagePathAndOpenModal = (
    filepath: string,
    imageRatio: number,
  ) => {
    setImagePath(filepath);

    // Must check screen ratio and image ratio to add classes accordingly:
    // imageRatio is 1.77 for gallery images and 0.66 for posters
    if (imageRatio >= windowWidth / windowHeight) {
      setImageClass('fit-width');
    } else {
      setImageClass('fit-height');
    }

    setShowModal(true);
  };

  const changeGenreAndNavToMovies = (genreID: string) => {
    props.onSearchParamChanged('genre', genreID);
    history.push('/movies/');
  };

  let {
    movie,
    showMode,
    cast,
    crew,
    images,
    posters,
    trailers,
  } = props;
  const movieGenres = movie.genres;
  let movieContent: any;
  movieContent = <p>Loading movie´s info</p>;

  let crewList;
  crewList = <p>Loading crew...</p>;
  if (crew) {
    crewList = crew.slice(0, 12).map((person: any, index: number) => {
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
        <IonChip
          className="chip"
          key={genre.id}
          outline
          onClick={() =>
            changeGenreAndNavToMovies(genre.id.toString())
          }
        >
          <IonLabel>{genre.name}</IonLabel>
        </IonChip>
      );
    });
  }

  let moviePosters;
  if (posters) {
    moviePosters = posters.map((image: Image, index: number) => {
      // TODO: all gallery stuff could use this as a component!
      return (
        <picture key={index} className="picture portrait-ratio">
          <IonImg
            className="ion-no-padding picture-content"
            src={`${baseURL}${posterSizes[3]}${image.file_path}`}
            alt="movie poster"
            onClick={() =>
              setImagePathAndOpenModal(
                `${baseURL}${posterSizes[5]}${image.file_path}`,
                0.66,
              )
            }
          ></IonImg>
        </picture>
      );
    });
  }

  let movieGallery;
  if (images) {
    movieGallery = images.map((image: Image, index: number) => {
      // TODO: all gallery stuff could use this as a component!
      return (
        <picture key={index} className="picture landscape-ratio">
          <IonImg
            className="ion-no-padding picture-content"
            src={`${baseURL}${backdropSizes[1]}${image.file_path}`}
            alt="movie pic"
            onClick={() =>
              setImagePathAndOpenModal(
                `${baseURL}${backdropSizes[2]}${image.file_path}`,
                1.77,
              )
            }
          ></IonImg>
        </picture>
      );
    });
  }

  let movieTrailers;
  if (trailers) {
    movieTrailers = trailers.map((trailer: Trailer, index: number) => {
      // TODO: all gallery stuff could use this as a component!
      return (
        <picture key={index} className="picture landscape-ratio">
          <IonImg
            className="ion-no-padding picture-content"
            src={trailer.thumb}
            alt="trailer thumbnail"
            onClick={() => setTrailerIDAndOpenModal(trailer.key)}
          ></IonImg>
        </picture>
      );
    });
  }

  if (movie) {
    if (showMode === 'main') {
      movieContent = (
        <div
          className="main-container"
          style={{
            background: `linear-gradient(rgba(146, 213, 230, 0.9), rgba(128, 187, 202, 0.9)) no-repeat center top / cover,
            url("${baseURL}${posterSizes[5]}${movie.poster_path}") no-repeat center center / cover`,
          }}
        >
          <div className="main-wrapper">
            <div className="main-info">
              <picture className="thumb-container">
                <IonImg
                  className="thumb"
                  src={`${baseURL}${posterSizes[3]}${movie.poster_path}`}
                  alt="movie poster"
                />
              </picture>
              <div className="movie-stats">
                <div className="movie-stat-item">
                  <p className="movie-stat-title">
                    Rating {movie.vote_average}
                  </p>
                  <div className="rating rating-centered">
                    <span
                      style={{ width: getMovieRatingPct(movie) }}
                    ></span>
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
        </div>
      );
    } else if (showMode === 'cast') {
      movieContent = (
        <div className="actorlist-container">
          <ActorsList actors={cast} isMovieCast={true}></ActorsList>
        </div>
      );
    } else if (showMode === 'posters') {
      movieContent = (
        <div className="gallery">
          {moviePosters}
          <IonModal
            isOpen={showModal}
            cssClass="modal"
            onDidDismiss={() => setShowModal(false)}
          >
            <div className="img-container">
              <img
                src={imagePath}
                alt="movie poster"
                className={imageClass}
              />
            </div>
            <div className="close-btn">
              <IonIcon
                icon={closeOutline}
                onClick={() => setShowModal(false)}
              ></IonIcon>
            </div>
          </IonModal>
        </div>
      );
    } else if (showMode === 'gallery') {
      movieContent = (
        <div className="gallery">
          {movieGallery}
          <IonModal
            isOpen={showModal}
            cssClass="modal"
            onDidDismiss={() => setShowModal(false)}
          >
            <div className="img-container">
              <img
                src={imagePath}
                alt="movie poster"
                className={imageClass}
              />
            </div>
            <div className="close-btn">
              <IonIcon
                icon={closeOutline}
                onClick={() => setShowModal(false)}
              ></IonIcon>
            </div>
          </IonModal>
        </div>
      );
    } else if (showMode === 'trailers') {
      movieContent = (
        <div className="gallery">
          {movieTrailers}
          <IonModal
            isOpen={showModal}
            cssClass="modal"
            onDidDismiss={() => setShowModal(false)}
          >
            <iframe
              title="youtubePlayer"
              id="ytplayer"
              width="100%"
              height="315"
              src={`${youtubeURL}${trailerID}${youtubeParams}`}
            ></iframe>
            <div className="close-btn">
              <IonIcon
                icon={closeOutline}
                onClick={() => setShowModal(false)}
              ></IonIcon>
            </div>
          </IonModal>
        </div>
      );
    }
  }

  return <div>{movieContent}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    searchParams: state.searchParams,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSearchParamChanged: (paramKey: string, paramValue: string) =>
      dispatch(actions.updateSearchParam(paramKey, paramValue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieContent);
