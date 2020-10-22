import React, { Component } from 'react';
import { Route } from 'react-router';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
} from '@ionic/react';

import {
  informationCircleOutline,
  peopleOutline,
  imagesOutline,
  filmOutline,
  easelOutline,
} from 'ionicons/icons';

import { fetchMovie, fetchMovieGallery, fetchMovieCredits, fetchMovieTrailers } from '../../shared/data';
import { Cast, Crew, Movie, Image, Trailer } from '../../shared/models';
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
  movieId?: string;
  movie?: Movie;
  movieYear?: string;
  cast?: Cast[];
  crew?: Crew[];
  images?: Image[];
  posters?: any[];
  trailers?: Trailer[];
  dataIsReady?: boolean;
}

class MovieDetail extends Component<MovieProps, MovieState> {
  constructor(props: MovieProps) {
    super(props);
    this.state = {
      showMode: 'main',
      movie: {},
      movieYear: '',
      images: [],
      posters: [],
      trailers: [],
      dataIsReady: false,
    };
  }

  ionViewWillEnter() {
    this.setState({ dataIsReady: false });
    this.setState({ showMode: 'main' });
  }

  ionViewDidEnter() {
    const movieID = this.props.match.params.id;
    this.setState({ movieId: movieID });
    fetchMovie(movieID).then((movieData: any) => {
      this.setState({ movie: movieData });
      this.setState({
        movieYear: movieData.release_date.substring(0, 4),
      });

      // Get credits (cast and crew)
      fetchMovieCredits(movieID).then((movieCredits: any) => {
        this.setState({ cast: movieCredits.cast });
        this.setState({ crew: movieCredits.crew });

        // Get gallery
        fetchMovieGallery(movieID).then((movieGallery: any) => {
          this.setState({ images: movieGallery.backdrops });
          this.setState({ posters: movieGallery.posters });

          // Get trailers
          fetchMovieTrailers(movieID).then((movieTrailers: Trailer[]) => {
            this.setState({ trailers: movieTrailers });
            this.setState({ dataIsReady: true });
          });
        });
      });
    });
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
      images,
      posters,
      trailers,
      dataIsReady,
    } = this.state;

    const shortenTitle = (text: string = 'loading') => {
      const maxTextLength = window.innerWidth / 16;
      if (text.length > maxTextLength) {
        const croppedText = text.substring(0, maxTextLength);
        const shortenedText = `${croppedText}...`;
        return (
          <IonTitle className="ion-no-padding title-small">
            {shortenedText} ({movie ? movieYear : ''})
          </IonTitle>
        );
      } else {
        return (
          <IonTitle className="ion-no-padding title-small">
            {text} ({movie ? movieYear : ''})
          </IonTitle>
        );
      }
    };

    let content;
    content = (
      <div className="spinner-wrapper">
        <IonSpinner name="dots" />
      </div>
    );

    let title;
    title = <p></p>;

    if (dataIsReady && movie) {
      content = (
        <div>
          <Route
            path={`/movies/${movieId}`}
            render={(props: any) => (
              <MovieContent
                {...props}
                movie={movie}
                cast={cast}
                crew={crew}
                images={images}
                posters={posters}
                trailers={trailers}
                showMode={showMode}
                showModal={false}
              />
            )}
            exact={true}
          />
        </div>
      );

      title = shortenTitle(movie.title);
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/movies"></IonBackButton>
              {title}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSegment
            scrollable
            onIonChange={(evt) =>
              this.onSegmentChange(evt.detail.value)
            }
            value={showMode}
          >
            <IonSegmentButton value="main" className="segment-btn">
              <IonIcon icon={informationCircleOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="cast" className="segment-btn">
              <IonIcon icon={peopleOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="gallery" className="segment-btn">
              <IonIcon icon={imagesOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="posters" className="segment-btn">
              <IonIcon icon={easelOutline}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton
              value="trailers"
              className="segment-btn"
            >
              <IonIcon icon={filmOutline}></IonIcon>
            </IonSegmentButton>
          </IonSegment>
          {content}
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(MovieDetail);
