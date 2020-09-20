import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React from 'react';

import './ActorContent.css';
import MovieList from '../MovieList/MovieList';
import configuration from '../../shared/configuration';

function ActorContent(props: any) {
  const profileSizes = configuration.images.profile_sizes;
  const baseURL = configuration.images.base_url;

  let { actor, showMode, images, filmography } = props;
  let actorContent: any;
  actorContent = <p>Loading actor´s info</p>;

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
                  src={`${baseURL}${profileSizes[1]}${actor.profile_path}`}
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
              ></IonImg>
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
