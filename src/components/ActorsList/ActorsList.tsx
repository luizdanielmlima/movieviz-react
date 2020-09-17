import React from 'react';
import { IonList, IonItem, IonThumbnail } from '@ionic/react';

import './ActorsList.css';

const ActorsList = (props: any) => {
  const getFullImgPath = (
    type: string,
    res: string,
    filePath: string,
  ) => {
    let fullImgPath: string;
    if (filePath === null) {
      fullImgPath = '../../../../assets/placeholder.png';
    } else {
      const baseURL = props.imgParams.baseURL;
      const size =
        res === 'hi' ? props.imgParams.hiRes : props.imgParams.lowRes;
      fullImgPath = `${baseURL}/${size}${filePath}`;
    }
    return fullImgPath;
  };

  const getKnownMovies = (actor: any) => {
    const knownMovies = actor.known_for.filter(
      (item: any) => item.media_type === 'movie',
    );
    if (knownMovies && knownMovies.length === 1) {
      return (
        <div>
          <p className="light-text">Known for:</p>
          <p>
            <span>{getKnownMoviesOnly(actor)[0].title}</span>
          </p>
        </div>
      );
    } else if (knownMovies && knownMovies.length > 1) {
      return (
        <div>
          <p className="light-text">Known for:</p>
          <p>
            <span>{getKnownMoviesOnly(actor)[0].title}</span>
            <span className="light-text ml-sm mr-sm">and</span>
            <span>{getKnownMoviesOnly(actor)[1].title}</span>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  const getKnownMoviesOnly = (actor: any) => {
    return actor.known_for.filter(
      (item: any) => item.media_type === 'movie',
    );
  };

  let actors: any;
  actors = <p>...</p>;
  if (props.actors && props.imgParams) {
    actors = props.actors.map((actor: any, index: number) => {
      return (
        <div key={actor.id}>
          <IonList className="actors-list" lines="none">
            <IonItem>
              <IonThumbnail slot="start">
                <img
                  className="actor-thumb"
                  src={getFullImgPath(
                    'profile',
                    'low',
                    actor.profile_path,
                  )}
                  alt="actor"
                />
              </IonThumbnail>
              <div>
                <p className="actor-title">{actor.name}</p>
                {getKnownMovies(actor)}
              </div>
            </IonItem>
          </IonList>
        </div>
      );
    });
  }

  return <div>{actors}</div>;
};

export default ActorsList;
