import { IonImg } from '@ionic/react';
import React from 'react';

import { Cast } from '../../shared/models';
import configuration from '../../shared/configuration';
import './ActorInfo.css';

interface myProps {
    actor: Cast;
}

function ActorInfo(props: myProps) {
    const profileSizes = configuration.images.profile_sizes;
    const baseURL = configuration.images.secure_base_url;

    let { actor } = props;

    let actorContent;
    actorContent = <p></p>

    if (actor) {
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
    }
    

    return (
        <div>
            {actorContent}
        </div>
    )
}

export default ActorInfo;
