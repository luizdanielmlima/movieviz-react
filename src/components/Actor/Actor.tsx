import React, { Component } from 'react';
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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

import {
  informationCircleOutline,
  filmOutline,
  imagesOutline,
} from 'ionicons/icons';

import './Actor.css';

interface Movie {
  budget?: number;
  genre_ids?: any[];
  id: string;
  media_type?: string;
  original_language?: string;
  overview?: string;
  popularity?: number;
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;
  revenue?: number;
  runtime?: string;
  title: string;
  vote_average?: number;
  vote_count?: number;
}

interface Cast {
  biography?: string;
  birthday?: string;
  known_for?: Movie[];
  cast_id?: number;
  character?: string;
  credit_id?: string;
  deathday?: string;
  gender?: any;
  homepage?: string;
  id?: number;
  imdb_id?: string;
  name?: string;
  order?: number;
  profile_path: string;
  popularity?: number;
  place_of_birth?: string;
}

interface ActorProps {
  history: any;
  location: any;
  match: any;
}

interface ActorState {
  showMode?: any;
  profileImgSize?: string;
  baseURL?: string;
  actorId?: string;
  actor?: Cast;
  actorImages?: any[];
  movieCredits?: any[];
}

export default class Actor extends Component<ActorProps, ActorState> {
  constructor(props: ActorProps) {
    super(props);
    console.log(props.match.params.id);
    this.state = {
      showMode: 'main',
      profileImgSize: 'w185',
      baseURL: 'https://image.tmdb.org/t/p/',
      actor: {
        profile_path: 'nonono',
      },
      actorId: props.match.params.id,
      actorImages: [],
      movieCredits: [],
    };
  }
  // To test: Morgan Freeman id : '192';

  componentDidMount() {
    console.log('componentDidMount()|state:', this.state);
    this.fetchActor().then((actorData: any) => {
      console.log('actorData: ', actorData);
      this.setState({ actor: actorData });
      console.log(this.state);
      // this.fetchActorImages();
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
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return actorData;
  }

  fetchActorImages() {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.state.actorId
        }/images?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ actorImages: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSegmentChange = (type: any) => {
    console.log(`onSegmentChange()|type: ${type}`);
    if (type === 'main') {
      this.setState({ showMode: 'main' });
    } else if (type === 'credits') {
      this.setState({ showMode: 'credits' });
    } else if (type === 'gallery') {
      this.setState({ showMode: 'gallery' });
    }
    console.log('onSegmentChange()|state:', this.state);
    // SAVE CURRENT ACTOR SOMEWHERE?
  };

  render() {
    let { showMode } = this.state;
    let actorContent: any;
    actorContent = <p>Loading data</p>;

    // HTML for Actor Main Info
    if (this.state.actor && showMode === 'main') {
      actorContent = (
        <div className="main-segment">
          <IonGrid className="actor-main-area ion-no-padding">
            <IonRow>
              {/* ACTOR´s PHOTO */}
              <IonCol
                className="ion-no-padding"
                size="7"
                size-sm="7"
                size-md="3"
                offset-md="3"
              >
                <img
                  src={`${this.state.baseURL}${this.state.profileImgSize}${this.state.actor.profile_path}`}
                  alt="actor pic"
                />
              </IonCol>

              {/* ACTOR´s STATS */}
              <IonCol
                className="actor-stats"
                size="5"
                size-sm="5"
                size-md="3"
              >
                <div className="actor-stat-item">
                  <p>Popularity</p>
                  <h6>{this.state.actor.popularity}</h6>
                </div>
                <div className="actor-stat-item">
                  <p>Birthday</p>
                  <h6>{this.state.actor.birthday}</h6>
                </div>
                <div className="actor-stat-item">
                  <p>Place of Birth</p>
                  <h6>{this.state.actor.place_of_birth}</h6>
                </div>
              </IonCol>

              {/* ACTOR´s BIOGRAPHY */}
              <IonCol
                className="ion-no-padding"
                size="12"
                size-sm="12"
                size-md="8"
                offset-md="2"
              >
                <div className="biography">
                  <h4>Biography</h4>
                  <p className="biography-text">
                    {this.state.actor.biography}
                  </p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      );
      // HTML for Actor Filmography
      if (showMode === 'credits') {
        actorContent = (
          <div>
            <p>FILMOGRAPHY HERE</p>
          </div>
        );
      }
      // HTML for Actor Gallery
      if (showMode === 'gallery') {
        actorContent = (
          <div>
            <p>GALLERY HERE</p>
          </div>
        );
      }
    }

    return (
      <IonPage>
        <IonHeader className="header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/actors"></IonBackButton>
              <IonTitle>ACTOR´S NAME</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonSegment
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

          {actorContent}
        </IonContent>
      </IonPage>
    );
  }
}
