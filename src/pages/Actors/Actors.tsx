import React, { Component } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../store/actions';
import './Actors.css';
import ActorsList from '../../components/ActorsList/ActorsList';

class Actors extends Component {
  state = {
    actors: [],
    imgParams: null,
  };

  apiKey = () => {
    return '891a2d7d763b8e20d78ae746c8986811';
  };

  componentDidMount() {
    this.fetchActors().then((actorsData: any) => {
      this.setState({ actors: actorsData });
      // console.log('Actors state: ', this.state);
    });
  }

  async fetchActors() {
    const actors = await axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        const data = response.data.results;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    return actors;
  }

  render() {
    let actorsList: any;
    actorsList = <p>Loading Actors...</p>;
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

// TODO: do Redux stuff later....
const mapStateToProps = (state: any) => {
  return {
    actors: state.actors,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchMovies: () => dispatch(actions.fetchMovies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
