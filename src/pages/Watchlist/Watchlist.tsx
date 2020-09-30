import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';

import MovieList from '../../components/MovieList/MovieList';

const Watchlist = (props: any) => {
  let moviesList: any;
  moviesList = <p>Waiting for data...</p>;
  if (props.watchList) {
    moviesList = (
      <div>
        <MovieList movies={props.watchList} isRanking={true} />
      </div>
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
                      {/* <IonItem>
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
                    </IonItem> */}
                    </IonCol>

                    <IonCol
                      size="12"
                      size-sm="2"
                      size-md="4"
                      offset-md="4"
                    >
                      {/* <IonButton
                      color="primary"
                      expand="block"
                      onClick={() =>
                        this.fetchMovies().then((moviesData) =>
                          this.setState({ movies: moviesData }),
                        )
                      }
                    >
                      FILTER
                    </IonButton> */}
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
    watch: state.watch,
    watchList: state.watchList,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(Watchlist);
