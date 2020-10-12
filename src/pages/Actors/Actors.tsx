import React, { Component } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import axios from 'axios';

import apiKey from '../../shared/mdb-api-key.json';
import './Actors.css';
import ActorsList from '../../components/ActorsList/ActorsList';

class Actors extends Component {
  state = {
    actors: null,
    imgParams: null,
  };

  componentDidMount() {
    this.fetchActors().then((actorsData: any) => {
      this.setState({ actors: actorsData });
      // console.log('Actors state: ', this.state);
    });
  }

  async fetchActors() {
    // console.log('fetchActors()');
    const actors = await axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey.key}&language=en-US`,
      )
      .then((response) => {
        const data = response.data.results;
        // console.log('fetchActors()|data: ', data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    return actors;
  }

  render() {
    let actorsList: any;
    actorsList = <p>Waiting for data...</p>;
    if (this.state.actors) {
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
