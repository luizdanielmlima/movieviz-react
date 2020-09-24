import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

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
} from '@ionic/react';

import {
  informationCircleOutline,
  filmOutline,
  imagesOutline,
} from 'ionicons/icons';

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
  baseURL?: string;
  actorId?: string;
  actor?: Cast;
  gallery?: any[];
  filmography?: any[];
  dataIsReady?: boolean;
}

export default class Actor extends Component<ActorProps, ActorState> {
  constructor(props: ActorProps) {
    super(props);
    this.state = {
      showMode: 'main',
      baseURL: 'https://image.tmdb.org/t/p/',
      actor: {
        profile_path: 'nonono',
      },
      actorId: props.match.params.id,
      gallery: [],
      filmography: [],
      dataIsReady: false,
    };
  }
  // To test: Morgan Freeman id : '192';

  componentDidMount() {
    this.fetchActor().then((actorData: any) => {
      // console.log('actorData: ', actorData);
      this.setState({ actor: actorData });

      // fetch actor photos
      this.fetchActorImages().then((images) => {
        this.setState({ gallery: images });

        // fetch cctor fimography (list of movies)
        this.fetchFilmography().then((list) => {
          this.setState({ filmography: list });
          this.setState({ dataIsReady: true });
        });
      });
    });
  }

  apiKey = () => {
    return '891a2d7d763b8e20d78ae746c8986811';
  };

  async fetchActor() {
    const actorData = await axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.state.actorId
        }/?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return actorData;
  }

  async fetchActorImages() {
    const images = await axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.state.actorId
        }/images?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        return response.data.profiles;
      })
      .catch((error) => {
        console.log(error);
      });
    return images;
  }

  async fetchFilmography() {
    const movielist = await axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.state.actorId
        }/movie_credits?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        const orderedFilmography = response.data.cast
          .filter((item: any) => item.poster_path !== null)
          .sort((a: any, b: any) => {
            return (
              this.dateToNum(a.release_date) -
              this.dateToNum(b.release_date)
            );
          })
          .reverse();
        return orderedFilmography;
      })
      .catch((error) => {
        console.log(error);
      });
    return movielist;
  }

  dateToNum(date: string) {
    let dateAsNumber: number;
    if (!date) {
      dateAsNumber = 0;
    } else {
      dateAsNumber = Number(date.replace(/-/g, ''));
    }
    return dateAsNumber;
  }

  onSegmentChange = (type: any) => {
    this.setState({ showMode: type });
  };

  render() {
    let { actor, gallery, filmography, dataIsReady } = this.state;

    let content;
    content = (
      <div className="spinner-wrapper">
        <IonSpinner name="dots" />
      </div>
    );
    if (dataIsReady) {
      content = (
        <div className="content">
          <Route
            path={`/actors/${this.state.actorId}`}
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
              <IonBackButton defaultHref="/actors"></IonBackButton>
              <IonTitle>
                {this.state.actor ? this.state.actor.name : ''}
              </IonTitle>
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
            value={this.state.showMode}
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
