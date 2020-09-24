import React, { useState, useEffect } from 'react';
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonModal,
  IonRow,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import './ActorContent.css';
import MovieList from '../MovieList/MovieList';
import configuration from '../../shared/configuration';

function ActorContent(props: any) {
  // console.log('MovieContent|props:', props);
  const [showModal, setShowModal] = useState(false);
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

  const profileSizes = configuration.images.profile_sizes;
  const baseURL = configuration.images.base_url;

  let { actor, showMode, images, filmography } = props;
  let actorContent: any;
  actorContent = <p>Loading actor´s info</p>;

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

  // HTML for Actor Main Info
  if (actor && images) {
    if (showMode === 'main') {
      actorContent = (
        <div className="main-segment">
          <IonGrid className="actor-main-area ion-no-padding">
            <IonRow>
              {/* ACTOR´s PHOTO */}
              <IonCol
                className="ion-no-padding"
                size="7"
                size-sm="7"
                size-md="3"
                offset-md="3"
              >
                <img
                  src={`${baseURL}${profileSizes[2]}${actor.profile_path}`}
                  alt="actor pic"
                />
              </IonCol>

              {/* ACTOR´s STATS */}
              <IonCol
                className="actor-stats"
                size="5"
                size-sm="5"
                size-md="3"
              >
                <div className="actor-stat-item">
                  <p>Popularity</p>
                  <h6>{actor.popularity}</h6>
                </div>
                <div className="actor-stat-item">
                  <p>Birthday</p>
                  <h6>{actor.birthday}</h6>
                </div>
                <div className="actor-stat-item">
                  <p>Place of Birth</p>
                  <h6>{actor.place_of_birth}</h6>
                </div>
              </IonCol>

              {/* ACTOR´s BIOGRAPHY */}
              <IonCol
                className="ion-no-padding"
                size="12"
                size-sm="12"
                size-md="8"
                offset-md="2"
              >
                <div className="biography">
                  <h4>Biography</h4>
                  <p className="biography-text">{actor.biography}</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      );
    } else if (showMode === 'credits') {
      /* ACTOR´s FILMOGRAPHY */
      actorContent = (
        <MovieList movies={filmography} isRanking={false} />
      );
    } else if (showMode === 'gallery') {
      /* ACTOR´s GALLERY */
      const allImages = props.images.map(
        (image: any, index: number) => {
          return (
            <div key={index}>
              <IonImg
                className="ion-no-padding"
                src={`${baseURL}${profileSizes[2]}${image.file_path}`}
                alt="actor pic"
                onClick={() =>
                  setImagePathAndOpenModal(
                    `${baseURL}${profileSizes[3]}${image.file_path}`,
                    1.77,
                  )
                }
              ></IonImg>
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
                <div className="close">
                  <IonIcon
                    icon={closeOutline}
                    onClick={() => setShowModal(false)}
                  ></IonIcon>
                </div>
              </IonModal>
            </div>
          );
        },
      );
      actorContent = <div className="gallery">{allImages}</div>;
    }
  }
  return <div>{actorContent}</div>;
}

export default ActorContent;
