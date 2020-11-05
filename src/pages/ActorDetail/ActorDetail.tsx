import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonPage,
  IonSpinner,
  withIonLifeCycle,
} from '@ionic/react';

import {
  informationCircleOutline,
  filmOutline,
  imagesOutline,
} from 'ionicons/icons';

import { fetchActor, fetchActorGallery, fetchActorFilmography } from '../../shared/data';
import './ActorDetail.css';
import ActorContent from '../../components/ActorContent/ActorContent';
import { Cast } from '../../shared/models';

interface ActorProps {
  history: any;
  location: any;
  match: any;
}

interface ActorState {
  showMode?: string;
  actorId?: string;
  actor?: Cast;
  gallery?: any[];
  filmography?: any[];
  dataIsReady?: boolean;
}

class Actor extends Component<ActorProps, ActorState> {
  constructor(props: ActorProps) {
    super(props);
    this.state = {
      showMode: 'main',
      actor: {},
      gallery: [],
      filmography: [],
      dataIsReady: false,
    };
  }
  // To test: Morgan Freeman id : '192';

  ionViewWillEnter() {
    this.setState({ dataIsReady: false });
    this.setState({ showMode: 'main' });
  }

  ionViewDidEnter() {
    const actorID = this.props.match.params.id;
    this.setState({ actorId: actorID });
    fetchActor(actorID).then((actorData: any) => {
      // console.log('actorData: ', actorData);
      this.setState({ actor: actorData });

      // fetch actor gallery
      fetchActorGallery(actorID).then((images) => {
        this.setState({ gallery: images });

        // fetch cctor fimography (list of movies)
        fetchActorFilmography(actorID).then((list) => {
          this.setState({ filmography: list });
          this.setState({ dataIsReady: true });
        });
      });
    });
  }

  onSegmentChange = (type: any) => {
    this.setState({ showMode: type });
  };

  render() {
    let {
      actor,
      gallery,
      filmography,
      dataIsReady,
      showMode,
    } = this.state;

    let content;
    content = (
      <div className="spinner-wrapper">
        <IonSpinner name="dots" />
      </div>
    );

    if (dataIsReady && actor) {
      content = (
        <div className="content">
          <Route
            path={`/main/actors/${this.state.actorId}`}
            render={(props: any) => (
              <ActorContent
                {...props}
                actor={actor}
                images={gallery}
                filmography={filmography}
                showMode={this.state.showMode}
              />
            )}
            exact={true}
          />
        </div>
      );
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/main/actors"></IonBackButton>
              <IonTitle>{actor ? actor.name : ''}</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="container">
          <IonSegment
            className="navpanel"
            color="secondary"
            onIonChange={(evt) =>
              this.onSegmentChange(evt.detail.value)
            }
            value={showMode}
          >
            <IonSegmentButton value="main">
              <IonIcon icon={informationCircleOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="credits">
              <IonIcon icon={filmOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="gallery">
              <IonIcon icon={imagesOutline}></IonIcon>
            </IonSegmentButton>
          </IonSegment>
          {content}
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Actor);
