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

interface Params {
  baseURL?: string;
  hiRes?: string;
  lowRes?: string;
}

interface ActorProps {
  name: string;
}

interface ActorState {
  showMode?: string;
  actor?: Cast;
  profileParams?: Params;
  posterParams?: Params;
  backdropParams?: Params;
  actorImages?: any[];
  movieCredits?: any[];
}

export default class Actor extends Component<ActorProps, ActorState> {
  constructor(props: ActorProps) {
    super(props);
    this.state = {
      showMode: 'main',
      actor: {
        profile_path: 'nonono',
      },
      profileParams: {
        baseURL: 'a',
        hiRes: 'a',
        lowRes: 'a',
      },
      posterParams: {
        baseURL: 'a',
        hiRes: 'a',
        lowRes: 'a',
      },
      backdropParams: {
        baseURL: 'a',
        hiRes: 'a',
        lowRes: 'a',
      },
      actorImages: [],
      movieCredits: [],
    };
  }
  actorId = '192';

  componentDidMount() {
    console.log('componentDidMount()|state:', this.state);
    this.setMDBImgConfig().then((res) => {
      this.setState({ profileParams: res });
      this.setState({ posterParams: res });
      this.setState({ backdropParams: res });
      this.fetchActor().then((actorData: any) => {
        console.log('actorData: ', actorData);
        this.setState({ actor: actorData });
        console.log(this.state);
        // this.fetchActorImages();
      });
    });
  }

  async setMDBImgConfig() {
    const profileImgParams = await axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        const imgConfig = response.data.images;
        const profileData = {
          baseURL: imgConfig.secure_base_url,
          hiRes: imgConfig.profile_sizes[2],
          lowRes: imgConfig.profile_sizes[1],
        };
        return profileData;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return profileImgParams;
  }

  apiKey = () => {
    return '891a2d7d763b8e20d78ae746c8986811';
  };

  async fetchActor() {
    const actorData = await axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.actorId
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
          this.actorId
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

  getFullImgPath(type: string, res: string, filePath: string) {
    console.log(`type:${type} , res:${res} , filePath:${filePath}`);
    let fullImgPath = '';
    if (filePath === null) {
      fullImgPath = '../../../../assets/placeholder.png';
    }
    // else {
    //   let baseURL = '';
    //   let size = '';
    //   if (type === 'profile') {
    //     baseURL = this.state.profileParams.baseURL;
    //     size =
    //       res === 'hi'
    //         ? this.state.profileParams.hiRes
    //         : this.state.profileParams.lowRes;
    //   } else if (type === 'poster') {
    //     baseURL = this.posterParams.baseURL;
    //     size =
    //       res === 'hi'
    //         ? this.state.posterParams.hiRes
    //         : this.state.posterParams.lowRes;
    //   } else if (type === 'backdrop') {
    //     baseURL = this.state.backdropParams.baseURL;
    //     size =
    //       res === 'hi'
    //         ? this.state.backdropParams.hiRes
    //         : this.state.backdropParams.lowRes;
    //   }
    //   fullImgPath = `${baseURL}${size}${filePath}`;
    // }
    // console.log(`actor-detail|fullImgPath: ${fullImgPath}`);
    return fullImgPath;
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
    // SAVE CURRENT ACTOR SOMEWHERE?
  };

  render() {
    let actorMainInfo: any;
    actorMainInfo = <p>Loading data</p>;
    if (
      this.state.actor &&
      this.state.profileParams &&
      this.state.posterParams &&
      this.state.backdropParams
    ) {
      actorMainInfo = (
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
                  src={this.getFullImgPath(
                    'profile',
                    'hi',
                    this.state.actor.profile_path,
                  )}
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
                  <p>{this.state.actor.biography}</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      );
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

          {actorMainInfo}
        </IonContent>
      </IonPage>
    );
  }
}
