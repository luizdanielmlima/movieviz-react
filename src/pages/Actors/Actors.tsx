import React, { Component } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
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
    this.setMDBImgConfig().then((res) => {
      //   console.log('setMDBImgConfig()|res: ', res);
      this.setState({ imgParams: res });
      this.fetchActors();
    });
  }

  async setMDBImgConfig() {
    const profileImgParams = await axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        const imgConfig = response.data.images;
        const profileData = {
          baseURL: imgConfig.secure_base_url,
          hiRes: imgConfig.profile_sizes[2],
          lowRes: imgConfig.profile_sizes[1],
        };
        return profileData;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return profileImgParams;
  }

  fetchActors = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey()}&language=en-US`,
      )
      .then((response) => {
        this.setState({ actors: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let actorsList: any;
    actorsList = <p>Loading Actors...</p>;
    if (this.state.imgParams && this.state.actors) {
      actorsList = (
        <ActorsList
          actors={this.state.actors}
          imgParams={this.state.imgParams}
        />
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
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-no-padding">
              <IonCol size="12" size-md="8" offset-md="4">
                {actorsList}
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
