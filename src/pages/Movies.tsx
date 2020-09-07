import React from 'react';
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
import ExploreContainer from '../components/ExploreContainer';
import './Movies.css';

const Movies: React.FC = () => {
  const genres = [
    {
      id: 'all',
      name: 'All Genres',
    },
    {
      id: '28',
      name: 'Action',
    },
    {
      id: '12',
      name: 'Adventure',
    },
    {
      id: '16',
      name: 'Animation',
    },
    {
      id: '35',
      name: 'Comedy',
    },
    {
      id: '80',
      name: 'Crime',
    },
    {
      id: '99',
      name: 'Documentary',
    },
    {
      id: '18',
      name: 'Drama',
    },
    {
      id: '10751',
      name: 'Family',
    },
    {
      id: '14',
      name: 'Fantasy',
    },
    {
      id: '36',
      name: 'History',
    },
    {
      id: '27',
      name: 'Horror',
    },
    {
      id: '10402',
      name: 'Music',
    },
    {
      id: '9648',
      name: 'Mystery',
    },
    {
      id: '10749',
      name: 'Romance',
    },
    {
      id: '878',
      name: 'SciFi',
    },
    {
      id: '10770',
      name: 'TV Movie',
    },
    {
      id: '53',
      name: 'Thriller',
    },
    {
      id: '10752',
      name: 'War',
    },
    {
      id: '37',
      name: 'Western',
    },
  ];

  const selectOptions = genres.map((genre) => {
    return (
      <IonSelectOption key={genre.id}>{genre.name}</IonSelectOption>
    );
  });

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
            <IonCol className="form-container" size="12" size-md="4">
              <form>
                <IonGrid>
                  <IonRow className="ion-no-padding">
                    <IonCol size="12" size-sm="4" size-md="12">
                      <IonItem>
                        <IonLabel position="floating">Genre</IonLabel>
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
                        <IonLabel position="floating">Year</IonLabel>
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
              {/* MOVIE COMPONENT HERE */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Movies;
