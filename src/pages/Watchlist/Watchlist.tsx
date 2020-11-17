import React, { useState } from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { connect } from 'react-redux';

import MovieList from '../../components/MovieList/MovieList';
import genres from '../../shared/genres';
import * as actions from '../../store/actions';

const Watchlist = (props: any) => {
  // console.log('Watchlist|props: ', props);
  const [curGenre, setcurGenre] = useState('all');

  const genreOptions = genres.map((genre) => {
    return (
      <IonSelectOption key={genre.id} value={genre.id}>
        {genre.name}
      </IonSelectOption>
    );
  });

  const handleChange = (event: any) => {
    setcurGenre(event.detail.value);
  };

  const filterWatchlist = () => {
    if (props.watchList) {
      if (curGenre === 'all') {
        return [...props.watchList];
      } else {
        return [...props.watchList].filter((movie: any) =>
          movie.genre_ids.includes(+curGenre),
        );
      }
    }
  };

  let moviesList: any;
  const filteredList = filterWatchlist();
  moviesList = (
    <div>
      <MovieList movies={filteredList} isRanking={true} />
    </div>
  );

  return (
    <IonPage>
      <IonHeader className="header">
        <IonToolbar color="tertiary">
          <img
            className="app-logo"
            src="assets/images/app_logo.svg"
            alt="app logo"
          />
          <IonTitle className="ion-text-center ion-padding">
            YOUR WATCHLIST
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-no-padding">
            <IonCol className="form-container" size="12" size-md="4">
              <form>
                <IonGrid>
                  <IonRow className="ion-no-padding">
                    <IonCol size="12" size-sm="4" size-md="12">
                      <IonItem>
                        <IonLabel position="floating">Genre</IonLabel>
                        <IonSelect
                          name="genre"
                          value={curGenre}
                          onIonChange={(evt) => handleChange(evt)}
                        >
                          {genreOptions}
                        </IonSelect>
                      </IonItem>
                    </IonCol>

                    <IonCol
                      size="12"
                      size-sm="2"
                      size-md="4"
                      offset-md="4"
                    >
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
};

const mapStateToProps = (state: any) => {
  return {
    watchList: state.watchList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadWatchlistFromLS: () =>
      dispatch(actions.loadWatchlistFromLS()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Watchlist);
