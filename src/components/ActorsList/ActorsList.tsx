import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonList, IonItem, IonThumbnail } from '@ionic/react';

import './ActorsList.css';
import configuration from '../../shared/configuration';

const ActorsList = (props: any) => {
  const history = useHistory();
  const profileSizes = configuration.images.profile_sizes;
  const baseURL = configuration.images.base_url;

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

  const navToActor = (actorID: string) => {
    history.push('/actors/' + actorID);
  };

  let actors: any;
  actors = <p>...</p>;
  if (props.actors && props.imgParams) {
    actors = props.actors.map((actor: any, index: number) => {
      return (
        <div key={actor.id}>
          <IonList className="actors-list" lines="none">
            <IonItem onClick={() => navToActor(actor.id)}>
              <IonThumbnail slot="start">
                <img
                  className="actor-thumb"
                  src={`${baseURL}${profileSizes[1]}${actor.profile_path}`}
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
