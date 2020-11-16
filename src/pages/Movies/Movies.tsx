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
  onSaveMovies?: any;
  movies?: Movie[]
  watchList?: Movie[];
  loadWatchlistFromLS?: any;
}

interface MoviesState {
  localParams?: any;
  firstLoad?: boolean;
  isLoading: boolean;
  movies?: Movie[] | null;
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

    // TO-DO: the only problem with loading from LS here is if user refreshes page in the watchlist page, should also check there
    if (!this.props.watchList) {
      this.props.loadWatchlistFromLS();
    }
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
    const paramsCopy = {...this.props.searchParams};
    const newParams = {
      genre: paramsCopy.genre,
      sortBy: paramsCopy.sortBy,
      year: paramsCopy.year,
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
    this.setState({ isLoading: true });

    let {genre, sortBy, year} = this.props.searchParams;
    
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

    if (!this.state.isLoading) {
      if (this.state.movies) {
        moviesList = (
          <MovieList isRanking={true} movies={this.state.movies} />
        );  
      }
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
    watchList: state.watchList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSearchParamChanged: (paramKey: string, paramValue: string) =>
      dispatch(actions.updateSearchParam(paramKey, paramValue)),
    loadWatchlistFromLS: () =>
      dispatch(actions.loadWatchlistFromLS()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withIonLifeCycle(Movies));
