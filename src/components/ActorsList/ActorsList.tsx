import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonList, IonItem, IonThumbnail } from '@ionic/react';

import './ActorsList.css';
import configuration from '../../shared/configuration';

const ActorsList = (props: any) => {
  const history = useHistory();
  const profileSizes = configuration.images.profile_sizes;
  const baseURL = configuration.images.secure_base_url;

  const getKnownMovies = (actor: any) => {
    if (actor.known_for) {
      const knownMovies = actor.known_for.filter(
        (item: any) => item.media_type === 'movie',
      );
      if (knownMovies && knownMovies.length === 1) {
        return (
          <div>
            <p className="light-text">Known for:</p>
            <p className="credits">
              <span>{getKnownMoviesOnly(actor)[0].title}</span>
            </p>
          </div>
        );
      } else if (knownMovies && knownMovies.length > 1) {
        return (
          <div>
            <p className="light-text">Known for:</p>
            <p className="credits">
              <span>{getKnownMoviesOnly(actor)[0].title}</span>
              <span className="light-text margin-horiz">and</span>
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
  // ... but when it is shown in the movie detail page it must show the character name
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
        <IonList key={actor.id} className="actors-list" lines="none">
          <IonItem
            className="ion-no-padding actor-info-area"
            onClick={() => navToActor(actor.id)}
          >
            <IonThumbnail slot="start" className="ion-no-padding">
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
      );
    });
  }

  return <div>{actors}</div>;
};

export default ActorsList;
