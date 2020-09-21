import React, { Component } from 'react';
import { Route } from 'react-router';
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

import { Cast, Crew, Movie } from '../../shared/models';
import MovieContent from '../../components/MovieContent/MovieContent';
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
  movie?: Movie;
  movieYear?: string;
  cast?: Cast[];
  crew?: Crew[];
  images?: any[];
  posters?: any[];
  trailers?: any[];
}

export class MovieDetail extends Component<MovieProps, MovieState> {
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
      // console.log('movieData: ', movieData);
      this.setState({ movie: movieData });
      this.setState({
        movieYear: movieData.release_date.substring(0, 4),
      });
      // Get credits (cast and crew)
      this.fetchCredits().then((movieCredits: any) => {
        this.setState({ cast: movieCredits.cast });
        this.setState({ crew: movieCredits.crew });
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

  async fetchCredits() {
    const movieCredits = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.state.movieId
        }/credits?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        const credits = response.data;
        return credits;
      })
      .catch((error) => {
        console.log(error);
      });
    return movieCredits;
  }

  onSegmentChange = (type: any) => {
    this.setState({ showMode: type });
  };

  render() {
    let {
      movie,
      movieId,
      movieYear,
      showMode,
      cast,
      crew,
    } = this.state;

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
            value={showMode}
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
          <div className="content">
            <Route
              path={`/movies/${movieId}`}
              render={(props: any) => (
                <MovieContent
                  {...props}
                  movie={movie}
                  cast={cast}
                  crew={crew}
                  showMode={showMode}
                />
              )}
              exact={true}
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default MovieDetail;
