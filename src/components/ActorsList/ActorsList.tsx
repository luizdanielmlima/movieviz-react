import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonList, IonItem, IonThumbnail } from '@ionic/react';

import './ActorsList.css';
import configuration from '../../shared/configuration';
import { Cast } from '../../shared/models';

const ActorsList = (props: any) => {
  const history = useHistory();
  const profileSizes = configuration.images.profile_sizes;
  const baseURL = configuration.images.secure_base_url;

  const getKnownMovies = (actor: Cast) => {
    if (actor.known_for) {
      const knownMovies = actor.known_for.filter(
        (item: any) => item.media_type === 'movie',
        );
      let firstPart;
      let secondPart;

      knownMovies.length === 0 ? firstPart = null : firstPart = <span>{knownMovies[0].title}</span>;

      if (knownMovies.length > 1) {
        secondPart = (
          <span>
            <span className="light-text margin-horiz">and</span>
            <span>{knownMovies[1].title}</span>
          </span>
        );
      }

      return (
        <div>
          <p className="light-text">Known for:</p>
          <p className="credits">
            {firstPart}
            {secondPart}
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  // When actors list is presented in the Actors Page, it shows the "known for" below the actors´s name...
  // ... but when it is shown in the movie detail page it must show the character name
  const getSubText = (actor: Cast) => {
    if (props.isMovieCast) {
      return <p>{actor.character}</p>;
    } else {
      return getKnownMovies(actor);
    }
  };

  const getProfileImg = (actor: Cast) => {
    if (!actor.profile_path || actor.profile_path === '') {
      return `assets/images/placeholder.png`;
    } else {
      return `${baseURL}${profileSizes[1]}${actor.profile_path}`;
    }
  };

  const navToActor = (actorID: string) => {
    history.push('/main/actors/' + actorID);
  };

  let actors: any;
  actors = <p>...</p>;
  if (props.actors) {
    actors = props.actors.map((actor: any, index: number) => {
      return (
        <IonList key={`${actor.id}_${index}`} className="actors-list" lines="none">
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
