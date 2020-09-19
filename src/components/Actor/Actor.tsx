import React, { Component } from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
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
} from '@ionic/react';

import {
  informationCircleOutline,
  filmOutline,
  imagesOutline,
} from 'ionicons/icons';

import './Actor.css';
import ActorGallery from '../ActorGallery/ActorGallery';
import ActorMain from '../ActorMain/ActorMain';
import { IonReactRouter } from '@ionic/react-router';

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
    console.log(props);
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
      // console.log('actorData: ', actorData);
      this.setState({ actor: actorData });
      this.fetchActorImages();
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

  fetchActorImages() {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.state.actorId
        }/images?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        // console.log(
        //   'fetchActorImages()|images:',
        //   response.data.profiles,
        // );
        this.setState({ actorImages: response.data.profiles });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSegmentChange = (type: any) => {
    console.log(`onSegmentChange()|type: ${type}`);
    if (type === 'main') {
      // this.props.history.push(`/actors/${this.state.actorId}`);
      this.setState({ showMode: 'main' });
    } else if (type === 'credits') {
      // this.props.history.push(
      //   `/actors/${this.state.actorId}/credits`,
      // );
      this.setState({ showMode: 'credits' });
    } else if (type === 'gallery') {
      // this.props.history.push(
      //   `/actors/${this.state.actorId}/gallery`,
      // );
      this.setState({ showMode: 'gallery' });
    }
  };

  render() {
    let { actor, actorImages } = this.state;

    return (
      <IonPage>
        <IonHeader className="header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/actors"></IonBackButton>
              <IonTitle>
                {this.state.actor ? this.state.actor.name : ''}
              </IonTitle>
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
          <Route
            path={`/actors/${this.state.actorId}`}
            render={(props: any) => (
              <ActorMain
                {...props}
                actor={actor}
                images={actorImages}
                showMode={this.state.showMode}
              />
            )}
            exact={true}
          />
          {/* <Route
            path={this.props.match.url + '/gallery'}
            render={(props: any) => (
              <ActorGallery {...props} images={actorImages} />
            )}
            exact={true}
          /> */}
        </IonContent>
      </IonPage>
    );
  }
}
