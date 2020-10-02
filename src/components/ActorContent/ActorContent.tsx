import React, { useState, useEffect } from 'react';
import { IonIcon, IonImg, IonModal } from '@ionic/react';
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
  const baseURL = configuration.images.secure_base_url;

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

  let actorImages;
  if (images) {
    actorImages = props.images.map((image: any, index: number) => {
      return (
        <picture key={index} className="picture portrait-ratio">
          <IonImg
            className="ion-no-padding picture-content"
            src={`${baseURL}${profileSizes[2]}${image.file_path}`}
            alt="actor pic"
            onClick={() =>
              setImagePathAndOpenModal(
                `${baseURL}${profileSizes[3]}${image.file_path}`,
                1.77,
              )
            }
          ></IonImg>
        </picture>
      );
    });
  }

  // HTML for Actor Main Info
  if (actor) {
    if (showMode === 'main') {
      actorContent = (
        <div
          className="main-container"
          style={{
            background: `linear-gradient(rgba(155, 197, 61, 0.9), rgba(136, 173, 54, 0.9)) no-repeat center top / cover`,
          }}
        >
          <div className="main-wrapper">
            <div className="main-info">
              <picture className="thumb-container">
                <IonImg
                  className="thumb"
                  src={`${baseURL}${profileSizes[2]}${actor.profile_path}`}
                  alt="actor profile pic"
                />
              </picture>
              <div className="actor-stats">
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
              </div>
            </div>
            <div className="secondary-info">
              <h4>Biography</h4>
              <p className="biography-text">{actor.biography}</p>
            </div>
          </div>
        </div>
      );
    } else if (showMode === 'credits') {
      /* ACTOR´s FILMOGRAPHY */
      actorContent = (
        <MovieList movies={filmography} isRanking={false} />
      );
    } else if (showMode === 'gallery') {
      actorContent = (
        <div className="gallery">
          {actorImages}
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
    }
  }
  return <div>{actorContent}</div>;
}

export default ActorContent;
