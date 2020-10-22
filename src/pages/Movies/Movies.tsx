import React, { Component } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  withIonLifeCycle,
  IonIcon,
} from '@ionic/react';
import { contrastOutline } from 'ionicons/icons';

import { connect } from 'react-redux';

import './Movies.css';
import MovieList from '../../components/MovieList/MovieList';
import * as actions from '../../store/actions';
import Filters from '../../components/Filters/Filters';
import { Movie  } from '../../shared/models';
import { fetchMovies } from '../../shared/data';

interface MoviesProps {
  searchParams?: any;
  onSearchParamChanged?: any;
}

interface MoviesState {
  movies?: Movie[] | null;
  localParams?: any;
  firstLoad?: boolean;
  isLoading: boolean;
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
      isLoading: false
    };
  }

  ionViewDidEnter() {
    // Logic to avoid getting unnecessary new data from API, if searchParams haven´t changed...
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

  changeTheme() {
    window.document.body.classList.toggle('dark-theme');
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

  getNewMoviesData = () => {
    this.setState({ movies: [] });
    this.setState({ isLoading: true });
    let { genre, sortBy, year } = this.props.searchParams;
    fetchMovies(genre, sortBy, year).then((moviesData: any) => {
      this.setState({ movies: moviesData });
      this.updateLocalParams();
      this.setState({ isLoading: false });
    });
  }

  render() {
    let moviesList: any;
    if(this.state.isLoading) {
      moviesList = (
        <div className="loading-container">
          <IonSpinner name="dots" />
        </div>
      );
    }    
    if (!this.state.isLoading && this.state.movies) {
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
            <IonIcon
              className="theme-btn mr-md"
              icon={contrastOutline}
              slot="end"
              onClick={() => this.changeTheme()}
            ></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <Filters filterHandler={this.getNewMoviesData}/>
          {moviesList}
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
