import React, { useState } from 'react';
import {
  IonIcon,
  IonImg,
  IonModal,
} from '@ionic/react';
import { connect } from 'react-redux';

import { closeOutline } from 'ionicons/icons';

import ActorsList from '../ActorsList/ActorsList';
import './MovieContent.css';
import * as actions from '../../store/actions';
import { Trailer  } from "../../shared/models";
import MovieInfo from '../MovieInfo/MovieInfo';
import MovieGallery from '../MovieGallery/MovieGallery';
import MoviePosters from '../MoviePosters/MoviePosters';

const MovieContent = (props: any) => {
  // console.log('MovieContent|props:', props);
  const [showModal, setShowModal] = useState(false);
  const [trailerID, setTrailerID] = useState('');

  const youtubeURL = 'https://www.youtube.com/embed/';
  const youtubeParams = '?showinfo=0&modestbranding=1';

  const setTrailerIDAndOpenModal = (id: string) => {
    setTrailerID(id);
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
        <MoviePosters posters={posters}/>
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
