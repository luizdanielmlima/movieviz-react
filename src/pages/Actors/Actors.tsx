import React, { Component } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
} from '@ionic/react';

import { fetchActors } from '../../shared/data';

import './Actors.css';
import ActorsList from '../../components/ActorsList/ActorsList';

class Actors extends Component {
  state = {
    actors: null,
    imgParams: null,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetchActors().then((actorsData: any) => {
      this.setState({ actors: actorsData });
      this.setState({ isLoading: false });
    });
  }

  render() {
    let actorsList: any;
    if(this.state.isLoading) {
      actorsList = <div className="loading-container">
        <IonSpinner name="dots" />
      </div>
    }

    if (!this.state.isLoading && this.state.actors) {
      actorsList = (
        <ActorsList actors={this.state.actors} isMovieCast={false} />
      );
    }
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="secondary">
            <img
              className="app-logo"
              src="assets/images/app_logo.svg"
              alt="app logo"
            />
            <IonTitle className="ion-text-center">
              POPULAR ACTORS
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="actorlist-container">{actorsList}</div>
        </IonContent>
      </IonPage>
    );
  }
}

export default Actors;
