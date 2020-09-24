import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonList, IonItem, IonThumbnail } from '@ionic/react';

import './ActorsList.css';
import configuration from '../../shared/configuration';

const ActorsList = (props: any) => {
  const history = useHistory();
  const profileSizes = configuration.images.profile_sizes;
  console.log('profileSizes: ', profileSizes);
  const baseURL = configuration.images.base_url;

  const getKnownMovies = (actor: any) => {
    if (actor.known_for) {
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
    } else {
      return null;
    }
  };

  const getKnownMoviesOnly = (actor: any) => {
    return actor.known_for.filter(
      (item: any) => item.media_type === 'movie',
    );
  };

  // When actors list is presented in the Actors Page, it shows the "known for" below the actors´s name...
  // ... but when its shown in the movie detail page it must show the character name
  const getSubText = (actor: any) => {
    if (props.isMovieCast) {
      return <p>{actor.character}</p>;
    } else {
      return getKnownMovies(actor);
    }
  };

  const getProfileImg = (actor: any) => {
    if (!actor.profile_path || actor.profile_path === '') {
      return `assets/images/placeholder.png`;
    } else {
      return `${baseURL}${profileSizes[1]}${actor.profile_path}`;
    }
  };

  const navToActor = (actorID: string) => {
    history.push('/actors/' + actorID);
  };

  let actors: any;
  actors = <p>...</p>;
  if (props.actors) {
    actors = props.actors.map((actor: any, index: number) => {
      return (
        <div key={actor.id}>
          <IonList className="actors-list" lines="none">
            <IonItem onClick={() => navToActor(actor.id)}>
              <IonThumbnail slot="start">
                <img
                  className="actor-thumb"
                  src={getProfileImg(actor)}
                  alt="actor"
                />
              </IonThumbnail>
              <div>
                <p className="actor-title">{actor.name}</p>
                {getSubText(actor)}
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
