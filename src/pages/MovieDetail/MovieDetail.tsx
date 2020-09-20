import React, { Component } from 'react';
import axios from 'axios';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  informationCircleOutline,
  peopleOutline,
  imagesOutline,
  filmOutline,
} from 'ionicons/icons';

import { Cast, Crew, MovieModel } from '../../shared/models';
import './MovieDetail.css';

// Props and State Models
interface MovieProps {
  history: any;
  location: any;
  match: any;
}

interface MovieState {
  showMode?: string;
  baseURL?: string;
  movieId?: string;
  movie?: MovieModel;
  movieYear?: string;
  cast?: Cast[];
  crew?: Crew[];
  images?: any[];
  posters?: any[];
  trailers?: any[];
}

export class Movie extends Component<MovieProps, MovieState> {
  constructor(props: MovieProps) {
    super(props);
    console.log(props);
    this.state = {
      showMode: 'main',
      baseURL: 'https://image.tmdb.org/t/p/',
      movie: {},
      movieYear: '',
      movieId: props.match.params.id,
      images: [],
      posters: [],
      trailers: [],
    };
  }

  componentDidMount() {
    this.fetchMovie().then((movieData: any) => {
      console.log('movieData: ', movieData);
      this.setState({ movie: movieData });
      this.setState({
        movieYear: movieData.release_date.substring(0, 4),
      });
    });
  }

  apiKey = () => {
    return '891a2d7d763b8e20d78ae746c8986811';
  };

  async fetchMovie() {
    // movie id to test: 448119
    const movieData = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.state.movieId
        }?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return movieData;
  }

  onSegmentChange = (type: any) => {
    this.setState({ showMode: type });
    // if (type === 'main') {
    //   this.setState({ showMode: 'main' });
    // } else if (type === 'credits') {
    //   this.setState({ showMode: 'credits' });
    // } else if (type === 'gallery') {
    //   this.setState({ showMode: 'gallery' });
    // }
  };

  render() {
    let { movie, movieYear } = this.state;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/movies"></IonBackButton>
              <IonTitle>
                {movie ? movie.title : ''} ({movie ? movieYear : ''})
              </IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSegment
            onIonChange={(evt) =>
              this.onSegmentChange(evt.detail.value)
            }
            value={this.state.showMode}
          >
            <IonSegmentButton value="main">
              <IonIcon icon={informationCircleOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="cast">
              <IonIcon icon={peopleOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="gallery">
              <IonIcon icon={imagesOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="trailers">
              <IonIcon icon={filmOutline}></IonIcon>
            </IonSegmentButton>
          </IonSegment>
        </IonContent>
      </IonPage>
    );
  }
}

export default Movie;
