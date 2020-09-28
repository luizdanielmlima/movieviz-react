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

import apiKey from '../../shared/mdb-api-key.json';
import './Movies.css';
import genres from '../../shared/genres';
import * as actions from '../../store/actions';
import MovieList from '../../components/MovieList/MovieList';

class Movies extends Component {
  state = {
    movies: null,
    query_genre: 'all',
    query_sortBy: 'revenue.desc',
    query_year: '2020-01-01',
  };

  componentDidMount() {
    this.fetchMovies().then((moviesData: any) => {
      this.setState({ movies: moviesData });
      // console.log('Movies state: ', this.state);
    });
  }

  async fetchMovies() {
    let genreQuery: string;
    if (this.state.query_genre === 'all') {
      genreQuery = ''; // all genres was selected
    } else {
      genreQuery = `with_genres=${this.state.query_genre}`;
    }

    const yearOnlyString = this.state.query_year.substring(0, 4);
    const yearFromQuery = `primary_release_date.gte=${yearOnlyString}-01-01`;
    const yearToQuery = `primary_release_date.lte=${yearOnlyString}-12-30`;

    const sortByQuery = `sort_by=${this.state.query_sortBy}`;

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
        this.setState({ query_genre: updatedValue });
        break;
      case 'sortBy':
        this.setState({ query_sortBy: updatedValue });
        break;
      case 'year':
        this.setState({ query_year: updatedValue });
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
    moviesList = <p>Waiting for data...</p>;
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
                            value={this.state.query_genre}
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
                            value={this.state.query_sortBy}
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
                            value={this.state.query_year}
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
                          onClick={() => this.fetchMovies()}
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

// TODO: do Redux stuff later....
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
