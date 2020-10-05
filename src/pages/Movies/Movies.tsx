import React, { Component } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonNote,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSelectOption,
  IonSelect,
  IonLabel,
  IonItem,
  IonDatetime,
  IonSpinner,
  withIonLifeCycle,
} from '@ionic/react';
import axios from 'axios';
import { connect } from 'react-redux';

import apiKey from '../../shared/mdb-api-key.json';
import './Movies.css';
import genres from '../../shared/genres';
import MovieList from '../../components/MovieList/MovieList';
import * as actions from '../../store/actions';

interface MoviesProps {
  searchParams?: any;
  onSearchParamChanged?: any;
}

interface MoviesState {
  movies?: any;
  localParams?: {
    genre: string;
    sortBy: string;
    year: string;
  };
  firstLoad?: boolean;
}

class Movies extends Component<MoviesProps, MoviesState> {
  constructor(props: MoviesProps) {
    super(props);
    this.state = {
      movies: null,
      localParams: {
        genre: 'all',
        sortBy: 'revenue.desc',
        year: '2020-01-01',
      },
      firstLoad: true,
    };
  }

  ionViewDidEnter() {
    // logic to avoid getting unnecessary new data from API, if searchParams haven´t changed...
    if (this.state.firstLoad) {
      this.setState({ firstLoad: false });
      this.getNewMoviesData();
    } else {
      const globalParams = { ...this.props.searchParams };
      const paramsAreEqual = this.paramsAreEqual(
        this.state.localParams,
        globalParams,
      );
      if (!paramsAreEqual) {
        this.getNewMoviesData();
      }
    }
  }

  updateLocalParams() {
    const newParams = {
      genre: this.props.searchParams.genre,
      sortBy: this.props.searchParams.sortBy,
      year: this.props.searchParams.year,
    };
    this.setState({ localParams: newParams });
  }

  paramsAreEqual(params1: any, params2: any) {
    const isEqual =
      params1.genre === params2.genre &&
      params1.sortBy === params2.sortBy &&
      params1.year === params2.year;
    return isEqual;
  }

  getNewMoviesData() {
    this.fetchMovies().then((moviesData: any) => {
      this.setState({ movies: moviesData });
      this.updateLocalParams();
    });
  }

  async fetchMovies() {
    console.log('fetchMovies()');
    this.setState({ movies: null });
    let genreQuery: string;
    if (this.props.searchParams.genre === 'all') {
      genreQuery = ''; // all genres was selected
    } else {
      genreQuery = `with_genres=${this.props.searchParams.genre}`;
    }

    const yearOnlyString = this.props.searchParams.year.substring(
      0,
      4,
    );
    const yearFromQuery = `primary_release_date.gte=${yearOnlyString}-01-01`;
    const yearToQuery = `primary_release_date.lte=${yearOnlyString}-12-30`;

    const sortByQuery = `sort_by=${this.props.searchParams.sortBy}`;

    const movies = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey.key}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`,
      )
      .then((response) => {
        return response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
    return movies;
  }

  handleChange(event: any, from: string) {
    const updatedValue = event.detail.value;
    switch (from) {
      case 'genre':
        this.props.onSearchParamChanged('genre', updatedValue);
        break;
      case 'sortBy':
        this.props.onSearchParamChanged('sortBy', updatedValue);
        break;
      case 'year':
        this.props.onSearchParamChanged('year', updatedValue);
        break;
      default:
      // do nothing
    }
  }

  render() {
    const genreOptions = genres.map((genre) => {
      return (
        <IonSelectOption key={genre.id} value={genre.id}>
          {genre.name}
        </IonSelectOption>
      );
    });

    let moviesList: any;
    moviesList = (
      <div className="no-movies">
        <IonSpinner name="dots" />
      </div>
    );
    if (this.state.movies) {
      moviesList = (
        <MovieList movies={this.state.movies} isRanking={true} />
      );
    }

    return (
      <IonPage>
        <IonHeader className="header">
          <IonToolbar color="primary">
            <img
              className="app-logo"
              src="assets/images/app_logo.svg"
              alt="app logo"
            />
            <IonTitle className="ion-text-center ion-padding">
              TOP MOVIES
            </IonTitle>
            <IonNote slot="end" className="ion-padding">
              v1.5
            </IonNote>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-no-padding">
              <IonCol
                className="form-container"
                size="12"
                size-md="4"
              >
                <form>
                  <IonGrid>
                    <IonRow className="ion-no-padding">
                      <IonCol size="12" size-sm="4" size-md="12">
                        <IonItem>
                          <IonLabel position="floating">
                            Genre
                          </IonLabel>
                          <IonSelect
                            name="genre"
                            value={this.props.searchParams.genre}
                            onIonChange={(evt) =>
                              this.handleChange(evt, 'genre')
                            }
                          >
                            {genreOptions}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" size-sm="4" size-md="12">
                        <IonItem>
                          <IonLabel position="floating">
                            Order By:
                          </IonLabel>
                          <IonSelect
                            name="sortBy"
                            value={this.props.searchParams.sortBy}
                            onIonChange={(evt) =>
                              this.handleChange(evt, 'sortBy')
                            }
                          >
                            <IonSelectOption value="popularity.desc">
                              Popularity
                            </IonSelectOption>
                            <IonSelectOption value="revenue.desc">
                              Revenue
                            </IonSelectOption>
                            <IonSelectOption value="vote_average.desc">
                              Rating
                            </IonSelectOption>
                            <IonSelectOption value="vote_count.desc">
                              Number of Votes
                            </IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" size-sm="2" size-md="12">
                        <IonItem>
                          <IonLabel position="floating">
                            Year
                          </IonLabel>
                          <IonDatetime
                            value={this.props.searchParams.year}
                            onIonChange={(evt) =>
                              this.handleChange(evt, 'year')
                            }
                            display-format="YYYY"
                            picker-format="YYYY"
                            display-timezone="utc"
                            name="date-picker"
                            min="1900"
                          ></IonDatetime>
                        </IonItem>
                      </IonCol>
                      <IonCol
                        size="12"
                        size-sm="2"
                        size-md="4"
                        offset-md="4"
                      >
                        <IonButton
                          color="primary"
                          expand="block"
                          onClick={() => this.getNewMoviesData()}
                        >
                          FILTER
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </form>
              </IonCol>
              <IonCol size="12" size-md="8">
                {moviesList}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    searchParams: state.searchParams,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSearchParamChanged: (paramKey: string, paramValue: string) =>
      dispatch(actions.updateSearchParam(paramKey, paramValue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withIonLifeCycle(Movies));
