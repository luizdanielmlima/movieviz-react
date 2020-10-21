import React, { useState, useEffect } from 'react';
import {
  IonIcon,
  IonImg,
  IonModal,
} from '@ionic/react';
import { connect } from 'react-redux';

import { closeOutline } from 'ionicons/icons';

import configuration from '../../shared/configuration';
import ActorsList from '../ActorsList/ActorsList';
import './MovieContent.css';
import * as actions from '../../store/actions';
import { Image, Trailer  } from "../../shared/models";
import MovieInfo from '../MovieInfo/MovieInfo';
import MovieGallery from '../MovieGallery/MovieGallery';

const MovieContent = (props: any) => {
  // console.log('MovieContent|props:', props);
  const [showModal, setShowModal] = useState(false);
  const [trailerID, setTrailerID] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [imageClass, setImageClass] = useState('');

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

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
  const baseURL = configuration.images.secure_base_url;
  const youtubeURL = 'https://www.youtube.com/embed/';
  const youtubeParams = '?showinfo=0&modestbranding=1';

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

  let {
    movie,
    showMode,
    cast,
    crew,
    images,
    posters,
    trailers,
  } = props;
  let movieContent: any;
  movieContent = <p>Loading movie´s info</p>;

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
        <MovieInfo movie={movie} crew={crew}/>
      )
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
        <MovieGallery images={images}/>
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
