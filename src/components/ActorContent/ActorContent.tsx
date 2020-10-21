import React, { useState, useEffect } from 'react';
import { IonIcon, IonImg, IonModal } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import './ActorContent.css';
import MovieList from '../MovieList/MovieList';
import configuration from '../../shared/configuration';
import { Image } from '../../shared/models';
import ActorInfo from '../ActorInfo/ActorInfo';

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
    actorImages = props.images.map((image: Image, index: number) => {
      return (
        // TODO: all gallery stuff could use this as a component!
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
        <ActorInfo actor={actor}/>
      )
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
