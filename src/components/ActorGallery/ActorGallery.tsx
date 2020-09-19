import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React from 'react';

import './ActorGallery.css';

function ActorGallery(props: any) {
  const profileImgSize = 'w185';
  const baseURL = 'https://image.tmdb.org/t/p/';

  let gallery: any;
  gallery = <p>Loading gallery...</p>;

  if (props.images) {
    gallery = props.images.map((image: any, index: number) => {
      return (
        <div key={index}>
          <IonGrid>
            <IonCol size="6" size-sm="4" size-md="2">
              <IonImg
                src={`${baseURL}${profileImgSize}${image.file_path}`}
              ></IonImg>
            </IonCol>
          </IonGrid>
        </div>
      );
    });
  }
  return (
    <IonGrid>
      <IonRow>{gallery}</IonRow>
    </IonGrid>
  );
}

export default ActorGallery;
