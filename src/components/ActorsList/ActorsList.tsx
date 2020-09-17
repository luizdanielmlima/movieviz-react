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
              <div className="actor-text-items">
                <p>{actor.name}</p>
                <div>
                  <p className="light-text">Known for:</p>
                </div>
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
