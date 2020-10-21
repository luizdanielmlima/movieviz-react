import { IonIcon, IonImg, IonModal } from '@ionic/react';
import React, { useState } from 'react';

import { closeOutline } from 'ionicons/icons';

import { Trailer } from '../../shared/models';

interface myProps {
    trailers: Trailer[];
}

function MovieTrailers(props:myProps) {
    const [showModal, setShowModal] = useState(false);
    const [trailerID, setTrailerID] = useState('');
  
    const youtubeURL = 'https://www.youtube.com/embed/';
    const youtubeParams = '?showinfo=0&modestbranding=1';

    const setTrailerIDAndOpenModal = (id: string) => {
        setTrailerID(id);
        setShowModal(true);
      };

    let { trailers } = props;

    let movieTrailers;
    if (trailers) {
      movieTrailers = trailers.map((trailer: Trailer, index: number) => {
        return (
          <picture key={index} className="picture landscape-ratio">
            <IonImg
              className="ion-no-padding picture-content"
              src={trailer.thumb}
              alt="trailer thumbnail"
              onClick={() => setTrailerIDAndOpenModal(trailer.key)}
            ></IonImg>
          </picture>
        );
      });
    }

    return (
        <div className="gallery">
          {movieTrailers}
          <IonModal
            isOpen={showModal}
            cssClass="modal"
            onDidDismiss={() => setShowModal(false)}
          >
            <iframe
              title="youtubePlayer"
              id="ytplayer"
              width="100%"
              height="315"
              src={`${youtubeURL}${trailerID}${youtubeParams}`}
            ></iframe>
            <div className="close-btn">
              <IonIcon
                icon={closeOutline}
                onClick={() => setShowModal(false)}
              ></IonIcon>
            </div>
          </IonModal>
        </div>
    )
}

export default MovieTrailers;
