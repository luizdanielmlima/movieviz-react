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
} from '@ionic/react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Movies.css';
import genres from '../../shared/genres';
import * as actions from '../../store/actions';
import MovieList from '../../components/MovieList/MovieList';

class Movies extends Component {
  state = {
    movies: [],
    posterParams: null,
  };

  apiKey = () => {
    return '891a2d7d763b8e20d78ae746c8986811';
  };

  componentDidMount() {
    this.setMDBImgConfig();
    this.fetchMovies();
  }

  fetchMovies = () => {
    // const apiKey = '891a2d7d763b8e20d78ae746c8986811';
    const genre = '12';
    const sortBy = 'revenue.desc';
    const year = '2019-02-02';
    // set query values
    let genreQuery: string;
    genreQuery = `with_genres=${genre}`;
    // if (genre === 'all') {
    //   genreQuery = ''; // all genres was selected
    // } else {
    //   genreQuery = `with_genres=${genre}`;
    // }

    const yearOnlyString = year.substring(0, 4);
    const yearFromQuery = `primary_release_date.gte=${yearOnlyString}-01-01`;
    const yearToQuery = `primary_release_date.lte=${yearOnlyString}-12-30`;

    const sortByQuery = `sort_by=${sortBy}`;

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey()}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`,
      )
      .then((response) => {
        console.log(response.data.results);
        this.setState({ movies: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setMDBImgConfig() {
    axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        console.log(response);
        const imgConfig = response.data.images;
        const posterParams = {
          baseURL: imgConfig.secure_base_url,
          hiRes: imgConfig.poster_sizes[5],
          lowRes: imgConfig.poster_sizes[2],
        };
        console.log('posterParams: ', posterParams);
        this.setState({ posterParams: posterParams });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const selectOptions = genres.map((genre) => {
      return (
        <IonSelectOption key={genre.id}>{genre.name}</IonSelectOption>
      );
    });

    // let movies: any;
    // movies = <p>No movies loaded</p>;
    // if (this.state.movies) {
    //   movies = this.state.movies.map((movie: any) => {
    //     return <p key={movie.id}> {movie.original_title}</p>;
    //   });
    // }

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
          {/* <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Movies</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Movies Content HERE !!!" /> */}
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
                          <IonSelect name="genre">
                            {selectOptions}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" size-sm="4" size-md="12">
                        <IonItem>
                          <IonLabel position="floating">
                            Order By:
                          </IonLabel>
                          <IonSelect name="sortBy">
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
                          type="submit"
                          color="primary"
                          expand="block"
                        >
                          FILTER
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </form>
              </IonCol>
              <IonCol size="12" size-md="8">
                <MovieList
                  movies={this.state.movies}
                  posterParams={this.state.posterParams}
                />
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
    movies: state.movies,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchMovies: () => dispatch(actions.fetchMovies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
