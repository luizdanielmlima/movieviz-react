import React, { Component } from 'react';
import axios from 'axios';

import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

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
    });
  }

  apiKey = () => {
    return '891a2d7d763b8e20d78ae746c8986811';
  };

  async fetchMovie() {
    // movie id to test: 448119
    const actorData = await axios
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
    return actorData;
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/movies"></IonBackButton>
              <IonTitle>
                {this.state.movie ? this.state.movie.title : ''}
              </IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    );
  }
}

export default Movie;
